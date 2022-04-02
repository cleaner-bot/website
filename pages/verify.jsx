
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import { DiscordIconWhite } from "@/components/discord.jsx";
import { postVerification, createOAuthRedirect } from "@/lib/api.js";
import ErrorHandler from "@/components/dash/error.jsx";

export default function Verify() {
    const router = useRouter();
    const [state, setState] = useState({ stage: 0 });
    useEffect(async () => {
        if(!router.isReady) return;
        const { guild } = router.query;
        if(!guild) return router.push("/");

        let response;
        try {
            response = await postVerification(guild);
        } catch(e) {
            if(e.response && e.response.status === 401) {
                return setState({ stage: 1 });
            } else if(e.response && e.response.status === 403) {
                return setState({ stage: 2 });
            }
            return setState({ ...state, error: e });
        }
        setState({ stage: 4 });
    }, [router]);
    return (
        <div className="flex flex-col items-center justify-center h-screen --container">
            {state.stage === 0 && <>
                {state.error ? <ErrorHandler error={state.error} /> : <h1 className="text-6xl font-extrabold md:text-8xl">
                    Loading...
                </h1>}
            </>}
            {state.stage === 1 && <div>
                <h1 className="text-4xl font-extrabold text-center">
                    Discord authentication
                </h1>
                <button className="w-full mt-12 --btn --btn-4 --btn-primary" onClick={() => {
                    const { guild } = router.query;
                    const url = createOAuthRedirect({ verification: true, guild });
                    router.push(url);
                }}>
                    <DiscordIconWhite className="w-6 h-6 mr-4" />
                    Authorize with Discord
                </button>
            </div>}
            {state.stage === 2 && (
                <div className="w-[303px] h-[78px] mx-auto mt-6 bg-gray-600 rounded">
                    <HCaptcha
                        sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                        theme="dark"
                        reCaptchaCompat={false}
                        onVerify={async token => {
                            const { guild } = router.query;
                            setState({ ...state, stage: 3 });
                            try {
                                await postVerification(guild, token);
                            } catch (e) {
                                return setState({ ...state, error: e });
                            }
                            setState({ ...state, stage: 4 });
                        }}
                    />
                </div>
            )}
            {state.stage === 30 && <>
                {state.error ? <ErrorHandler error={state.error} /> : <h1 className="text-6xl font-extrabold md:text-8xl">
                    Submitting...
                </h1>}
            </>}
            {state.stage === 4 && <>
                <h1 className="text-6xl font-extrabold text-center md:text-8xl">
                    Verified!
                </h1>
                <p className="mt-6 text-center">
                    You can now close this tab and return to Discord.
                </p>
            </>}
        </div>
    )
}
