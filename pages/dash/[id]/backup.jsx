
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Checkbox, Upgrade, BlockRightSide } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <DataWrapper guildId={router.isReady && router.query.id} Inner={BackupDashboard} current="backup" />
    )
}


function BackupDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Backup
            </h1>
            <p className="text-gray-300 mt-2">
                Backup settings.
            </p>
        </>
    )
}
