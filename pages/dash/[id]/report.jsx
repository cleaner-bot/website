
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Report | The Cleaner Dashboard"
            />
            <Page page="report" {...data}>
                <ReportDashboard {...data} />
            </Page>
        </>
    )
}


function ReportDashboard({ config, setConfig, entitlements, guildId }) {
    return (
        <>
            <Header name="Report">
                Manage your reporting.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable report"
                    description="Enable report."
                    field="report_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.report}
                    entitlements={entitlements}
                />
            </Section>
        </>
    )
}

