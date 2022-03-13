
import clsx from "clsx";
import { QuestionMarkCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from "@/components/image.jsx";
import Skeleton from "@/components/skeleton.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import Footer from "@/components/footer.jsx";
import { createOAuthRedirect, useGuilds } from "@/lib/api.js";
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
    const hasToLogin = isError && isError.response && isError.response.status === 401;
    if(hasToLogin)
        localStorage.removeItem("token");
    
    return (
        <>
            <div className="min-h-screen pb-40 --container">
                {hasToLogin ? <div className="flex items-center justify-center h-screen">
                    <div>
                        <h1 className="mb-12 text-2xl font-bold text-center">
                            You must login with Discord to gain access to the Dashboard.
                        </h1>
                        <button className="mx-auto --btn --btn-4 --btn-primary" onClick={() => {
                            const url = createOAuthRedirect({});
                            router.push(url);
                        }}>
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            
                            Login with Discord
                        </button>
                    </div>
                </div> : <>
                    <h1 className="pt-8 pb-4 mb-12 text-4xl font-bold text-center">
                        Your servers
                    </h1>
                    {isError && <ErrorHandler error={isError} />}
                    {(isLoading || response) && <GuildList response={response} />}
                    {response && !isError && <>
                        <h2 className="mt-20 mb-10 text-4xl font-bold text-center">
                            {response.data.length === 0 ? "No servers?" : "Missing a server?"}
                        </h2>
                        <p className="text-center text-gray-200">
                            Only servers in which you have the <u>administrator</u> or <u>manage server</u> permission are shown.
                        </p>
                        <p className="pb-20 text-center text-gray-200">
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

function GuildList({ response }) {
    const isLoading = !response;
    const servers = response && [...response.data].sort((a, b) => [b.is_suspended - a.is_suspended, b.is_added - a.is_added, b.is_owner - a.is_owner, b.is_admin - a.is_admin, b.name - a.name].find(x => x !== 0));
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
                range(18, index => <Guild key={index} />)
            ) : (
                servers.map(guild => <Guild guild={guild} key={guild.id} />)
            )}
        </div>
    )
}

function Guild({ guild }) {
    return (
        <div className="relative pt-2 pb-4 bg-gray-800 rounded-lg">
            {guild ? <GuildIcon icon={guild.icon} className="flex w-16 h-16 mx-auto" /> : <Skeleton className="w-16 h-16 mx-auto rounded-full" />}
            {guild && <span className="absolute text-gray-300 top-2 left-2">
                {guild.is_owner ? "Owner" : guild.is_admin ? "Admin" : "Manager"}
            </span>}
            {guild && guild.is_suspended && <Link href="/legal/terms#prohibited-activities">
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
    if(guild.is_suspended)
        return (
            <Link href="/legal/terms#prohibited-activities">
                <a className="mx-4 mt-4 --btn --btn-4 --btn-destructive">
                    Suspended
                </a>
            </Link>
        )
    if(guild.is_added)
        return (
            <Link href={`/dash/${guild.id}`}>
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

function DiscordIconWhite({ className }) {
    return (
        <svg width="71" height="55" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g clipPath="url(#clip0)">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/>
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="71" height="55" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
