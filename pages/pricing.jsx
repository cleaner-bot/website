
import { Fragment } from "react";
import { CheckCircleIcon, CheckIcon, MinusIcon } from "@heroicons/react/solid";
import Link from "next/link";

import Footer from "@/components/footer.jsx";
import MetaTags from "@/components/metatags.jsx";


const includedFeatures = [
    "Support (Discord & Mail)",
    "Advanced settings + custom branding",
    "Log file downloads",
    "More than 100,000 members",
    "Workers*",
]
const eligible = [
    "Verified & Partnered servers*",
    "OG servers",
    "FOSS servers",
]

const sections = [
    {
        name: "Features",
        features: [
            { name: "Anti Spam", tiers: { free: true, pro: true } },
            { name: "Firewall", tiers: { free: true, pro: true } },
            { name: "Phishing prevention", tiers: { free: true, pro: true } },
            { name: "Automatic Slowmode", tiers: { free: true, pro: true } },
            { name: "Dashboard", tiers: { free: true, pro: true } },
            { name: "Logging", tiers: { free: true, pro: true } },
            { name: "Anti Raid", tiers: { free: "Early access", pro: "Early access" } },
            { name: "Challenge & timeouts", tiers: { free: true, pro: true } },
            { name: "Super Verification", tiers: { free: "Early access", pro: "Early access" } },
            { name: "Multiple languages", tiers: { free: true, pro: true }, link: { text: "Help us", href: "/docs/i18n" } },
            { name: "Member limit", tiers: { free: "100,000 members *", pro: "Unlimited" } },
        ],
    },
    {
        name: "Miscellaneous",
        features: [
            { name: "Automatic dehoisting", tiers: { free: true, pro: true } },
            { name: "Discord impersonation", tiers: { free: true, pro: true } },
            { name: "Advanced impersonation", tiers: { pro: true } },
            { name: "Support", tiers: { free: "Community", pro: "Dedicated (E-Mail, tickets, ...)" } },
            { name: "Log file downloads", tiers: { pro: true } },
            { name: "Custom risk score / disabling security level", tiers: { pro: true } },
            { name: "Custom challenge branding", tiers: { pro: true } },
            { name: "Custom Super Verification branding", tiers: { pro: "Early access" } },
        ],
    },
    {
        name: "Upcoming features",
        features: [
            { name: "Backups", tiers: { free: "Coming soon", pro: "Coming soon" } },
            { name: "Workers", tiers: { pro: "Coming soon" } },
            { name: "Custom bot", tiers: { pro: "Coming soon" } },
        ]
    }
]

export default function Pricing() {
    return (
        <div className="py-16 --container">
            <MetaTags
                title="The Cleaner Pricing"
                description="You aren't supposed to see this yet :eyes:"
            />
            <h2 className="text-2xl font-extrabold text-center text-gray-100 sm:text-4xl lg:text-5xl">
                Support The Cleaner
            </h2>
            <p className="mt-4 text-xl text-center text-gray-300">
                If you're not satisfied, contact us within the first 14 days and we'll send you a full refund.
            </p>
            <div className="my-16 lg:flex">
                <div className="flex-1 p-6 bg-gray-800 rounded-t-lg lg:p-12 lg:rounded-tr-none lg:rounded-l-lg">
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-400">
                        The Cleaner Professional
                    </h2>
                    <p>
                        Support the development and gain access to reserved features.
                    </p>
                    <div className="flex items-center justify-center my-8">
                        <h3 className="pr-4 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                            What's included
                        </h3>
                        <div className="flex-grow h-1 rounded-full bg-gray-550" />
                    </div>
                    <ul className="grid gap-4 text-sm md:grid-cols-2">
                        {includedFeatures.map(feature => <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-sm text-gray-200">{feature}</p>
                      </li>)}
                    </ul>
                    <p className="mt-6 text-xs font-gray-300">
                        * Early access, please contact us.
                    </p>
                </div>
                <div className="flex-shrink-0 p-6 bg-gray-100 rounded-b-lg lg:p-12 lg:rounded-bl-none lg:rounded-r-lg lg:w-80">
                    <p className="text-lg font-medium text-center text-gray-900">
                        Pay yearly
                    </p>
                    <div className="flex items-center justify-center mt-4 text-5xl font-extrabold text-gray-900">
                        <span>30€</span>
                        <span className="flex flex-col ml-3 text-sm font-medium leading-3 text-gray-600">
                            <span>EUR</span>
                            <span>per year</span>
                        </span>
                    </div>
                    <Link href="/dash?component=plan">
                        <a className="mt-8 --btn --btn-4 --btn-neutral">
                            Select server
                        </a>
                    </Link>
                    <div className="mt-6 text-center text-gray-800">
                        <p>
                            We accept
                        </p>
                        <p>
                            Stripe & Crypto (ETH, BTC)
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-16 lg:flex">
                <div className="flex-1 p-6 bg-gray-800 rounded-t-lg lg:p-12 lg:rounded-tr-none lg:rounded-l-lg">
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-400">
                        Partner programme
                    </h2>
                    <p>
                        Partner with The Cleaner and gain all benefits from The Cleaner Professional.
                    </p>
                    <div className="flex items-center justify-center my-8">
                        <h3 className="pr-4 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                            Who's eligible
                        </h3>
                        <div className="flex-grow h-1 rounded-full bg-gray-550" />
                    </div>
                    <ul className="grid gap-4 text-sm md:grid-cols-2">
                        {eligible.map(feature => <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-sm text-gray-200">{feature}</p>
                      </li>)}
                    </ul>
                    <p className="mt-6 text-xs font-gray-300">
                        * Verified and partnered servers automatically receive Partner status.
                    </p>
                </div>
                <div className="flex-shrink-0 p-6 bg-gray-100 rounded-b-lg lg:p-12 lg:rounded-bl-none lg:rounded-r-lg lg:w-80">
                    <p className="text-lg font-medium text-center text-gray-900">
                        Pay <span className="line-through">yearly</span> never
                    </p>
                    <div className="flex items-center justify-center mt-4 text-5xl font-extrabold text-gray-900">
                        <span>0€</span>
                        <span className="flex flex-col ml-3 text-sm font-medium leading-3 text-gray-600 line-through">
                            <span>EUR</span>
                            <span>per year</span>
                        </span>
                    </div>
                    <Link href="/dash?component=plan">
                        <a className="mt-8 --btn --btn-4 --btn-neutral">
                            Select server
                        </a>
                    </Link>
                </div>
            </div>
            <table className="w-full h-px table-fixed">
                <thead>
                    <tr>
                        <th className="px-6 pb-4 text-sm font-medium text-left text-gray-300" scope="col">
                            <span className="sr-only">Feature by</span>
                            <span>Plans</span>
                        </th>
                        <th
                            className="w-1/3 px-6 pb-4 text-lg font-medium leading-6 text-left"
                            scope="col"
                        >
                            Free
                        </th>
                        <th
                            className="w-1/3 px-6 pb-4 text-lg font-medium leading-6 text-left"
                            scope="col"
                        >
                            <span className="hidden sm:inline">Professional</span>
                            <span className="sm:hidden">Pro</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="border-t divide-y border-gray-550 divide-gray-550">
                    {sections.map(section => (
                        <Fragment key={section.name}>
                            <tr>
                                <th
                                    className="py-3 pl-6 text-sm font-medium text-left text-gray-300 bg-gray-750"
                                    colSpan={3}
                                    scope="colgroup"
                                >
                                    {section.name}
                                </th>
                            </tr>
                            {section.features.map(feature => (
                                <tr key={feature.name}>
                                    <th className="px-6 py-5 text-sm font-normal text-left text-gray-100" scope="row">
                                        {feature.name}
                                        {feature.link && <Link href={feature.link.href}>
                                            <a className="px-2 py-0.5 ml-4 text-sm uppercase bg-gray-900 hover:bg-gray-800 --anim rounded-full">
                                                {feature.link.text}
                                            </a>
                                        </Link>}
                                    </th>
                                    {["free", "pro"].map(tier => (
                                        <td key={tier} className="px-6 py-5">
                                            {typeof feature.tiers[tier] === "string" ? (
                                                <span className="block text-sm text-gray-200">{feature.tiers[tier]}</span>
                                            ) : (
                                                <>
                                                    {feature.tiers[tier] === true ? (
                                                        <CheckIcon className="w-5 h-5 text-green-500" aria-hidden="true" />
                                                    ) : (
                                                        <MinusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                    )}

                                                    <span className="sr-only">
                                                        {feature.tiers[tier] === true ? 'Included' : 'Not included'} in {tier}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </Fragment>
                    ))}
                </tbody>
            </table>
            <p className="mt-6 text-xs text-gray-300">
                * We will automatically active a <b>free four week trial</b> if your server has more than 100,000 members.
            </p>
            <div className="pb-8 mt-20 border-t border-gray-550" />
            <Footer />
        </div>
    )
}
