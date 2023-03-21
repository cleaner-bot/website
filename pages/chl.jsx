import { useEffect, useState } from "react";

import { HumanPlatformPage } from "@/components/humanplatform.jsx";
import decodeFlow from "@/lib/flow.js";

export default function ExternalVerification() {
    const [payload, setPayload] = useState();
    useEffect(() => {
        const url = new URL(document.documentURI);
        const base = url.username ?? location.hash.substring(1);

        let [flow] = base.split("/");
        const decodedFlow = decodeFlow(flow);
        if (decodedFlow.isValid && decodedFlow.isChecksumValid)
            setPayload({ t: "v", f: flow });
        else setPayload({ error: "Link is invalid" });
    }, []);
    return (
        <HumanPlatformPage
            title="Verification"
            payload={payload}
            messages={{
                success: "Verified! You can return to Discord now.",
                login: "Authorize with Discord to verify" /* this is unused */,
            }}
        />
    );
}
