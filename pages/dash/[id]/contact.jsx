
import { useRouter } from "next/router";
import Link from "next/link";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Unlocked, OptionalUpgrade } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Contact | The Cleaner Dashboard"
            />
            <Page page="contact" {...data}>
                <ContactDashboard {...data} />
            </Page>
        </>
    )
}

function ContactDashboard({ user, entitlements, guildId }) {
    return (
        <>
            <Header name="Contact">
                How to contact us.
            </Header>

            <Section>
                <BlockWithPanel
                    name="Community Support"
                    description="Join the official Discord and receive help by the community. (staff may also respond, but no guarantees)"
                    panel={(
                        <Link href="/discord">
                            <a className="--btn --btn-3 --btn-primary">
                                Join Discord
                            </a>
                        </Link>
                    )}
                />
                {user.is_dev && <>
                    <BlockWithPanel
                        name="Standard Support"
                        description="Join the official Discord and receive help by the staff team. Check the #unlock channel for more information."
                        panel={(
                            <OptionalUpgrade entitlements={entitlements} guildId={guildId} required={entitlements.contact_standard}>
                                <Link href="/discord">
                                    <a className="--btn --btn-3 --btn-primary">
                                        Join Discord
                                    </a>
                                </Link>
                            </OptionalUpgrade>
                        )}
                    />
                    <BlockWithPanel
                        name="E-Mail Support"
                        description="Contact the staff team directly via E-Mail."
                        panel={(
                            <OptionalUpgrade entitlements={entitlements} guildId={guildId} required={entitlements.contact_email}>
                                <Unlocked />
                            </OptionalUpgrade>
                        )}
                    >
                        {entitlements.plan >= entitlements.contact_email && <>
                            <span className="mt-6 text-gray-300">
                                Your contact email:{" "}
                            </span>
                            <span className="break-all hover:underline">
                                cleaner+{entitlements.partnered ? "partners" : "support"}@leodev.xyz
                            </span>
                        </>}
                    </BlockWithPanel>
                </>}
            </Section>
        </>
    )
}
 