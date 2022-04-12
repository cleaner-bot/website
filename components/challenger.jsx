
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import { DiscordIconWhite } from "@/components/discord.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { AXIOS } from "@/lib/api.js";


export default function Challenger({ baseUrl, field, createOAuthRedirect, singleAccount }) {
    const router = useRouter();
    const [state, setState] = useState({ stage: 0 });

    useEffect(async () => {
        if(!router.isReady) return;
        const value = router.query[field];
        if(!value) return router.push("/");

        let response;
        try {
            response = await AXIOS.get(baseUrl, { params: { [field]: value } });
        } catch(e) {
            if(e.response && e.response.status === 401) {
                return setState({ stage: 1 })
            }
            return setState({ ...state, error: e });
        }
        setState({ stage: response.data.is_valid ? 2 : 6, ...response.data });
    }, [router]);

    const overlayStyle = state.splash ? "p-8 bg-gray-700 rounded-lg shadow-xl" : "";

    return (
        <div className="h-screen bg-no-repeat bf-cover" style={{backgroundImage: state.splash && `url("${state.splash}")`}}>
            <div className="flex flex-col items-center justify-center h-full --container">
                {state.stage === 0 && <div className={overlayStyle}>
                    {state.error ? <ErrorHandler error={state.error} /> : <h1 className="text-4xl font-extrabold">
                        Loading...
                    </h1>}
                </div>}
                {state.stage === 1 && <div className={overlayStyle}>
                    <h1 className="text-4xl font-extrabold text-center">
                        Discord authentication
                    </h1>
                    <button className="w-full mt-12 --btn --btn-4 --btn-primary" onClick={() => {
                        const url = createOAuthRedirect(router.query[field]);
                        router.push(url);
                    }}>
                        <DiscordIconWhite className="w-6 h-6 mr-4" />
                        Authorize with Discord
                    </button>
                </div>}
                {state.stage === 2 && <div className={overlayStyle}>
                    <h1 className="text-4xl font-extrabold text-center">
                        Discord account
                    </h1>
                    <p className="mt-6 text-center text-gray-200">
                        Logged in as <span className="text-blue-300">{state.user.name}#{state.user.discriminator}</span>.
                    </p>
                    <div className="grid gap-4 mt-12">
                        <button className="--btn --btn-primary --btn-3" onClick={async () => {
                            if(state.captcha_required)
                                return setState({ ...state, stage: 3 });
                            setState({ ...state, stage: 4 });
                            try {
                                await AXIOS.post(baseUrl, {}, { params: { [field]: router.query[field] } });
                            } catch (e) {
                                return setState({ ...state, stage: 4, error: e });
                            }
                            setState({ ...state, stage: 5 });
                        }}>
                            Continue
                        </button>
                        {!singleAccount && (
                            <button className="--btn --btn-neutral --btn-3" onClick={() => {
                                const url = createOAuthRedirect(router.query[field]);
                                router.push(url);
                            }}>
                                <DiscordIconWhite className="w-6 h-6 mr-4" />
                                Change account
                            </button>
                        )}
                    </div>
                </div>}
                {state.stage === 3 && (
                    <div className="w-[303px] h-[78px] mx-auto mt-6 bg-gray-600 rounded">
                        <HCaptcha
                            sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                            theme="dark"
                            reCaptchaCompat={false}
                            onVerify={async token => {
                                setState({ ...state, stage: 4 });
                                try {
                                    await AXIOS.post(baseUrl, { token }, { params: { [field]: router.query[field] } });
                                } catch (e) {
                                    return setState({ ...state, stage: 4, error: e });
                                }
                                setState({ ...state, stage: 5 });
                            }}
                        />
                    </div>
                )}
                {state.stage === 4 && <div className={overlayStyle}>
                    {state.error ? <ErrorHandler error={state.error} /> : <h1 className="text-4xl font-extrabold">
                        Submitting...
                    </h1>}
                </div>}
                {state.stage === 5 && <div className={overlayStyle}>
                    <h1 className="text-4xl font-extrabold text-center">
                        Verified!
                    </h1>
                    <p className="mt-6 text-center">
                        You can now close this tab and return to Discord.
                    </p>
                </div>}
                {state.stage === 6 && <div className={overlayStyle}>
                    <h1 className="text-4xl font-extrabold text-center">
                        {singleAccount ? "Wrong account?" : "No verification required"}
                    </h1>
                    <p className="mt-6 text-center text-gray-200">
                        Are you <span className="text-blue-300">{state.user.name}#{state.user.discriminator}</span>?
                    </p>
                    <p className="text-center text-gray-200">
                        If not, change your account below.
                    </p>
                    <button className="w-full mt-12 --btn --btn-neutral --btn-3" onClick={() => {
                        const url = createOAuthRedirect(router.query[field]);
                        router.push(url);
                    }}>
                        <DiscordIconWhite className="w-6 h-6 mr-4" />
                        Change account
                    </button>
                </div>}
            </div>
        </div>
    )
}
