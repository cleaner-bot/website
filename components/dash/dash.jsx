
import { InternalLink } from "@/components/buttons.jsx";
import Sidebar from "@/components/dash/sidebar.jsx";
import ErrorHandler from "@/components/dash/error.jsx";


export function Loading() {
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="inline font-mono text-4xl">
                Loading...
            </h1>
            <p className="mt-2 text-gray-200">
                Loading, please wait a little...
            </p>
        </div>
    )
}


export function Page({ guildId, error, user, guild, entitlements, children, page }) {
    if(!guildId || (!user && !error))
        return (
            <Sidebar guildId={guildId} current={page}>
                <Loading />
            </Sidebar>
        )
    if(error)
        return (
            <Sidebar guildId={guildId} current={page}>
                <ErrorHandler error={error} />
            </Sidebar>
        )
    if(!guild)
        return (
            <Sidebar guildId={guildId} current={page} user={user}>
                <div className="w-full px-4 mx-auto mt-20 sm:w-96">
                    <h1 className="text-4xl font-medium text-center text-rose-400">
                        Server not found!
                    </h1>
                    <p className="mt-6 text-center text-gray-200">
                        The Cleaner is not in this server or 
                    </p>
                    <p className="text-center text-gray-200">
                        you don&apos;t have access to it.
                    </p>
                    <InternalLink href="/dash/" className="mt-12">
                        Dashboard
                    </InternalLink>
                </div>
            </Sidebar>
        )
    return (
        <Sidebar guildId={guildId} current={page} user={user} guild={guild} entitlements={entitlements}>
            {children}
        </Sidebar>
    )
}

export function Header({ name, children }) {
    return (
        <>
            <h1 className="text-2xl font-bold">
                { name }
            </h1>
            {children && <div className="mt-2 text-gray-300">
                {children}
            </div>}
        </>
    )
}

export function Section({ name, children }) {
    return (
        <>
            {name && <h2 className="mt-20 text-2xl font-medium">
                {name}
            </h2>}
            <div className="my-12 space-y-12">
                {children}
            </div>
        </>
    )
}
