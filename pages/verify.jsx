import { useEffect, useState } from "react";

import { HumanPlatformPage } from "@/components/humanplatform.jsx";
import { createOAuthRedirect } from "@/lib/api.js";
import { bytesToU64 } from "@/lib/u64.js";
import { b64decode } from "@/lib/base64.js";

export default function SuperVerification() {
    const [payload, setPayload] = useState();
    useEffect(() => {
        const url = new URL(document.documentURI);
        const base = url.username ?? location.hash.substring(1);

        let [guildId, fallback] = base.split("/");
        if (!guildId && fallback) guildId = fallback;

        if (/^\d{17,22}$/.test(guildId)) setPayload({ t: "sv", g: guildId });
        else if (/^[a-zA-Z0-9+/]{10,12}$/.test(guildId))
            setPayload({
                t: "sv",
                g: bytesToU64(b64decode(guildId)).toString(),
            });
        else setPayload({ error: "Invalid link" });
    }, []);
    return (
        <HumanPlatformPage
            title="Verification"
            userLogin={(options) =>
                createOAuthRedirect({
                    destination: `/verify${document.location.hash}`,
                    ...options,
                })
            }
            payload={payload}
            messages={{
                success: "Verified! You can return to Discord now.",
                login: "Authorize with Discord to verify",
            }}
        />
    );
}
