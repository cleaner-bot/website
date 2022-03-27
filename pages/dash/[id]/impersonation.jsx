
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";
import { BlockRightSide, Toggle  } from "@/components/dash/ui.jsx";

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
                Impersonation prevention settings.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="impersonation_discord" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Discord impersonation
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Automatically kicks people trying to impersonate Discord staff.
                    </p>
                    <p className="text-gray-300">
                        This is a managed blocklist containing words like `discord`, `hypesquad`, `moderator` etc.
                    </p>
                    <p className="text-gray-300">
                        This will only act on a 100% match.
                    </p>
                </BlockRightSide>
            </div>
        </>
    )
}
