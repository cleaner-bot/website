
import { useRouter } from "next/router";
import Link from "next/link";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";
import { BlockRightSide, Button, OptionalUpgrade, Unlocked } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Plan | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={Plan} current="plan" />
        </>
    )
}


function Plan({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Plan
            </h1>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Button
                            text={["Upgrade", "Current plan"][data.entitlements.plan] || "Downgrade"}
                            disabled={data.entitlements === 1}
                        />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Professional
                    </h2>
                    <p className="text-gray-200">
                        Subscribe to The Cleaner Professional for 30€/yr.
                    </p>
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more information.
                        </a>
                    </Link>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <OptionalUpgrade data={data} required={2}>
                            <Unlocked />
                        </OptionalUpgrade>
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Partner programme
                    </h2>
                    <p className="text-gray-200">
                        Apply for the partner programme.
                    </p>
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more information.
                        </a>
                    </Link>
                </BlockRightSide>
            </div>
        </>
    )
}
