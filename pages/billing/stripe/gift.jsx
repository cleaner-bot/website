import { useRouter } from "next/router";

import MetaTags from "@/components/metatags.jsx";
import { doChange, getStripeCheckoutURL } from "@/lib/api.js"

export default function Success() {
    const router = useRouter();
    const { guild } = router.query;
    return (
        <div className="flex items-center justify-center h-screen mx-4">
            <MetaTags title="Gift subscription | Stripe" />
            <div className="px-8 py-4 border border-green-500 rounded-lg bg-green-400/10">
                <p className="mb-4 text-2xl font-bold text-center">
                    Gift subscription
                </p>
                <button
                    className="w-full --btn --btn-3 --btn-neutral"
                    onClick={async () => {
                        const response = await doChange(getStripeCheckoutURL({ guild_id: guild, yearly: false }), {
                            loading: "Preparing checkout...",
                            success: "Redirecting...",
                            error: "Checkout failed: "
                        });
                        if(!response) return;
                        router.push(response.data);
                    }}
                    disabled={!guild}
                >
                    6€/mo
                </button>
                <button
                    className="w-full mt-2 --btn --btn-3 --btn-neutral"
                    onClick={async () => {
                        const response = await doChange(getStripeCheckoutURL({ guild_id: guild, yearly: true }), {
                            loading: "Preparing checkout...",
                            success: "Redirecting...",
                            error: "Checkout failed: "
                        });
                        if(!response) return;
                        router.push(response.data);
                    }}
                    disabled={!guild}
                >
                    40€/yr
                </button>
            </div>
        </div>
    )
}
