import { useRouter } from "next/router";

import MetaTags from "@/components/metatags.jsx";
import { doChange, getStripePortalURL } from "@/lib/api.js";

export default function Index() {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center h-screen mx-4">
            <MetaTags title="Payment successful | Stripe" />
            <div className="px-8 py-4 border border-green-500 rounded-lg bg-green-400/10">
                <button
                    className="--btn --btn-3 --btn-neutral"
                    onClick={async () => {
                        const response = await doChange(getStripePortalURL(), {
                            loading: "Preparing portal...",
                            success: "Redirecting...",
                            error: "Portal failed: ",
                        });
                        if (!response) return;
                        router.push(response.data);
                    }}
                >
                    Access billing portal
                </button>
            </div>
        </div>
    );
}
