
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Backup | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={BackupDashboard} current="backup" />
        </>
    )
}


function BackupDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Backup
            </h1>
            <p className="mt-2 text-gray-300">
                Backup settings.
            </p>
        </>
    )
}
