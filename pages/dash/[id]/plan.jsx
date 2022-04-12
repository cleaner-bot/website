
import Link from "next/link";

import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Button, OptionalUpgrade, Unlocked } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Plan | The Cleaner Dashboard"
            />
            <Page page="plan" {...data}>
                <Plan {...data} />
            </Page>
        </>
    )
}


function Plan({ entitlements, guildId }) {
    return (
        <>
            <Header name="Plan" />
            <Section>
                <BlockWithPanel
                    name="Professional"
                    description="Subscribe to The Cleaner Professional for 30€/yr."
                    panel={(
                        <Button
                            text={["Subscribe", "Current plan"][entitlements.plan] || "Downgrade"}
                            disabled={entitlements.plan === 1}
                        />
                    )}
                >
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more information.
                        </a>
                    </Link>
                </BlockWithPanel>
                <BlockWithPanel
                    name="Partner programme"
                    description="Apply for the partner programme."
                    panel={(
                        <OptionalUpgrade entitlements={entitlements} guildId={guildId} required={2}>
                            <Unlocked />
                        </OptionalUpgrade>
                    )}
                >
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more information.
                        </a>
                    </Link>
                </BlockWithPanel>
            </Section>
        </>
    )
}
