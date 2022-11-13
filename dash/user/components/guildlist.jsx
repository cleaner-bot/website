import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { HorizontalRule, TextInput } from "@/components/dash/ui.jsx";
import { createOAuthRedirect, getGuilds } from "@/lib/api.js";

function GuildIcon({ guild }) {
    if (!guild.icon)
        return <div className="w-16 h-16 mx-auto rounded-full bg-gray-810" />;
    const CDN_BASE = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
    return (
        <picture>
            <source type="image/webp" srcSet={`${CDN_BASE}.webp?size=128`} />
            <Image
                src={`${CDN_BASE}.png?size=128`}
                alt=""
                className="flex w-16 h-16 mx-auto rounded-full bg-gray-810"
                height={128}
                width={128}
            />
        </picture>
    );
}

export default function GuildListComponent({ route, updateRoute }) {
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const [query, setQuery] = useState("");

    const isLoading = !response && !error;
    const hasToLogin = error?.response?.status === 401;
    if (hasToLogin) localStorage.removeItem("token");

    useEffect(() => {
        getGuilds().then(setResponse).catch(setError);
    }, []);

    return (
        <>
            {error ? (
                <ErrorHandler error={error} />
            ) : response ? (
                <div className="mt-20">
                    <TextInput
                        value={query}
                        setValue={setQuery}
                        placeholder="Search"
                        className={clsx(query ? "" : "md:hidden", "mb-8")}
                    />
                    <FullGuildList
                        guilds={response.data}
                        query={query}
                        route={route}
                        updateRoute={updateRoute}
                    />
                    <h2 className="mt-20 mb-2 text-4xl font-bold text-center">
                        {response.data.length === 0
                            ? "No servers?"
                            : "Missing a server?"}
                    </h2>
                    <p className="text-center text-gray-200">
                        Only servers you have access to are shown.
                    </p>
                    <p className="text-center text-gray-200">
                        By default, the dashboard is restricted to the{" "}
                        <u>owner</u>, <u>adminstrators</u> and{" "}
                        <u>server managers</u>.
                    </p>
                    <p className="mt-2 text-sm text-center text-gray-300">
                        It can take up to 30 seconds for your servers to update.
                    </p>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

function guildCategory(guild) {
    if (guild.is_suspended) return "suspended";
    if (guild.is_added) return "added";
    return "invite";
}

function FullGuildList({ guilds, query, ...props }) {
    const guildList = guilds.filter((guild) =>
        query
            ? guild.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
            : true
    );
    const suspendedGuilds = guildList.filter(
        (guild) => guildCategory(guild) === "suspended"
    );
    const addedGuilds = guildList.filter(
        (guild) => guildCategory(guild) === "added"
    );
    const guildsToInvite = guildList.filter(
        (guild) => guildCategory(guild) === "invite"
    );

    return (
        <div className="space-y-10">
            {suspendedGuilds.length > 0 && (
                <div>
                    <HorizontalRule label="Suspended servers" />
                    <GuildList guilds={suspendedGuilds} {...props} />
                </div>
            )}
            {addedGuilds.length > 0 && (
                <div>
                    <HorizontalRule label="Servers" />
                    <GuildList guilds={addedGuilds} {...props} />
                </div>
            )}
            {guildsToInvite.length > 0 && (
                <div>
                    <HorizontalRule label="Invite the bot" />
                    <GuildList guilds={guildsToInvite} {...props} />
                </div>
            )}
        </div>
    );
}

function GuildList({ guilds, ...props }) {
    const sortedGuilds = [...guilds].sort((a, b) =>
        [
            a.access_type - b.access_type,
            b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1,
        ].find((x) => x !== 0)
    );
    return (
        <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {sortedGuilds.map((guild) => (
                <Guild guild={guild} key={guild.id} {...props} />
            ))}
        </div>
    );
}

function Guild({ guild, ...props }) {
    return (
        <div className="relative pt-2 pb-4 bg-gray-800 rounded-lg">
            {guild ? (
                <GuildIcon guild={guild} />
            ) : (
                <Skeleton className="w-16 h-16 mx-auto rounded-full" />
            )}
            {guild && (
                <span className="absolute text-gray-300 top-2 left-2">
                    {
                        [
                            "Owner",
                            "Admin",
                            "Manager",
                            "Whitelisted",
                            "Whitelisted",
                        ][guild.access_type]
                    }
                </span>
            )}
            {guild && guild.is_suspended && (
                <Link
                    href="https://docs.cleanerbot.xyz/misc/suspension#suspended-guild"
                    className="absolute top-2 right-2"
                >
                    <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
                </Link>
            )}
            <div className="px-8 mt-2 text-center truncate">
                {guild ? guild.name : <Skeleton className="h-6 rounded" />}
            </div>
            {guild ? (
                <GuildButton guild={guild} {...props} />
            ) : (
                <Skeleton className="h-12 mx-4 mt-4 rounded-lg" />
            )}
        </div>
    );
}

function GuildButton({ guild, route, updateRoute }) {
    const router = useRouter();
    return (
        <div className="mx-4 mt-4">
            <button
                className={clsx(
                    "w-full --btn --btn-4",
                    guild.is_suspended
                        ? "--btn-destructive"
                        : guild.is_added
                        ? "--btn-primary"
                        : "--btn-success"
                )}
                onClick={() => {
                    if (guild.is_suspended || guild.is_added)
                        return updateRoute({ guildId: guild.id });
                    const url = createOAuthRedirect({
                        withBot: true,
                        guildId: guild.id,
                        withAdmin: guild.access_type < 2,
                    });
                    router.push(url);
                }}
            >
                {guild.is_suspended
                    ? "Suspended"
                    : guild.is_added
                    ? "Dashboard"
                    : "Setup"}
            </button>
        </div>
    );
}

function Loading() {
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="inline font-mono text-4xl">Loading...</h1>
            <p className="mt-2 text-gray-200">
                Loading, please wait a little...
            </p>
        </div>
    );
}
