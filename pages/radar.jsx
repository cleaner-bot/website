
import { ArrowSmDownIcon, ArrowSmRightIcon, ArrowSmUpIcon, HomeIcon, UsersIcon } from "@heroicons/react/solid";
import clsx from "clsx";

import { useRadar } from "@/lib/api.js";
import MetaTags from "@/components/metatags.jsx";
import Skeleton from "@/components/skeleton.jsx";
import { range } from "@/lib/helper.js";
import Footer from "@/components/footer.jsx";
import ErrorHandler from "@/components/dash/error";


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
                        { name: "Guilds", icon: HomeIcon, stat: response && response.data.stats.guild_count },
                        { name: "Users", icon: UsersIcon, stat: response && response.data.stats.user_count },
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


function Stats({ stats }) {
    return (
        <dl className="grid grid-cols-1 gap-px mt-5 overflow-hidden bg-gray-800 rounded-lg shadow md:grid-cols-2 lg:grid-cols-4">
            {stats.map(item => !item.stat? <Skeleton key={item.name} className="h-28 md:h-32 lg:h-[6.75rem]" /> : (
                <div key={item.name} className="px-4 py-5 sm:p-6 bg-gray-750">
                    <dt className="flex text-base font-normal text-gray-100">
                        {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                        {item.name}
                    </dt>
                    <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
                        <div className="flex items-baseline text-2xl font-semibold text-indigo-400">
                            {typeof(item.stat) === "number" ? item.stat : <>
                                {item.stat.now}
                                <span className="ml-2 text-sm font-medium text-gray-400">from {item.stat.previous}</span>
                            </>}
                        </div>

                        {typeof(item.stat) !== "number" && <div
                            className={clsx(
                                item.stat.now === item.stat.previous ? "bg-gray-100 text-gray-800" : item.stat.now <= item.stat.previous ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                                "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                            )}
                        >
                            {item.stat.now === item.stat.previous ? (
                                <ArrowSmRightIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-gray-500" />
                            ) : item.stat.now > item.stat.previous ? (
                                <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" />
                            ) : (
                                <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" />
                            )}

                            <span className="sr-only">{item.stat.now > item.stat.previous ? "Increased" : "Decreased"} by</span>
                            {Math.abs(item.stat.now - item.stat.previous)}
                        </div>}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
