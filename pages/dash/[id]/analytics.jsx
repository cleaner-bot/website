
import { useData } from "@/components/dash/data.jsx";
import { Page, Header } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { Stats } from "@/components/radar.jsx";
import { useAnalytics } from "@/lib/api.js";
import { range } from "@/lib/helper.js";

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
    const { data: response, error: isError } = useAnalytics(guildId);
    return (
        <>
            <Header name="Analytics">
                Look at your analytics.
            </Header>
            {isError ? (
                <ErrorHandler error={isError} /> 
            ) : <>
                <h2 className="mt-20 mb-4 text-2xl font-bold">
                    Basic trends
                </h2>
                <p className="mb-4 text-sm text-gray-200">
                    Trends of triggered rules. Comparing last 30 days to the 30 days before.
                </p>
                <Stats
                    stats={[
                        { name: "Phishing", stat: response && response.data.categories.phishing },
                        { name: "Antispam", stat: response && response.data.categories.antispam },
                        { name: "Advertisement", stat: response && response.data.categories.advertisement },
                        { name: "Other", stat: response && response.data.categories.other },
                    ]}
                />
                
                <h2 className="mt-20 mb-4 text-2xl font-bold">
                    Deployed challenges
                </h2>
                <p className="mb-4 text-sm text-gray-200">
                    Trends of deployed challenges as a response to stop bad actors. Last 30 days.
                </p>
                <Stats
                    stats={[
                        { name: "Ban", stat: response && response.data.challenges.ban },
                        { name: "Kick", stat: response && response.data.challenges.kick },
                        { name: "Interactive challenge", stat: response && response.data.challenges.role },
                        { name: "Timeout", stat: response && response.data.challenges.timeout },
                    ]}
                />

                <h2 className="mt-20 mb-4 text-2xl font-bold">
                    Triggered rules
                </h2>
                <p className="mb-4 text-sm text-gray-200">
                    All rules. Last 30 days.
                </p>

                {response ? <Stats
                    stats={Object.keys(response.data.rules).sort((a, b) => response.data.rules[b].now - response.data.rules[a].now).map(key => ({ name: key, stat: response.data.rules[key] }))}
                /> : <Stats stats={range(12, index => ({ name: index }))} />}

                <h2 className="mt-20 mb-4 text-2xl font-bold">
                    Triggered antispam
                </h2>
                <p className="mb-4 text-sm text-gray-200">
                    All traffic rules. Last 30 days.
                </p>

                {response ? <Stats
                    stats={Object.keys(response.data.traffic).sort((a, b) => response.data.traffic[b].now - response.data.traffic[a].now).map(key => ({ name: key, stat: response.data.traffic[key] }))}
                /> : <Stats stats={range(6, index => ({ name: index }))} />}
            </>}
        </>
    )
}

