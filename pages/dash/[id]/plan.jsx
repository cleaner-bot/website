
import Link from "next/link";
import { useRouter } from "next/router";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";

import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, BlockWithPanel } from "@/components/dash/block.jsx";
import { Unlocked } from "@/components/dash/ui.jsx";
import { getStripeCheckoutURL, doChange, getStripePortalURL } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Plan | The Cleaner Dashboard"
            />
            <Page page="plan" {...data}>
                <Plan {...data} />
            </Page>
        </>
    )
}

const plans = [
    { name: "Monthly", cycle: "/mo", price: 4, stripe: true },
    { name: "Yearly", cycle: "/yr", price: 30, stripe: true, crypto: true }
]


function Plan({ entitlements, guildId }) {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState(1);
    return (
        <>
            <Header name="Plan" />
            <Section>
                <PlainBlock
                    name="Professional"
                    description="Subscribe to The Cleaner Professional."
                >
                    {entitlements.plan === 0 && !entitlements.partnered && <>
                        <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                            <div className="grid-cols-2 space-y-4 lg:grid lg:space-y-0 lg:space-x-4">
                                {plans.map((plan, planIndex) => (
                                    <RadioGroup.Option
                                        key={plan.name}
                                        value={planIndex}
                                        className={({ checked, active }) => clsx(
                                            checked ? "border-transparent" : "border-gray-300",
                                            active ? "ring-2 ring-indigo-500" : "",
                                            "relative block border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
                                        )}
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label as="p" className="font-medium">
                                                            {plan.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description as="div" className="text-gray-300">
                                                            <p className="inline-flex space-x-1">
                                                                <span>Pay with:</span>
                                                                {plan.stripe && <span className="hover:underline">Stripe</span>}
                                                                {plan.crypto && <span className="hover:underline">Crypto</span>}
                                                            </p>{" "}
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                <RadioGroup.Description as="div" className="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-center">
                                                    <div className="font-medium text-gray-200">{plan.price}€</div>
                                                    <div className="ml-1 text-gray-400 sm:ml-0">{plan.cycle}</div>
                                                </RadioGroup.Description>
                                                <div
                                                    className={clsx(
                                                        active ? "border" : "border-2",
                                                        checked ? "border-indigo-500" : "border-transparent",
                                                        "absolute -inset-px rounded-lg pointer-events-none"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <p className="mt-4">
                            Checkout now
                        </p>
                        <div className="flex gap-4 mb-8">
                            {plans[selectedPlan].stripe && (
                                <button
                                    className="w-32 --btn --btn-2 --btn-primary"
                                    onClick={async () => {
                                        const response = await doChange(getStripeCheckoutURL({ guild_id: guildId, yearly: selectedPlan === 1 }), {
                                            loading: "Preparing checkout...",
                                            success: "Redirecting...",
                                            error: "Checkout failed: "
                                        });
                                        if(!response) return;
                                        router.push(response.data);
                                    }}
                                >
                                    Stripe
                                </button>
                            )}
                            {plans[selectedPlan].crypto && (
                                <button
                                    className="w-32 --btn --btn-2 --btn-primary"
                                >
                                    Crypto
                                </button>
                            )}
                        </div>
                    </>}
                    {entitlements.plan === 1 && !entitlements.partnered && <>
                        <button
                            className="mb-8 --btn --btn-3 --btn-primary"
                            onClick={async () => {
                                const response = await doChange(getStripePortalURL({ guild_id: guildId }), {
                                    loading: "Preparing portal...",
                                    success: "Redirecting...",
                                    error: "Portal failed: "
                                });
                                if(!response) return;
                                router.push(response.data);
                            }}
                        >
                            Manage subscription
                        </button>
                    </>}
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more feature information.
                        </a>
                    </Link>
                </PlainBlock>
                <BlockWithPanel
                    name="Partner programme"
                    description="Apply for the partner programme."
                    panel={entitlements.partnered ? (
                        <Unlocked />
                    ) : (
                        <Link href="/discord">
                            <a className="--btn --btn-3 --btn-primary">
                                Apply
                            </a>
                        </Link>
                    )}
                >
                    <Link href="/pricing">
                        <a className="hover:underline">
                            Click here for more information.
                        </a>
                    </Link>
                </BlockWithPanel>
            </Section>
        </>
    )
}
