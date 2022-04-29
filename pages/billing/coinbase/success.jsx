import { useRouter } from "next/router";

import { InternalLink } from "@/components/buttons.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function Cancelled() {
    const router = useRouter();
    const { guild } = router.query;
    return (
        <div className="flex items-center justify-center h-screen mx-4">
            <MetaTags title="Payment successful | Stripe" />
            <div className="px-8 py-4 border border-green-500 rounded-lg bg-green-400/10">
                <p className="mb-4 text-2xl font-bold text-center">
                    Payment successful
                </p>
                <InternalLink href={guild ? `/dash/${guild}/plan` : "/dash/"}>
                    Dashboard
                </InternalLink>
            </div>
        </div>
    )
}
