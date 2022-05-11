
import { ArrowSmDownIcon, ArrowSmRightIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import { range } from "@/lib/helper.js";


export function Stats({ stats }) {
    return (
        <dl className="grid grid-cols-1 gap-px mt-5 overflow-hidden bg-gray-800 rounded-lg shadow md:grid-cols-2 lg:grid-cols-4">
            {stats.map(item => !item ? <div /> : !item.stat ? <Skeleton key={item.name} className="h-28 md:h-32 lg:h-[6.75rem]" /> : (
                <div key={item.name} className="px-4 py-5 sm:p-6 bg-gray-750">
                    <dt className="flex text-base font-normal text-gray-100">
                        {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                        {item.name}
                    </dt>
                    <dd>
                        <div className="flex items-baseline justify-between mt-1 md:block lg:flex">
                            <div className="flex items-baseline text-2xl font-semibold text-indigo-400">
                                {typeof(item.stat) === "number" ? formatNumber(item.stat) : <>
                                    {formatNumber(item.stat.now)}
                                    <span className="ml-2 text-sm font-medium text-gray-400">from {formatNumber(item.stat.previous)}</span>
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
                                {formatNumber(Math.abs(item.stat.now - item.stat.previous))}
                            </div>}
                        </div>
                        {typeof(item.stat) !== "number" && <div className="mt-2 text-xs font-medium text-gray-400">
                            All time total {formatNumber(item.stat.total)}
                        </div>}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

function formatNumber(number) {
    let [whole, fraction] = number.toString().split(".");
    whole = whole.split("").reverse().map((char, i) => i % 3 === 2 ? `,${char}` : char).reverse().join("").replace(/^,/g, "");
    return fraction && fraction.length > 0 ? `${whole}.${fraction}` : whole;
}

export function CommonRadar({ data }) {
    return (
        <>
            <h2 className="mt-20 mb-4 text-2xl font-bold">
                Basic trends
            </h2>
            <p className="mb-4 text-sm text-gray-200">
                Trends of triggered services. Comparing last 30 days to the 30 days before.
            </p>
            <Stats
                stats={[
                    { name: "Phishing", stat: data && data.categories.phishing },
                    { name: "Antispam", stat: data && data.categories.antispam },
                    { name: "Advertisement", stat: data && data.categories.advertisement },
                    { name: "Other", stat: data && data.categories.other },
                    { name: "Dehoist", stat: data && data.categories.dehoist },
                    { name: "Anti raid", stat: data && data.categories.user_count },
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
                    { name: "Ban", stat: data && data.challenges.ban },
                    { name: "Kick", stat: data && data.challenges.kick },
                    { name: "Interactive challenge", stat: data && data.challenges.role },
                    { name: "Timeout", stat: data && data.challenges.timeout },
                ]}
            />

            <h2 className="mt-20 mb-4 text-2xl font-bold">
                Triggered rules
            </h2>
            <p className="mb-4 text-sm text-gray-200">
                All rules. Last 30 days.
            </p>

            {data ? <Stats
                stats={Object.keys(data.rules).sort((a, b) => data.rules[b].now - data.rules[a].now).map(key => ({ name: key, stat: data.rules[key] }))}
            /> : <Stats stats={range(12, index => ({ name: index }))} />}

            <h2 className="mt-20 mb-4 text-2xl font-bold">
                Triggered antispam
            </h2>
            <p className="mb-4 text-sm text-gray-200">
                All traffic rules. Last 30 days.
            </p>

            {data ? <Stats
                stats={Object.keys(data.traffic).sort((a, b) => data.traffic[b].now - data.traffic[a].now).map(key => ({ name: key, stat: data.traffic[key] }))}
            /> : <Stats stats={range(6, index => ({ name: index }))} />}
        </>
    )
}
