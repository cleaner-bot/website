import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ErrorHandler from "@/components/dash/error.jsx";
import MetaTags from "@/components/metatags.jsx";
import { postOAuth2Finalize } from "@/lib/api.js";

export default function OAuthComeback() {
    const [error, setError] = useState();
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const { code, state } = router.query;
        let redirect = state || `/dash`;
        if (redirect.includes("://")) redirect = "/dash";
        if (!code) {
            router.push(redirect);
            return;
        }

        const redirect_uri = new URL(window.location);
        redirect_uri.search = "";
        redirect_uri.hash = "";

        (async () => {
            let res;
            try {
                res = await postOAuth2Finalize(
                    code,
                    state || "",
                    redirect_uri.toString()
                );
            } catch (e) {
                return setError(e);
            }

            const { token, guild_id } = res.data;
            if (token) localStorage.setItem("token", token);
            if (guild_id && redirect.startsWith("/dash"))
                redirect = redirect.includes("#")
                    ? redirect.replaceAll("#/", `#${guild_id}/`)
                    : `/dash#${guild_id}`;
            router.push(redirect);
        })();
    }, [router]);
    return (
        <div className="--container">
            <MetaTags title="OAuth comeback" />
            <h1 className="mt-20 mb-10 text-4xl font-bold text-center">
                {error ? "Aw snap" : "Logging in..."}
            </h1>
            {error ? (
                <ErrorHandler error={error} />
            ) : (
                <p className="mb-12 text-center">
                    Give us a bit... we&apos;re logging you in...
                </p>
            )}
        </div>
    );
}
