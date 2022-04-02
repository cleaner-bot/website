
import Challenger from "@/components/challenger.jsx";
import { createOAuthRedirect } from "@/lib/api.js";

export default function Verify() {
    return (
        <Challenger
            baseUrl="/verification"
            field="guild"
            createOAuthRedirect={guild => createOAuthRedirect({ verification: true, guild })}
        />
    )
}
