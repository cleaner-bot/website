
import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { CheckIcon, CheckCircleIcon, XIcon } from "@heroicons/react/solid";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Plan | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={PlanDashboard} current="plan" />
        </>
    )
}

const plans = [
    {
        title: "Starter",
        id: 0,
        featured: false,
        description: "All essential needs covered for servers with up to 25,000 members.",
        priceMonthly: 0,
        priceMontlyWithYearly: 0,
        priceYearly: 0,
        mainFeatures: [
            { id: 1, value: "Raid protection" },
            { id: 2, value: "Phishing protection" },
            { id: 3, value: "Easy to use dashboard" },
            { id: 4, value: "Community support" },
        ],
        recommended: "Recommended for small communities."
    },
    {
        title: "Pro",
        id: 1,
        featured: true,
        description: "Entire bot for medium sized servers with up to 75,000 members.",
        priceMonthly: 3,
        priceMontlyWithYearly: 2,
        priceYearly: 24,
        mainFeatures: [
            { id: 1, value: "Raid protection" },
            { id: 2, value: "Phishing protection" },
            { id: 3, value: "Easy to use dashboard" },
            { id: 4, value: "Workers" },
            { id: 5, value: "Custom challenge page" },
            { id: 6, value: "Advanced settings" },
            { id: 7, value: "Standard support" },
        ],
        recommended: "Recommended for medium sized communities with up to 75,000 members."
    },
    {
        title: "Pro+",
        id: 2,
        featured: false,
        description: "Entire bot for large communities. Recommended for servers with more than 50,000 members.",
        priceMonthly: 10,
        priceMontlyWithYearly: 6,
        priceYearly: 72,
        mainFeatures: [
            { id: 1, value: "Raid protection" },
            { id: 2, value: "Phishing protection" },
            { id: 3, value: "Easy to use dashboard" },
            { id: 4, value: "Workers" },
            { id: 5, value: "Custom challenge page" },
            { id: 6, value: "Advanced settings" },
            { id: 7, value: "Access to Pro+ dedicated bot" },
            { id: 8, value: "Standard support" },
            { id: 9, value: "E-Mail support" },
        ],
        recommended: "Recommended for large communities with over 50,000 members."
    },
]
const plan_features = [
    {
        title: "Main perks",
        features: [ 
            {
                title: "Raid protection",
                tiers: [
                    { title: "starter", value: true },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Phishing protection",
                tiers: [
                    { title: "starter", value: true },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Dashboard",
                tiers: [
                    { title: "starter", value: true },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "CAPTCHA service",
                tiers: [
                    { title: "starter", value: true },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Workers",
                tiers: [
                    { title: "starter", value: false, value: false },
                    { title: "pro", featured: true, value: "Included" },
                    { title: "pro+", featured: true, value: "Included" },
                ],
            },
            {
                title: "Member limit",
                tiers: [
                    { title: "starter", value: "25,000" },
                    { title: "pro", featured: true, value: "75,000" },
                    { title: "pro+", featured: true, value: "Unlimited" },
                ],
            },
            {
                title: "Priority",
                tiers: [
                    { title: "starter", value: "Lowest" },
                    { title: "pro", featured: true, value: "High" },
                    { title: "pro+", featured: true, value: "Highest" },
                ],
            },
        ]
    },
    {
        title: "Other perks",
        features: [
            {
                title: "Custom Bot",
                tiers: [
                    { title: "starter", value: "1 bot" },
                    { title: "pro", featured: true, value: "10 bots" },
                    { title: "pro+", featured: true, value: "100 bots" },
                ],
            },
            {
                title: "Bot",
                tiers: [
                    { title: "starter", value: "The Cleaner" },
                    { title: "pro", value: "The Cleaner" },
                    { title: "pro+", featured: true, value: "The Cleaner+" },
                ],
            },
            {
                title: "Community support",
                tiers: [
                    { title: "starter", value: true },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Standard support",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "E-Mail support",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: false },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Custom challenge join risk",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Custom challenge webpage",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Custom challenge embed",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
            {
                title: "Logging",
                tiers: [
                    { title: "starter", value: "Discord only" },
                    { title: "pro", featured: true, value: "Discord & download" },
                    { title: "pro+", featured: true, value: "Discord & download" },
                ],
            },
            {
                title: "Logging download data retention",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: "3 months" },
                    { title: "pro+", featured: true, value: "12 months" },
                ]
            },
            {
                title: "Logging without vote reminders",
                tiers: [
                    { title: "starter", value: false },
                    { title: "pro", featured: true, value: true },
                    { title: "pro+", featured: true, value: true },
                ],
            },
        ]
    },
    {
        title: "Workers",
        features: [
            {
                title: "Workers",
                tiers: [
                    { title: "starter", value: false, value: false },
                    { title: "pro", featured: true, value: "Included" },
                    { title: "pro+", featured: true, value: "Included" },
                ]
            },
            {
                title: "CPU time",
                tiers: [
                    { title: "starter", value: "10 ms" },
                    { title: "pro", featured: false, value: "10 ms" },
                    { title: "pro+", featured: true, value: "25 ms" },
                ]
            },
            {
                title: "RAM usage",
                tiers: [
                    { title: "starter", value: "128 kib" },
                    { title: "pro", featured: false, value: "128 kib" },
                    { title: "pro+", featured: true, value: "1 mib" },
                ]
            },
            {
                title: "Script size",
                tiers: [
                    { title: "starter", value: "16 kib" },
                    { title: "pro", featured: false, value: "16 kib" },
                    { title: "pro+", featured: true, value: "128 kib" },
                ]
            }
        ]
    }
]
const workersFeatures = [
    "Standard support",
    "10 ms CPU time",
    "128 kib RAM usage",
    "16 kib script size",
]

function PlanDashboard({ data }) {
    const [isYearlyBilling, setYearlyBilling] = useState(true);
    return (
        <>
            <div className="relative">
                {/* Overlapping background */}
                <div className="absolute bottom-0 hidden w-full h-6 xl:block" />

                {/* Toggle */}
                <div className="relative flex justify-center mt-12 sm:mt-16">
                <div className="bg-gray-800 p-0.5 rounded-lg flex">
                    <button
                        className={clsx(isYearlyBilling ? "hover:bg-gray-800" : "bg-white border-emerald-700 text-emerald-700 hover:bg-gray-50", "py-2 px-6 rounded-md shadow-sm text-sm font-medium")}
                        onClick={() => setYearlyBilling(false)}
                    >
                        Monthly billing
                    </button>
                    <button
                        className={clsx(!isYearlyBilling ? "hover:bg-gray-800" : "bg-white border-emerald-700 text-emerald-700 hover:bg-gray-50", "ml-0.5 py-2 px-6 rounded-md shadow-sm text-sm font-medium")}
                        onClick={() => setYearlyBilling(true)}
                    >
                        Yearly billing
                    </button>
                </div>
                </div>

                {/* Cards */}
                <div className="relative max-w-2xl pb-8 mx-auto mt-8 sm:mt-12 sm:px-6 xl:max-w-7xl xl:px-8 xl:pb-0">
                {/* Decorative background */}
                    <div className="absolute inset-0 hidden bg-gray-800 rounded-tl-lg rounded-tr-lg top-4 bottom-6 left-8 right-8 xl:block"/>

                    <div className="relative space-y-6 xl:space-y-0 xl:grid xl:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.title}
                                className={clsx(
                                    plan.featured ? "bg-white ring-2 ring-emerald-600 shadow-md" : "bg-gray-800 xl:bg-transparent",
                                    "pt-6 px-6 pb-3 rounded-lg xl:px-8 xl:pt-12 relative"
                                )}
                            >
                                <div>
                                    <h3
                                        className={clsx(
                                            plan.featured ? "text-emerald-500" : "text-white",
                                            "text-sm font-semibold uppercase tracking-wide"
                                        )}
                                    >
                                        {plan.title} {plan.id === data.entitlements.plan && " (current plan)"}
                                    </h3>
                                    {plan.featured && (
                                        <p className="absolute top-0 px-4 py-1.5 bg-emerald-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                                            Most popular
                                        </p>
                                    )}
                                    <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between xl:flex-col xl:items-start">
                                        <div className="flex items-center mt-3">
                                            <p
                                                className={clsx(
                                                    plan.featured ? "text-emerald-500" : "text-white",
                                                    "text-4xl font-extrabold tracking-tight"
                                                )}
                                            >
                                                {isYearlyBilling ? plan.priceMontlyWithYearly : plan.priceMonthly}€
                                            </p>
                                            <div className="ml-4">
                                                <p className={clsx(plan.featured ? "text-gray-600" : "text-white", "text-sm")}>
                                                    EUR / mo
                                                </p>
                                                <p className={clsx(plan.featured ? "text-gray-500" : "text-gray-200", "text-sm")}>
                                                    Billed {plan.priceMonthly === 0 ? "never" : isYearlyBilling ? <>yearly ({plan.priceYearly}€<span className="hidden 2xl:inline">, save {plan.priceMonthly * 12 - plan.priceYearly}€</span>)</> : <>monthly</>}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className={clsx(
                                                plan.featured ? "--btn-success" : "--btn-neutral",
                                                "--btn --btn-3 xl:w-full mt-4"
                                            )}
                                            disabled={plan.id === data.entitlements.plan}
                                            onClick={() => {
                                                data.entitlements.plan = plan.id;
                                                console.log(data)
                                            }}
                                        >
                                            {/* {plan.id === data.entitlements.plan ? <>Continue using {plan.title}</> : plan.priceMonthly > 0 ? <>Buy {plan.title}</> : <>Switch to {plan.title}</>} */}
                                            {plan.id === data.entitlements.plan ? <>Continue using {plan.title}</> : <>Coming soon</>}
                                        </button>
                                    </div>
                                </div>
                                <ul
                                    role="list"
                                    className={clsx(
                                        plan.featured ? "border-gray-200 divide-gray-200" : "border-emerald-500 divide-gray-500 divide-opacity-75",
                                        "pt-3 pb-7 border-t divide-y xl:border-t-0 mt-4"
                                    )}
                                >
                                    {plan.mainFeatures.map((mainFeature) => (
                                        <li key={mainFeature.id} className="flex items-center py-3">
                                            <CheckIcon className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                                            <span
                                                className={clsx(
                                                    plan.featured ? "text-gray-800" : "text-gray-200",
                                                    "ml-3 text-sm font-medium"
                                                )}
                                            >
                                                {mainFeature.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature comparison (up to xl) */}
            <section className="xl:hidden">
                <div className="max-w-2xl py-16 mx-auto space-y-16 sm:px-6">
                    {plans.map((plan, mobilePlanIndex) => (
                        <div key={plan.title} className="border-t border-gray-200">
                            {plan.featured ? <div className="grid grid-cols-2">
                                <div className="pt-6 sm:w-1/2">
                                    <h3 className={clsx(plan.featured ? "text-emerald-300" : "text-gray-100", "text-sm font-bold")}>
                                        {plan.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-200">{plan.description}</p>
                                </div>
                                <div className="-mt-px border-t-2 border-emerald-300" />
                            </div> : <>
                                <div className="pt-6 -mt-px sm:w-1/2">
                                    <h3 className={clsx(plan.featured ? "text-emerald-300" : "text-gray-100", "text-sm font-bold")}>
                                        {plan.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-200">{plan.description}</p>
                                </div>
                            </>}
                            {plan_features.map(perk => <Fragment key={perk.title}>
                                <h4 className="mt-10 text-sm font-bold text-gray-100">{perk.title}</h4>

                                <div className="relative mt-6">
                                    {/* Fake card background */}
                                    <div className="absolute inset-0 hidden pointer-events-none sm:block">
                                    <div
                                        className={clsx(
                                            plan.featured ? "shadow-md" : "shadow",
                                            "absolute right-0 w-1/2 h-full bg-gray-800 rounded-lg"
                                        )}
                                    />
                                    </div>

                                    <div
                                        className={clsx(
                                            plan.featured ? "ring-2 ring-emerald-300 shadow-md" : "ring-1 ring-black ring-opacity-5 shadow",
                                            "relative py-3 px-4 bg-gray-800 rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none"
                                        )}
                                    >
                                        <dl className="divide-y divide-gray-600">
                                            {perk.features.map((feature) => (
                                                <div
                                                    key={feature.title}
                                                    className="flex items-center justify-between py-3 sm:grid sm:grid-cols-2"
                                                >
                                                    <dt className="pr-4 text-sm font-medium text-gray-300">{feature.title}</dt>
                                                    <dd className="flex items-center justify-end sm:px-4 sm:justify-center">
                                                    {typeof feature.tiers[mobilePlanIndex].value === "string" ? (
                                                        <span
                                                            className={clsx(
                                                                feature.tiers[mobilePlanIndex].featured ? "text-emerald-400" : "text-gray-100",
                                                                "text-sm font-medium"
                                                            )}
                                                        >
                                                        {feature.tiers[mobilePlanIndex].value}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {feature.tiers[mobilePlanIndex].value === true ? (
                                                                <CheckIcon className="w-5 h-5 mx-auto text-emerald-400" />
                                                            ) : (
                                                                <XIcon className="w-5 h-5 mx-auto text-gray-400" />
                                                            )}
                                                        </>
                                                    )}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>

                                    {/* Fake card border */}
                                    <div className="absolute inset-0 hidden pointer-events-none sm:block">
                                    <div
                                        className={clsx(
                                            plan.featured ? "ring-2 ring-emerald-600" : "ring-1 ring-black ring-opacity-5",
                                            "absolute right-0 w-1/2 h-full rounded-lg"
                                        )}
                                    />
                                    </div>
                                </div>
                            </Fragment>)}
                            <p className="mt-4 text-gray-200">
                                <span className="text-emerald-400">*</span> Limit can be increased by contacting us.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature comparison (xl+) */}
            <section className="hidden xl:block">
                <div className="px-8 pt-24 mx-auto space-y-10 max-w-7xl">
                    {plan_features.map((perk, index) => <div key={index}>
                        <div className={clsx(index === 0 && "border-t border-gray-200", "w-full flex items-stretch")}>
                            <div className="flex items-end w-1/4 py-6 pr-4 -mt-px">
                                <h3 className="mt-auto text-sm font-bold text-gray-100">{perk.title}</h3>
                            </div>
                            {index === 0 && plans.map((plan, planIdx) => (
                                <div
                                    key={plan.title}
                                    className={clsx(planIdx === plans.length - 1 && "pr-4", "-mt-px pl-4 w-1/4")}
                                >
                                    <div
                                        className={clsx(plan.featured ? "border-emerald-300" : "border-transparent", "py-6 border-t-2")}
                                    >
                                        <p className={clsx(plan.featured ? "text-emerald-300" : "text-gray-100", "text-sm font-bold")}>
                                            {plan.title}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-200">{plan.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            {/* Fake card backgrounds */}
                            <div className="absolute inset-0 flex items-stretch pointer-events-none">
                                <div className="w-1/4 pr-4" />
                                <div className="w-1/4 px-4">
                                    <div className="w-full h-full bg-gray-800 rounded-lg shadow" />
                                </div>
                                <div className="w-1/4 px-4">
                                    <div className="w-full h-full bg-gray-800 rounded-lg shadow-md" />
                                </div>
                                <div className="w-1/4 pl-4">
                                    <div className="w-full h-full bg-gray-800 rounded-lg shadow" />
                                </div>
                            </div>

                            <table className="relative w-full">
                                <tbody className="divide-y divide-gray-600">
                                    {perk.features.map((feature) => (
                                        <tr key={feature.title}>
                                            <th scope="row" className="w-1/4 py-3 pr-4 text-sm font-medium text-left text-gray-300">
                                                {feature.title}
                                            </th>
                                            {feature.tiers.map((tier, tierIdx) => (
                                                <td
                                                    key={tier.title}
                                                    className={clsx(
                                                        tierIdx === feature.tiers.length - 1 ? "pl-4" : "px-4",
                                                        "relative w-1/4 py-0 text-center"
                                                    )}
                                                >
                                                    <span className="relative w-full h-full py-3">
                                                    {typeof tier.value === "string" ? (
                                                        <span
                                                            className={clsx(
                                                                tier.featured ? "text-emerald-400" : "text-gray-100",
                                                                "text-sm font-medium"
                                                            )}
                                                        >
                                                            {tier.value}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {tier.value === true ? (
                                                                <CheckIcon className="w-5 h-5 mx-auto text-emerald-400" />
                                                            ) : (
                                                                <XIcon className="w-5 h-5 mx-auto text-gray-400" />
                                                            )}
                                                        </>
                                                    )}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Fake card borders */}
                            <div className="absolute inset-0 flex items-stretch pointer-events-none">
                                <div className="w-1/4 pr-4" />
                                {plans.map(plan => <div className="w-1/4 px-4" key={plan.id}>
                                    <div className={clsx(plan.featured ? "ring-2 ring-emerald-600/100" : "ring-1 ring-black/5", "w-full h-full rounded-lg ring-opacity-5")} />
                                </div>)}
                            </div>
                        </div>
                    </div>)}
                    <p className="mt-4 text-gray-200">
                        <span className="text-emerald-400">*</span> Limit can be increased by contacting us.
                    </p>
                </div>
            </section>
        </>
    )
}
