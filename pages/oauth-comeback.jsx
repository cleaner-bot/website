
import { useEffect } from "react";
import { useRouter } from "next/router";

import { postOAuthCallback } from "@/lib/api.js";


export default function OAuthComeback() {
    const router = useRouter();
    useEffect(async () => {
        if(!router.isReady) return;
        const { code, state } = router.query;
        if(!code || !state)
            return router.push("/");
        
        let res;
        try {
            res = await postOAuthCallback(code, state);
        } catch(e) {
            return alert(`${e.response.status}: ${e.response.data.detail}`);
        }

        const { token, redirect } = res.data;
        if(token)
            localStorage.setItem("token", token);
        router.push(redirect);
    }, [router]);
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 -mr-1/2">
            <h1 className="font-mono text-4xl">
                Please wait...
            </h1>
            <p className="mt-2 text-gray-200">
                We are connecting your Discord account...
            </p>
        </div>
    )
}
