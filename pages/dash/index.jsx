
import clsx from "clsx";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "@/components/image.jsx";
import { createOAuthRedirect, useGuilds } from "@/lib/api.js";
import Skeleton from "@/components/skeleton.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { range } from "@/lib/helper.js";


function GuildIcon({ icon, className }) {
    if(!icon)
        return <QuestionMarkCircleIcon className={clsx("inline rounded-full bg-gray-810", className)} />;
    return <Image src={icon} className={clsx("inline rounded-full bg-gray-810", className)} />;
}


export default function Dashboard() {
    const { data: response, error: isError } = useGuilds();
    const router = useRouter();
    const isLoading = !response && !isError;
    if(isError && isError.response && isError.response.status === 401)
        localStorage.removeItem("token");
    return (
        <div className="--container">
            <h1 className="pt-8 pb-4 mb-12 text-4xl font-bold text-center -heading">
                Your servers
            </h1>
            
            {isError && (isError.response && isError.response.status === 401 ? <div className="flex">
                <button className="mx-auto --btn --btn-4 --btn-primary" onClick={() => {
                    const url = createOAuthRedirect({});
                    router.push(url);
                }}>
                    Login using Discord
                </button>
            </div> : <ErrorHandler error={isError} />)}
            {(isLoading || response) && <GuildList response={response} />}
            {response && <>
                <h2 className="mt-20 mb-10 text-4xl font-bold text-center -heading">
                    {response.data.length === 0 ? "No servers?" : "Missing a server?"}
                </h2>
                <p className="text-center text-gray-200">
                    Only servers in which you have the <u>administrator</u> or <u>manage server</u> permission are shown.
                </p>
                <p className="pb-20 text-center text-gray-200">
                    It can take up to 30 seconds for your servers to update.
                </p>
            </>}
        </div>
    )
}

function GuildList({ response }) {
    const isLoading = !response;
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
                range(18, index => <Guild key={index} />)
            ) : (
                response.data.map(guild => <Guild guild={guild} key={guild.id} />)
            )}
        </div>
    )
}

function Guild({ guild }) {
    const router = useRouter();
    return (
        <div className="relative pt-2 pb-4 bg-gray-800 rounded-lg">
            {guild ? <GuildIcon icon={guild.icon} className="flex w-16 h-16 mx-auto" /> : <Skeleton className="w-16 h-16 mx-auto rounded-full" />}
            {guild && <span className="absolute text-gray-300 top-2 left-2">
                {guild.is_owner ? "Owner" : guild.is_admin ? "Admin" : "Manager"}
            </span>}
            <div className="px-8 mt-2 text-center truncate">
                {guild ? guild.name : <Skeleton className="h-6 rounded" />}
            </div>
            {guild ? (guild.is_added ? <Link href={`/dash/${guild.id}`}>
                <a className="mx-4 mt-4 --btn --btn-4 --btn-primary">
                    Dashboard
                </a>
            </Link> : <div className="mx-4 mt-4">
                <button className="w-full --btn --btn-4 --btn-success" onClick={() => {
                    const url = createOAuthRedirect({ bot: true, guild: guild.id, with_admin: guild.is_admin });
                    router.push(url);
                }}>
                    Setup
                </button>
            </div>) : <Skeleton className="h-12 mx-4 mt-4 rounded-lg" />}
        </div>
    )
}
