
import { useState } from "react";
import { QuestionMarkCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import Footer from "@/components/footer.jsx";
import MetaTags from "@/components/metatags.jsx";
import Or from "@/components/or.jsx";
import { DiscordIconWhite } from "@/components/discord.jsx";
import { TextInput } from "@/components/dash/ui.jsx";
import { createOAuthRedirect, useGuilds } from "@/lib/api.js";
import { range } from "@/lib/helper.js";


function GuildIcon({ guild }) {
    if(!guild.icon)
        return <QuestionMarkCircleIcon className="w-16 h-16 mx-auto rounded-full bg-gray-810" />;
    const CDN_BASE = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
    return (
        <picture>
            <source type="image/webp" data-srcset={`${CDN_BASE}.webp?size=128`} />
            <img data-src={`${CDN_BASE}.png?size=128`} alt="" className="flex w-16 h-16 mx-auto rounded-full lazyload bg-gray-810" />
        </picture>
    )
}


export default function Dashboard() {
    const { data: response, error: isError } = useGuilds();
    const router = useRouter();
    const [query, setQuery] = useState("");

    const isLoading = !response && !isError;
    const hasToLogin = isError && isError.response && isError.response.status === 401;
    if(hasToLogin)
        localStorage.removeItem("token");
    
    return (
        <>
            <MetaTags
                title="Dashboard"
            />
            <div className="min-h-screen pb-40 --container">
                {hasToLogin ? <div className="flex items-center justify-center h-screen">
                    <div>
                        <h1 className="mb-12 text-2xl font-bold text-center">
                            You must login with Discord to gain access to the Dashboard.
                        </h1>
                        <button className="w-full mx-auto --btn --btn-4 --btn-primary sm:w-80" onClick={() => {
                            const url = createOAuthRedirect({});
                            router.push(url);
                        }}>
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            
                            Login with Discord
                        </button>
                        <Or />
                        <button className="w-full mx-auto --btn --btn-4 --btn-primary sm:w-80" onClick={() => {
                            const url = createOAuthRedirect({ bot: true });
                            router.push(url);
                        }}>
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            Direct bot invite
                        </button>
                        <p className="mt-6 text-center">
                            By logging in you agree to our{" "}
                            <Link href="/legal/terms">
                                <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                                    Terms of Service
                                </a>
                            </Link>
                            {" "}and{" "}
                            <Link href="/legal/terms">
                                <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                                    Privacy Policy
                                </a>
                            </Link>
                            {" "}.
                        </p>
                    </div>
                </div> : <>
                    <h1 className="pt-8 pb-4 mb-12 text-4xl font-bold text-center">
                        Your servers
                    </h1>
                    {isError && <ErrorHandler error={isError} />}
                    {(isLoading || response) && !isError && <>
                        <TextInput
                            value={query}
                            setValue={setQuery}
                            placeholder="Search"
                            className={clsx(query ? "" : "md:hidden", "mb-8")}
                        />
                        <GuildList response={response} query={query} />
                    </>}
                    {response && !isError && <>
                        <h2 className="mt-20 mb-10 text-4xl font-bold text-center">
                            {response.data.length === 0 ? "No servers?" : "Missing a server?"}
                        </h2>
                        <p className="text-center text-gray-200">
                            Only servers you have access to are shown.
                        </p>
                        <p className="text-center text-gray-200">
                            By default, the dashboard is restricted to the <u>owner</u>, <u>adminstrators</u> and <u>server managers</u>.
                        </p>
                        <p className="pb-20 text-center text-gray-300 text-sm mt-2">
                            It can take up to 30 seconds for your servers to update.
                        </p>
                    </>}
                </>}
            </div>
            <div className="--container">
                <div className="pb-8 border-t border-gray-550" />
                <Footer />
            </div>
        </>
    )
}

function GuildList({ response, query }) {
    const isLoading = !response;
    const servers = response && [...response.data].sort((a, b) => [b.is_suspended - a.is_suspended, b.is_added - a.is_added, a.access_type - b.access_type, b.name - a.name].find(x => x !== 0));
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
                range(12, index => <Guild key={index} />)
            ) : (
                servers.filter(guild => query ? guild.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 : true).map(guild => <Guild guild={guild} key={guild.id} />)
            )}
        </div>
    )
}

function Guild({ guild }) {
    return (
        <div className="relative pt-2 pb-4 bg-gray-800 rounded-lg">
            {guild ? <GuildIcon guild={guild} /> : <Skeleton className="w-16 h-16 mx-auto rounded-full" />}
            {guild && <span className="absolute text-gray-300 top-2 left-2">
                {["Owner", "Admin", "Manager", "Whitelisted", "Whitelisted"][guild.access_type]}
            </span>}
            {guild && guild.is_suspended && <Link href="/help/suspension#suspended-guild">
                <a className="absolute top-2 right-2">
                    <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
                </a>
            </Link>}
            <div className="px-8 mt-2 text-center truncate">
                {guild ? guild.name : <Skeleton className="h-6 rounded" />}
            </div>
            {guild ? <GuildButton guild={guild} /> : <Skeleton className="h-12 mx-4 mt-4 rounded-lg" />}
        </div>
    )
}

function GuildButton({ guild }) {
    const router = useRouter();
    const isComponentAllowed = ["analytics", "antispam", "antiraid", "backup", "bot", "branding", "challenge", "contact", "dev", "firewall", "impersonation", "logging", "plan", "report", "slowmode", "verification", "workers"].includes(router.query.component);
    const link = `/dash/${guild.id}` + (isComponentAllowed ? `/${router.query.component}` : "")
    if(guild.is_suspended)
        return (
            <Link href={link}>
                <a className="mx-4 mt-4 --btn --btn-4 --btn-destructive">
                    Suspended
                </a>
            </Link>
        )
    if(guild.is_added)
        return (
            <Link href={link}>
                <a className="mx-4 mt-4 --btn --btn-4 --btn-primary">
                    Dashboard
                </a>
            </Link>
        )
    return (
        <div className="mx-4 mt-4">
            <button className="w-full --btn --btn-4 --btn-success" onClick={() => {
                const url = createOAuthRedirect({ bot: true, guild: guild.id, with_admin: guild.is_admin });
                router.push(url);
            }}>
                Setup
            </button>
        </div>
    )
}
