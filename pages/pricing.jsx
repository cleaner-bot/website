import { Fragment, useState } from "react";
import {
    CheckCircleIcon,
    CheckIcon,
    MinusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

import Footer from "@/components/footer.jsx";
import MetaTags from "@/components/metatags.jsx";
import { Slider, HorizontalRule } from "@/components/dash/ui.jsx";

const includedFeatures = [
    "Support (Discord & Mail)",
    "Advanced settings + custom branding",
    "Log file downloads",
    "More than 20,000 members",
    "Join guard",
];
const eligible = [
    "Verified & Partnered servers*",
    "Early adopters of the bot (OG servers)",
    "Servers of FOSS projects",
];

const sections = [
    {
        name: "General",
        features: [
            { name: "Dashboard", tiers: { free: true, pro: true } },
            { name: "Logging", tiers: { free: true, pro: true } },
            { name: "Statistics", tiers: { free: true, pro: true } },
            { name: "Automatic dehoisting", tiers: { free: true, pro: true } },
            { name: "Discord impersonation", tiers: { free: true, pro: true } },
            { name: "Multiple languages", tiers: { free: true, pro: true } },
            {
                name: "Member limit",
                tiers: { free: "20,000 members *", pro: "Unlimited" },
            },
            {
                name: "Support",
                tiers: {
                    free: "Community",
                    pro: "Community, E-Mail and Tickets",
                },
            },
        ],
    },
    {
        name: "Security",
        features: [
            { name: "Anti Spam", tiers: { free: true, pro: true } },
            { name: "Firewall", tiers: { free: true, pro: true } },
            { name: "Phishing prevention", tiers: { free: true, pro: true } },
            { name: "Automatic Slowmode", tiers: { free: true, pro: true } },
            { name: "Challenge & timeouts", tiers: { free: true, pro: true } },
            {
                name: "Report to server staff",
                tiers: { free: "Early access", pro: "Early access" },
            },
        ],
    },
    {
        name: "Verification",
        features: [
            { name: "Anti Raid", tiers: { free: true, pro: true } },
            { name: "Super Verification", tiers: { free: true, pro: true } },
            { name: "Join Guard", tiers: { pro: "Early access" } },
        ],
    },
    {
        name: "Professional",
        features: [
            { name: "Advanced impersonation", tiers: { pro: true } },
            { name: "Log file downloads", tiers: { pro: true } },
            {
                name: "Custom risk score / disabling security level",
                tiers: { pro: true },
            },
            { name: "Branding", tiers: { pro: true } },
        ],
    },
    {
        name: "Upcoming features",
        features: [{ name: "Custom bot", tiers: { pro: "Coming soon" } }],
    },
];

export default function Pricing() {
    const [memberCount, setMemberCount] = useState(0);
    return (
        <div className="py-16 --container">
            <MetaTags
                title="The Cleaner Pricing"
                description="You aren't supposed to see this yet :eyes:"
            />
            <h2 className="text-2xl font-extrabold text-center text-gray-100 sm:text-4xl lg:text-5xl">
                Support The Cleaner
            </h2>
            <div className="my-16 lg:flex">
                <div className="flex-1 p-6 bg-gray-800 rounded-t-lg lg:p-12 lg:rounded-tr-none lg:rounded-l-lg">
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-400">
                        The Cleaner Professional
                    </h2>
                    <p>
                        Support the development and gain access to reserved
                        features.
                    </p>
                    <div className="flex items-center justify-center my-8">
                        <h3 className="pr-4 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                            What&apos;s included
                        </h3>
                        <div className="flex-grow h-1 rounded-full bg-gray-550" />
                    </div>
                    <ul className="grid gap-4 text-sm md:grid-cols-2">
                        {includedFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon
                                        className="w-5 h-5 text-green-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="ml-3 text-sm text-gray-200">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-center my-8">
                        <h3 className="pr-4 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                            Pricing
                        </h3>
                        <div className="flex-grow h-1 rounded-full bg-gray-550" />
                    </div>
                    <p className="text-gray-200">Members pricing</p>
                    <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-300">
                            First 20,000 members are free.
                        </li>
                        <li className="text-sm text-gray-300">
                            0.05€ per 1,000 members for members 20,000 - 100,000
                        </li>
                        <li className="text-sm text-gray-300">
                            0.20€ per 10,000 members for all members after that
                        </li>
                    </ul>
                    <p className="mt-4 text-gray-200">Pricing calculator</p>
                    <div className="sm:flex sm:w-1/2">
                        <span className="flex-none pr-8 text-sm text-gray-300">
                            Member count
                        </span>
                        <Slider
                            minValue={0}
                            maxValue={1000}
                            step={1}
                            value={memberCount}
                            setValue={setMemberCount}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-200">
                        Pricing for{" "}
                        {memberCount === 0 ? "0" : `${memberCount},000`}{" "}
                        members:{" "}
                        {roundNumber(5 + getMembersPricing(memberCount))}€/mo{" "}
                        {roundNumber(50 + getMembersPricing(memberCount, true))}
                        €/yr
                    </p>
                </div>
                <div className="flex-shrink-0 p-6 text-gray-900 bg-gray-100 rounded-b-lg lg:p-12 lg:rounded-bl-none lg:rounded-r-lg lg:w-80">
                    <p className="text-lg font-medium text-center">
                        Pay yearly
                    </p>
                    <p className="mt-4 text-center text-black">Starting at</p>
                    <div className="flex items-center justify-center text-5xl font-extrabold">
                        <span>50€</span>
                        <span className="flex flex-col ml-3 text-sm font-medium leading-3 text-gray-600">
                            <span>EUR</span>
                            <span>per year</span>
                        </span>
                    </div>
                    <div className="mt-6 text-center text-gray-800">
                        <p>Stripe & Coinbase</p>
                    </div>
                    <HorizontalRule label="OR" />
                    <p className="mt-2 text-lg font-medium text-center">
                        Pay monthly
                    </p>
                    <p className="mt-4 text-center text-black">Starting at</p>
                    <div className="flex items-center justify-center text-5xl font-extrabold">
                        <span>5€</span>
                        <span className="flex flex-col ml-3 text-sm font-medium leading-3 text-gray-600">
                            <span>EUR</span>
                            <span>per month</span>
                        </span>
                    </div>
                    <div className="mt-6 text-center text-gray-800">
                        <p>Only Stripe</p>
                    </div>
                    <Link href="/dash#/plan">
                        <a className="mt-8 text-white --btn --btn-4 --btn-neutral">
                            Select server
                        </a>
                    </Link>
                </div>
            </div>
            <div className="my-16 lg:flex">
                <div className="flex-1 p-6 bg-gray-800 rounded-t-lg lg:p-12 lg:rounded-tr-none lg:rounded-l-lg">
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-400">
                        Partner programme
                    </h2>
                    <p>
                        Partner with The Cleaner and gain all benefits from The
                        Cleaner Professional.
                    </p>
                    <div className="flex items-center justify-center my-8">
                        <h3 className="pr-4 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                            Who&apos;s eligible
                        </h3>
                        <div className="flex-grow h-1 rounded-full bg-gray-550" />
                    </div>
                    <ul className="grid gap-4 text-sm md:grid-cols-2">
                        {eligible.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon
                                        className="w-5 h-5 text-green-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="ml-3 text-sm text-gray-200">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-xs font-gray-300">
                        * Verified and partnered servers automatically receive
                        Partner status.
                    </p>
                </div>
                <div className="flex items-center justify-center flex-shrink-0 p-6 bg-gray-100 rounded-b-lg lg:p-12 lg:rounded-bl-none lg:rounded-r-lg lg:w-80">
                    <Link href="/discord">
                        <a className="w-full my-auto --btn --btn-4 --btn-neutral">
                            Apply
                        </a>
                    </Link>
                </div>
            </div>
            <table className="w-full h-px table-fixed">
                <thead>
                    <tr>
                        <th
                            className="px-6 pb-4 text-sm font-medium text-left text-gray-300"
                            scope="col"
                        >
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
                            <span className="hidden sm:inline">
                                Professional
                            </span>
                            <span className="sm:hidden">Pro</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="border-t divide-y border-gray-550 divide-gray-550">
                    {sections.map((section) => (
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
                            {section.features.map((feature) => (
                                <tr key={feature.name}>
                                    <th
                                        className="px-6 py-5 text-sm font-normal text-left text-gray-100"
                                        scope="row"
                                    >
                                        {feature.name}
                                    </th>
                                    {["free", "pro"].map((tier) => (
                                        <td key={tier} className="px-6 py-5">
                                            {typeof feature.tiers[tier] ===
                                            "string" ? (
                                                <span className="block text-sm text-gray-200">
                                                    {feature.tiers[tier]}
                                                </span>
                                            ) : (
                                                <>
                                                    {feature.tiers[tier] ===
                                                    true ? (
                                                        <CheckIcon
                                                            className="w-5 h-5 text-green-500"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <MinusIcon
                                                            className="w-5 h-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    )}

                                                    <span className="sr-only">
                                                        {feature.tiers[tier] ===
                                                        true
                                                            ? "Included"
                                                            : "Not included"}{" "}
                                                        in {tier}
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
                * We will automatically activate a <b>free four week trial</b>{" "}
                if your server has more than 20,000 members.
            </p>
            <div className="pb-8 mt-20 border-t border-gray-550" />
            <Footer />
        </div>
    );
}

function getMembersPricing(count, multiply) {
    let total = [];
    count -= 20; // first 20k are free
    if (count > 0) {
        // limit to 80k higher pricing
        const value = Math.min(count, 80);
        total.push(value * 0.05);
        count -= value;
    }
    if (count > 0) {
        // divided by 10 cuz it's per 10k
        total.push(0.2 * Math.floor(count / 10));
    }
    if (multiply)
        total = total.map((x, idx) =>
            idx === total.length - 1 ? x * 12 : x * 10
        );
    return total.reduce((a, b) => a + b, 0);
}

function roundNumber(number) {
    const value = number.toString().split(".");
    return `${value[0]}.${((value[1] || 0) + "00").substring(0, 2)}`;
}
