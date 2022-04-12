
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Backup | The Cleaner Dashboard"
            />
            <Page page="backup" {...data}>
                <BackupDashboard {...data} />
            </Page>
        </>
    )
}


function BackupDashboard() {
    return (
        <>
            <Header name="Backup" />
        </>
    )
}
