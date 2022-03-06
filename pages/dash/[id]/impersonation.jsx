
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Impersonation | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={ImpersonationDashboard} current="impersonation" />
        </>
    )
}


function ImpersonationDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Impersonation
            </h1>
            <p className="mt-2 text-gray-300">
                Impersonation settings.
            </p>
        </>
    )
}
