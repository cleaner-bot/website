
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Bot | The Cleaner Dashboard"
            />
            <Page page="bot" {...data}>
                <BotDashboard {...data} />
            </Page>
        </>
    )
}


function BotDashboard() {
    return (
        <>
            <Header name="Bot" />
        </>
    )
}
