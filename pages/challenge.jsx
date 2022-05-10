
import MetaTags from "@/components/metatags.jsx";
import Challenger from "@/components/challenger.jsx";
import { createOAuthRedirect } from "@/lib/api.js";

export default function Verify() {
    return (
        <>
            <MetaTags title="Challenge" />
            <Challenger
                baseUrl="/challenge"
                field="flow"
                createOAuthRedirect={(flow, change) => createOAuthRedirect({ flow, change })}
                singleAccount={true}
            />
        </>
    )
}
