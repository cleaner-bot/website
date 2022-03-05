
import clsx from "clsx";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "@/components/image.jsx";
import { createOAuthRedirect, useGuilds } from "@/lib/api.js";
import Skeleton from "@/components/skeleton.jsx";
import { ExternalLink } from "@/components/buttons.jsx";
import { range } from "@/lib/helper.js";


function GuildIcon({ icon, className }) {
    if(!icon)
        return <QuestionMarkCircleIcon className={clsx("inline rounded-full bg-gray-800", className)} />;
    return <Image src={icon} className={clsx("inline rounded-full bg-gray-800", className)} />;
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
            
            {isError && (isError.response ? <>
                {isError.response.status === 401 && <div className="flex">
                    <button className="mx-auto --btn --btn-4 --btn-primary" onClick={() => {
                        const url = createOAuthRedirect({});
                        router.push(url);
                    }}>
                        Login using Discord
                    </button>
                </div>}
                {isError.response.status === 429 && <div className="w-full px-4 mx-auto mt-20 sm:w-96">
                    <h1 className="font-mono text-4xl font-bold text-center text-rose-400">
                        Slow down!
                    </h1>
                    <p className="mt-6 text-gray-200">
                        Your network is sending too many requests!
                    </p>
                    <p className="text-gray-200">
                        It can take up to one minute to regain access.
                    </p>
                    <ExternalLink href="/discord" className="mt-12">
                        Support (discord)
                    </ExternalLink>
                </div>}
                {isError.response.status} {isError.response.data.detail}
            </> : <div className="text-red-400">
                An unknown error occured.
            </div>)}
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
    const router = useRouter();
    const isLoading = !response;
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? <>
                {range(20, index => <Skeleton as="div" key={index} overrideDisplay="block h-[4.5rem] rounded-lg" />)}
            </> : response.data.map(guild => <div className="relative pt-2 pb-4 bg-gray-800 rounded-lg" key={guild.id}>
                <GuildIcon icon={guild.icon} className="flex w-16 h-16 mx-auto" />
                <span className="absolute text-gray-300 top-2 left-2">
                    {guild.is_owner ? "Owner" : "Manager"}
                </span>
                <p className="px-8 mt-2 text-center truncate">
                    {guild.name}
                </p>
                {guild.is_added ? <Link href={`/dash/${guild.id}`}>
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
                </div>}
            </div>)}
        </div>
    )
}
