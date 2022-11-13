import { useEffect, useState } from "react";

import { HumanPlatformPage } from "@/components/humanplatform.jsx";
import decodeFlow from "@/lib/flow.js";

export default function ExternalVerification() {
    const [payload, setPayload] = useState();
    useEffect(() => {
        const [flow] = window.location.hash.substring(1).split("/");
        const decodedFlow = decodeFlow(flow);
        console.log(flow, decodedFlow);
        if (decodedFlow.isValid && decodedFlow.isChecksumValid)
            setPayload({ type: "v", flow });
        else setPayload({ error: "Link is invalid" });
    }, []);
    return (
        <HumanPlatformPage
            title="Verification"
            payload={payload}
            messages={{
                success: "Verified!",
                login: "Authorize with Discord to verify" /* this is unused */,
            }}
        />
    );
}
