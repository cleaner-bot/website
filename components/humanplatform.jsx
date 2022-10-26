import HCaptcha from "@hcaptcha/react-hcaptcha";
import Turnstile from "react-turnstile";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import { DiscordIconWhite } from "@/components/discord.jsx";
import Traps from "@/components/traps.jsx";
import { getUser, postHumanChallenge } from "@/lib/api.js";
import secretRecipe from "@/lib/svm.js";

export function HumanPlatformPage({ title, payload, messages, userLogin }) {
    const router = useRouter();
    const [state, setState] = useReducer(
        (state, update) => ({ ...state, ...update }),
        {}
    );

    const postChallenge = async (chldata) => {
        let res;
        try {
            res = await postHumanChallenge({ payload, chldata });
        } catch (error) {
            // payment required? no. captcha required
            if (error.response?.status === 401) {
                setState({ stage: 1, data: error.response.data });
            } else if (error.response?.status === 403) {
                setState({ stage: 2, data: error.response.data });
            } else {
                setState({ error });
            }
            return;
        }
        setState({ stage: 4, data: res.data });
    };

    useEffect(() => {
        if (!payload) return;
        if (payload.error) return setState({ error: payload.error });
        postChallenge();
    }, [payload]);

    useEffect(() => {
        if (!userLogin) return;
        getUser().then((res) => setState({ user: res.data }));
    }, [userLogin]);

    return (
        <div className="flex flex-col items-center justify-center h-screen --container">
            <Traps />
            <Head>
                <title>{title}</title>
            </Head>
            <h1 className="mb-6 text-4xl font-extrabold text-center">
                {title}
            </h1>
            {userLogin && (
                <div className="mb-6 text-center">
                    <p>
                        Logged in as{" "}
                        <span className="text-blue-300">
                            {state.stage === 0
                                ? "loading"
                                : state.user
                                ? `${state.user.name}#${state.user.discriminator}`
                                : "nobody"}
                        </span>
                    </p>
                    <button
                        className={clsx(
                            "font-bold",
                            state.user ? "text-red-400" : "text-gray-400"
                        )}
                        disabled={!state.user}
                        onClick={() => {
                            const url = userLogin({ allowChange: true });
                            router.push(url);
                        }}
                    >
                        Not you? Logout
                    </button>
                </div>
            )}
            {!state.error && state.stage === 2 ? (
                <ActualCaptcha
                    data={state.data}
                    onVerify={(token) => {
                        setState({ ...state, stage: 3 });
                        const body = secretRecipe()(token, state.data);
                        postChallenge(body);
                    }}
                    onError={(error) => setState({ ...state, error })}
                />
            ) : (
                <div className="w-[303px] h-[78px] rounded relative mx-auto bg-gray-600 flex-none">
                    {state.error ? (
                        <ErrorHandler error={state.error} />
                    ) : state.stage === 1 ? (
                        <button
                            className="flex-col w-full h-full gap-2 --btn --btn-primary"
                            onClick={() => {
                                const url = userLogin({});
                                router.push(url);
                            }}
                        >
                            <DiscordIconWhite className="w-6 h-6" />
                            {messages.join}
                        </button>
                    ) : state.stage === 3 ? (
                        <CaptchaInfoText className="text-green-300">
                            Verifying...
                        </CaptchaInfoText>
                    ) : state.stage === 4 ? (
                        <CaptchaInfoText className="text-green-300">
                            {messages.success}
                        </CaptchaInfoText>
                    ) : state.stage === 100 ? (
                        <CaptchaInfoText className="text-green-300">
                            <span>Already verified.</span>
                            Maybe wrong account?
                        </CaptchaInfoText>
                    ) : (
                        <Skeleton className="w-full h-full rounded" />
                    )}
                </div>
            )}
            <div className="mt-12">
                <p className="text-center">
                    By verifying you agree to our{" "}
                    <Link
                        href="/legal/terms"
                        className="font-bold text-gray-300 hover:underline whitespace-nowrap"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/legal/privacy"
                        className="font-bold text-gray-300 hover:underline whitespace-nowrap"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
                <p className="text-center">
                    Protection provided by{" "}
                    <Link
                        href="/"
                        className="font-bold text-gray-300 hover:underline whitespace-nowrap"
                    >
                        The Cleaner
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

function ErrorHandler({ error }) {
    if (typeof error === "string") return <ShowError message={error} />;
    const { response } = error;
    if (!response || response.status === 0)
        return <ShowError message={error.message} />;
    if (response.status === 404)
        return <CaptchaInfoText>{response.data}</CaptchaInfoText>;
    if (typeof response.data === "string")
        return <ShowError message={response.data} />;
    if (typeof response.data?.message === "string")
        return <ShowError message={response.data.message} />;
    return <ShowError message={`Status ${response.status}`} />;
}

function ShowError({ message }) {
    return (
        <CaptchaInfoText className="text-red-350">{message}</CaptchaInfoText>
    );
}

function ActualCaptcha({ data, onVerify, onError }) {
    if (data.type === "hcaptcha")
        return (
            <HCaptcha
                sitekey={data.sitekey}
                theme="dark"
                reCaptchaCompat={false}
                onVerify={onVerify}
                onError={onError}
                className="w-[303px] h-[78px] bg-gray-600 rounded"
            />
        );
    else if (data.type === "turnstile")
        return (
            <Turnstile
                sitekey={data.sitekey}
                theme="dark"
                action={data.action}
                cData={data.cdata}
                onVerify={onVerify}
                onError={onError}
                className="w-[300px] h-[65px] bg-gray-600 rounded"
            />
        );
}

function CaptchaInfoText({ children, className }) {
    return (
        <p
            className={clsx(
                "flex flex-col items-center justify-center w-full h-full text-xl font-medium text-center px-4",
                className
            )}
        >
            {children}
        </p>
    );
}
