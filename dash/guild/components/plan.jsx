import Link from "next/link";
import { useRouter } from "next/router";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";

import { Section } from "@/components/dash/dash.jsx";
import { PlainBlock, BlockWithPanel } from "@/components/dash/block.jsx";
import { Unlocked } from "@/components/dash/ui.jsx";
import {
    doChange,
    getStripeCheckoutURL,
    getStripePortalURL,
    getCoinbaseChargeURL,
} from "@/lib/api.js";

const plans = [
    { name: "Monthly", cycle: "/mo", price: 4, stripe: true },
    { name: "Yearly", cycle: "/yr", price: 30, stripe: true, coinbase: true },
];

export default function PlanComponent({ entitlements, route }) {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState(1);
    return (
        <>
            <Section>
                <PlainBlock
                    name="Professional"
                    description="Subscribe to The Cleaner Professional."
                >
                    {entitlements.plan === 0 && !entitlements.partnered && (
                        <>
                            <RadioGroup
                                value={selectedPlan}
                                onChange={setSelectedPlan}
                            >
                                <div className="grid-cols-2 space-y-4 lg:grid lg:space-y-0 lg:space-x-4">
                                    {plans.map((plan, planIndex) => (
                                        <RadioGroup.Option
                                            key={plan.name}
                                            value={planIndex}
                                            className={({ checked, active }) =>
                                                clsx(
                                                    checked
                                                        ? "border-transparent"
                                                        : "border-gray-300",
                                                    active
                                                        ? "ring-2 ring-indigo-500"
                                                        : "",
                                                    "relative block border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
                                                )
                                            }
                                        >
                                            {({ active, checked }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <div className="text-sm">
                                                            <RadioGroup.Label
                                                                as="p"
                                                                className="font-medium"
                                                            >
                                                                {plan.name}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="div"
                                                                className="text-gray-300"
                                                            >
                                                                <p className="inline-flex space-x-1">
                                                                    <span>
                                                                        Pay
                                                                        with:
                                                                    </span>
                                                                    {plan.stripe && (
                                                                        <span className="hover:underline">
                                                                            Stripe
                                                                        </span>
                                                                    )}
                                                                    {plan.coinbase && (
                                                                        <span className="hover:underline">
                                                                            Coinbase
                                                                        </span>
                                                                    )}
                                                                </p>{" "}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    <RadioGroup.Description
                                                        as="div"
                                                        className="flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-center"
                                                    >
                                                        <div className="font-medium text-gray-200">
                                                            {plan.price}€
                                                        </div>
                                                        <div className="ml-1 text-gray-400 sm:ml-0">
                                                            {plan.cycle}
                                                        </div>
                                                    </RadioGroup.Description>
                                                    <div
                                                        className={clsx(
                                                            active
                                                                ? "border"
                                                                : "border-2",
                                                            checked
                                                                ? "border-indigo-500"
                                                                : "border-transparent",
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
                            <p className="mt-4">Checkout now</p>
                            <div className="flex gap-4 mb-8">
                                {plans[selectedPlan].stripe && (
                                    <button
                                        className="w-32 --btn --btn-2 --btn-primary"
                                        onClick={async () => {
                                            const response = await doChange(
                                                getStripeCheckoutURL({
                                                    guild_id: route.guildId,
                                                    yearly: selectedPlan === 1,
                                                }),
                                                {
                                                    loading:
                                                        "Preparing checkout...",
                                                    success: "Redirecting...",
                                                    error: "Checkout failed: ",
                                                }
                                            );
                                            if (!response) return;
                                            router.push(response.data);
                                        }}
                                    >
                                        Stripe
                                    </button>
                                )}
                                {plans[selectedPlan].coinbase && (
                                    <button
                                        className="w-32 --btn --btn-2 --btn-primary"
                                        onClick={async () => {
                                            const response = await doChange(
                                                getCoinbaseChargeURL({
                                                    guild_id: route.guildId,
                                                }),
                                                {
                                                    loading:
                                                        "Preparing checkout...",
                                                    success: "Redirecting...",
                                                    error: "Checkout failed: ",
                                                }
                                            );
                                            if (!response) return;
                                            router.push(response.data);
                                        }}
                                    >
                                        Coinbase
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    {entitlements.plan === 1 && !entitlements.partnered && (
                        <>
                            <button
                                className="mb-8 --btn --btn-3 --btn-primary"
                                onClick={async () => {
                                    const response = await doChange(
                                        getStripePortalURL({
                                            guild_id: route.guildId,
                                        }),
                                        {
                                            loading: "Preparing portal...",
                                            success: "Redirecting...",
                                            error: "Portal failed: ",
                                        }
                                    );
                                    if (!response) return;
                                    router.push(response.data);
                                }}
                            >
                                Manage subscription
                            </button>
                        </>
                    )}
                    <Link href="/pricing" className="hover:underline">
                        Click here for more feature information.
                    </Link>
                </PlainBlock>
                <BlockWithPanel
                    name="Partner programme"
                    description="Apply for the partner programme."
                    panel={
                        entitlements.partnered ? (
                            <Unlocked />
                        ) : (
                            <Link href="/discord" className="--btn --btn-3 --btn-primary">
                                Apply
                            </Link>
                        )
                    }
                >
                    <Link href="/pricing" className="hover:underline">
                        Click here for more information.
                    </Link>
                </BlockWithPanel>
            </Section>
        </>
    );
}
