
import Challenger from "@/components/challenger.jsx";
import { createOAuthRedirect } from "@/lib/api.js";

export default function Verify() {
    return (
        <Challenger
            baseUrl="/challenge"
            field="flow"
            createOAuthRedirect={flow => createOAuthRedirect({ flow })}
            singleAccount={true}
        />
    )
}
