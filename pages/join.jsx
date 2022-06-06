import MetaTags from "@/components/metatags.jsx";
import Challenger from "@/components/challenger.jsx";
import { createOAuthRedirect } from "@/lib/api.js";

export default function Verify() {
    return (
        <>
            <MetaTags title="Join Guard" />
            <Challenger
                baseUrl="/joinguard"
                field="guild"
                createOAuthRedirect={(guild, change) =>
                    createOAuthRedirect({
                        joinguard: true,
                        guild,
                        change: change || false,
                    })
                }
                service="joinguard"
            />
        </>
    );
}
