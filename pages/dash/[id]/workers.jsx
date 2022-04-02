
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";

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
                    field="workers_enabled"
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

