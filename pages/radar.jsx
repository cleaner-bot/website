
import { HomeIcon, UsersIcon } from "@heroicons/react/solid";

import { useRadar } from "@/lib/api.js";
import MetaTags from "@/components/metatags.jsx";
import { range } from "@/lib/helper.js";
import Footer from "@/components/footer.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { Stats } from "@/components/radar.jsx";


export default function Radar() {
    const { data: response, error: isError } = useRadar();

    return (
        <div className="py-6 --container">
            <MetaTags
                title="The Cleaner Radar"
                description="Some statistics about The Cleaner."
            />

            <h1 className="mb-4 text-5xl font-bold">
                The Cleaner Radar
            </h1>
            <p className="mt-8">
                The Cleaner is a Discord bot for keeping your servers clean.
                The Cleaner Radar is powered by real data we collect anonymously to provide statistics.
            </p>
            {isError ? <>
                <ErrorHandler error={isError} />
            </> : <>
                <h2 className="mt-20 mb-4 text-2xl font-bold">
                    General statistics
                </h2>
                <Stats
                    stats={[
                        null,
                        { name: "Guilds", icon: HomeIcon, stat: response && response.data.stats.guild_count },
                        { name: "Users (approximate)", icon: UsersIcon, stat: response && response.data.stats.user_count },
                    ]}
                />
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
            
            <div className="pt-8 mt-40 border-t border-gray-550" />
            <Footer />
        </div>
    )
}

