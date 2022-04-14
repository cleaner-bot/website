
import { useData } from "@/components/dash/data.jsx";
import { Page, Header } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Analytics | The Cleaner Dashboard"
            />
            <Page page="analytics" {...data}>
                <AnalyticsDashboard {...data} />
            </Page>
        </>
    )
}


function AnalyticsDashboard({ config, setConfig, entitlements, guildId }) {
    return (
        <>
            <Header name="Analytics">
                Look at your analytics.
            </Header>
        </>
    )
}

