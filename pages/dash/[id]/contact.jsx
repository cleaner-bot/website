
import { useRouter } from "next/router";
import Link from "next/link";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Unlocked, OptionalUpgrade, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Contact | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={ContactDashboard} current="contact" />
        </>
    )
}

function ContactDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Contact
            </h1>
            <p className="mt-2 text-gray-300">
                How to contact us.
            </p>

            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Link href="/discord">
                            <a className="--btn --btn-3 --btn-primary">
                                Join Discord
                            </a>
                        </Link>
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Community Support
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Join the official Discord and receive help by the community.
                    </p>
                    <p className="text-gray-300">
                        Staff may also respond, but not guaranteed.
                    </p>
                </BlockRightSide>
                {data.user.is_dev && <>
                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.contact_standard}>
                                <Link href="/discord">
                                    <a className="--btn --btn-3 --btn-primary">
                                        Join Discord
                                    </a>
                                </Link>
                            </OptionalUpgrade>
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Standard Support
                        </h2>
                        <p className="mt-2 text-gray-300">
                            Join the official Discord and receive help by the staff team.
                            Check the #unlock channel for more information.
                        </p>
                    </BlockRightSide>
                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.contact_email}>
                                <Unlocked />
                            </OptionalUpgrade>
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            E-Mail Support
                        </h2>
                        <p className="mt-2 text-gray-300">
                            Contact the staff team directly via E-Mail.
                        </p>

                        {data.entitlements.plan >= data.entitlements.contact_email && <>
                            <span className="mt-6 text-gray-300">
                                Your contact email:{" "}
                            </span>
                            <span className="break-all hover:underline">
                                cleaner+{data.entitlements.partnered ? "partners" : "support"}@leodev.xyz
                            </span>
                        </>}
                    </BlockRightSide>
                </>}
            </div>
        </>
    )
}
 