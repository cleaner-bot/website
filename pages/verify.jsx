
import MetaTags from "@/components/metatags.jsx";
import Challenger from "@/components/challenger.jsx";
import { createOAuthRedirect } from "@/lib/api.js";

export default function Verify() {
    return (
        <>
            <MetaTags title="Verification" />
            <Challenger
                baseUrl="/verification"
                field="guild"
                createOAuthRedirect={(guild, change) => createOAuthRedirect({ verification: true, guild, change || false })}
            />
        </>
    )
}
