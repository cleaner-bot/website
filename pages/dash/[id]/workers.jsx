
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Toggle, OptionalUpgrade, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Workers | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={WorkersDashboard} current="workers" />
        </>
    )
}


function WorkersDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Workers
            </h1>
            <p className="mt-2 mb-16 text-gray-300">
                Manage your workers.
            </p>
            <BlockRightSide
                rightSide={<>
                    <OptionalUpgrade data={data} required={data.entitlements.workers}>
                        <Toggle data={data} field="workers_enabled" />
                    </OptionalUpgrade>
                </>}
            >
                <h2 className="text-2xl font-medium">
                    Workers master switch
                </h2>
                <p>
                    Enable workers.
                </p>
            </BlockRightSide>
        </>
    )
}

