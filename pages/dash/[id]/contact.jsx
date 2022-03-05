
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


function getContactEmail(guildId) {
    const chars = [];
    guildId = BigInt(guildId);
    for(let i = 0; i < 8; i++) {
        chars.push(guildId & 0xffn);
        guildId = guildId >> 8n;
    }
    const encoded_guildId = btoa(chars.reverse().map(x => String.fromCharCode(Number(x))).join());
    return `c-${encoded_guildId}@leodev.xyz`
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
                            Check the #pro-support channel for more information.
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

                        {((data.entitlements.contact_email === true || data.entitlements.contact_email <= data.entitlements.plan) && data.entitlements.contact_email !== false) && <>
                            <span className="mt-6 text-gray-300">
                                Your contact email:{" "}
                            </span>
                            <span className="hover:underline">
                                {getContactEmail(data.guild.id)}
                            </span>
                        </>}
                    </BlockRightSide>
                </>}
            </div>
        </>
    )
}
 