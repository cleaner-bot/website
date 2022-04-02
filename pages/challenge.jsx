
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { getChallenge, createOAuthRedirect, postChallenge } from "@/lib/api.js";
import MetaTags from "@/components/metatags.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { DiscordIconWhite } from "@/components/discord.jsx";


export default function ChallengeWrapper() {
    const router = useRouter();
    const [state, setState] = useState({ stage: 0 });

    useEffect(async () => {
        if(!router.isReady) return;
        const { flow } = router.query;
        if(!flow) return router.push("/");

        let response;
        try {
            response = await getChallenge(flow);
        } catch(e) {
            return setState({ ...state, error: e });
        }
        if(response.data.correct_account && !response.data.captcha) {
            setState({ stage: 3, response });
            try {
                await postChallenge(flow);
            } catch (e) {
                return setState({ ...state, error: e });
            }
            setState({ stage: 4, response });
        } else {
            setState({ stage: response.data.correct_account ? 2 : 1, response });
        }
    }, [router])

    const steps = [
        { id: "Step 1", name: "Loading challenge", status: state.stage > 0 ? "complete" : "current" },
        { id: "Step 2", name: "Discord authentication", status: state.stage > 1 ? "complete" : state.stage === 1 ? "current" : "upcoming" },
        { id: "Step 3", name: "CAPTCHA challenge", status: state.stage > 2 ? (state.response.data.captcha ? "complete" : "skipped") : state.stage === 2 ? "current" : "upcoming" },
        { id: "Step 4", name: "Verifying information", status: state.stage > 3 ? "complete" : state.stage === 3 ? "current" : "upcoming" },
        { id: "Step 5", name: "Done", status: state.stage === 4 ? "current" : "upcoming" },
    ]

    return (
        <div className="h-screen bg-center bg-no-repeat bg-cover" style={{backgroundImage: state?.response?.data?.splash && `url("${state.response.data.splash}")`}}>
            <MetaTags
                title="Challenge"
            />
            <div className="py-20 md:py-40 --container">
                <ol role="list" className={clsx("p-8 mb-20 space-y-4 bg-gray-700 rounded-lg md:flex md:space-y-0 md:space-x-8", state?.response?.data?.splash && "shadow-2xl")}>
                    {steps.map(step => (
                        <li key={step.name} className="md:flex-1">
                            {step.status === "complete" ? (
                                <span className="flex flex-col py-2 pl-4 border-l-4 border-indigo-400 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                                    <span className="text-xs font-semibold tracking-wide text-indigo-400 uppercase">{step.id}</span>
                                    <span className="text-sm font-medium text-gray-300">{step.name}</span>
                                </span>
                            ) : step.status === "current" ? (
                                <span className="flex flex-col py-2 pl-4 border-l-4 border-indigo-500 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-indigo-450">{step.id} (current step)</span>
                                    <span className="text-sm font-medium">{step.name}</span>
                                </span>
                            ) : (
                                <span className="flex flex-col py-2 pl-4 border-l-4 border-gray-200 group hover:border-gray-400 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
                                    <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase group-hover:text-gray-500">{step.id}</span>
                                    <span className="text-sm font-medium">{step.name}</span>
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
                <div className={clsx("p-8 mx-auto bg-gray-700 rounded-lg w-fit", state.response?.data?.splash && "shadow-2xl")}>
                    {state.stage === 0 && <>
                        <h1 className="text-4xl font-bold text-center">
                            {state.error ? "Aw snap" : "Loading challenge data"}
                        </h1>
                        {state.error ? <ErrorHandler error={state.error} /> : <p className="mt-6 text-center text-gray-200">
                            This step is fully automatic, you just have to wait a bit...
                        </p>}
                    </>}
                    {state.stage === 1 && <>
                        <h1 className="text-4xl font-bold text-center">
                            Discord authentication
                        </h1>
                        {state.response.data.logged_in && <p className="mt-6 text-center text-red-400">
                            You are currently logged into the wrong account.
                        </p>}
                        <p className="mt-6 text-center text-gray-200">
                            Please authorize our application to confirm you are not a robot.
                        </p>
                        <button className="w-full mt-12 --btn --btn-4 --btn-primary" onClick={() => {
                            const url = createOAuthRedirect({ flow: router.query.flow });
                            router.push(url);
                        }}>
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            Authorize with Discord
                        </button>
                    </>}
                    {state.stage === 2 && <>
                        <h1 className="text-4xl font-bold text-center">
                            CAPTCHA challenge
                        </h1>
                        <p className="mt-6 text-center text-gray-200">
                            A CAPTCHA is required to gain access to this Discord server.
                        </p>
                        <div className="w-[303px] h-[78px] mx-auto mt-6 bg-gray-600 rounded">
                            <HCaptcha
                                sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                                theme="dark"
                                reCaptchaCompat={false}
                                onVerify={async token => {
                                    const { flow } = router.query;
                                    setState({ ...state, stage: 3 });
                                    try {
                                        await postChallenge(flow, token);
                                    } catch (e) {
                                        return setState({ ...state, error: e });
                                    }
                                    setState({ ...state, stage: 4 });
                                }}
                            />
                        </div>
                    </>}
                    {state.stage === 3 && <>
                        <h1 className="text-4xl font-bold text-center">
                            Verifying information
                        </h1>
                        <p className="mt-6 text-center text-gray-200">
                            This step is fully automatic, you just have to wait a bit...
                        </p>
                    </>}
                    {state.stage === 4 && <>
                        <h1 className="text-4xl font-bold text-center">
                            Done
                        </h1>
                        <p className="mt-6 text-center text-gray-200">
                            You should gain access in the Discord server any second now.
                        </p>
                        <p className="text-center text-gray-200">
                            You can close this tab now.
                        </p>
                    </>}
                </div>
            </div>
        </div>
    )
}
