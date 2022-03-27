
import { useRouter } from "next/router";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { Toggle, OptionalUpgrade, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { setConfig } from "next/config";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Workers | The Cleaner Dashboard"
            />
            <Page page="workers" {...data}>
                <WorkersDashboard {...data} />
            </Page>
        </>
    )
}


function WorkersDashboard({ config, setConfig, entitlements, guildId }) {
    return (
        <>
            <Header name="Workers">
                Manage your worker.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable workers"
                    description="Enable workers."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.workers}
                    entitlements={entitlements}
                />
            </Section>
        </>
    )
}

