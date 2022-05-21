import { useData } from "@/components/dash/data.jsx";
import { Page, Header } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { CommonRadar } from "@/components/radar.jsx";
import { useStatistics } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Statistics | The Cleaner Dashboard" />
            <Page page="statistics" {...data}>
                <StatisticsDashboard {...data} />
            </Page>
        </>
    );
}

function StatisticsDashboard({ guildId }) {
    const { data: response, error: isError } = useStatistics(guildId);
    return (
        <>
            <Header name="Statistics">Look at your statistics.</Header>
            {isError ? (
                <ErrorHandler error={isError} />
            ) : (
                <CommonRadar data={response?.data} />
            )}
        </>
    );
}
