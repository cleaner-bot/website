import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ErrorHandler from "@/components/dash/error.jsx";
import MetaTags from "@/components/metatags.jsx";
import { postOAuthCallback } from "@/lib/api.js";

export default function OAuthComeback() {
    const [error, setError] = useState();
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const { code, state } = router.query;
        if (!code || !state) {
            router.push("/");
            return;
        }

        (async () => {
            let res;
            try {
                res = await postOAuthCallback(code, state);
            } catch (e) {
                return setError(e);
            }

            const { token, redirect } = res.data;
            if (token) localStorage.setItem("token", token);
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
