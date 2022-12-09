import HCaptcha from "@hcaptcha/react-hcaptcha";
import Turnstile from "react-turnstile";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { Discord, Check, X } from "react-bootstrap-icons";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import Traps from "@/components/traps.jsx";
import ProofOfWork from "@/components/chl/pow.jsx";
import { getUser, postHumanChallenge } from "@/lib/api.js";
import callTrustZone from "@/lib/tz.js";

export function HumanPlatformPage({ title, payload, messages, userLogin }) {
    const router = useRouter();
    const [state, setState] = useReducer(
        (state, update) => ({ ...state, ...update }),
        {}
    );

    const postChallenge = async (data) => {
        let res;
        try {
            res = await postHumanChallenge(data);
        } catch (error) {
            if (error.response?.status === 401) {
                setState({ stage: 1, data: error.response.data });
            } else if (
                error.response?.status === 403 &&
                typeof error.response.data !== "string"
            ) {
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
        callTrustZone([29, payload]).then(postChallenge);
    }, [payload]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!userLogin) return;
        getUser().then((res) => setState({ user: res.data }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className="w-[303px] h-[78px] relative mx-auto flex-none">
                {state.error ? (
                    <div className="w-full h-full bg-red-400 rounded">
                        <X className="w-20 h-20 mx-auto" />
                    </div>
                ) : state.stage === 1 ? (
                    <button
                        className="flex-col w-full h-full gap-2 --btn --btn-primary"
                        onClick={() => {
                            const url = userLogin({});
                            router.push(url);
                        }}
                    >
                        <Discord className="w-6 h-6" />
                    </button>
                ) : state.stage === 2 ? (
                    <ActualCaptcha
                        captcha={state.data.c}
                        onVerify={(token) => {
                            setState({ ...state, stage: 3 });
                            callTrustZone([40, payload, state.data, token]).then(postChallenge);
                        }}
                        onError={(error) => setState({ ...state, error })}
                    />
                ) : state.stage === 4 ? (
                    <div className="w-full h-full bg-green-500 rounded">
                        <Check className="w-20 h-20 mx-auto" />
                    </div>
                ) : (
                    <Skeleton className="w-full h-full rounded" />
                )}
            </div>
            <p className="mt-6 text-xl font-medium text-center">
                {state.error ? (
                    <ErrorHandler error={state.error} />
                ) : state.stage === 1 ? (
                    messages.login
                ) : state.stage === 2 ? (
                    state.data.d.i === 0 ? (
                        "Click the button to start the verification."
                    ) : state.data.d.i === 1 ? (
                        "Please solve the CAPTCHA above."
                    ) : state.data.d.i === 2 ? (
                        "Please solve this CAPTCHA too."
                    ) : (
                        `Please solve this CAPTCHA too (x${
                            state.data.d.i - 1
                        }).`
                    )
                ) : state.stage === 3 ? (
                    "Verifying... please wait"
                ) : state.stage === 4 ? (
                    messages.success
                ) : (
                    "Loading..."
                )}
            </p>
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
    return (
        <span
            className={clsx(error?.response?.status !== 404 && "text-red-300")}
        >
            {typeof error === "string"
                ? error
                : !error.response || error.response.status === 0
                ? error.message
                : typeof error.response.data === "string"
                ? error.response.data
                : typeof error.response.data?.message === "string"
                ? error.response.data.message
                : `Status ${error.response.status}`}
        </span>
    );
}

function ActualCaptcha({ captcha, onVerify, onError }) {
    switch (captcha.p) {
        case "hcaptcha":
            return (
                <div className="w-full h-full bg-gray-600 rounded">
                    <HCaptcha
                        sitekey={captcha.sk}
                        theme="dark"
                        reCaptchaCompat={false}
                        onVerify={onVerify}
                        onError={onError}
                    />
                </div>
            );
        case "turnstile":
            return (
                <Turnstile
                    sitekey={captcha.sk}
                    theme="dark"
                    action={captcha.a}
                    cData={captcha.c}
                    onVerify={onVerify}
                    onError={onError}
                    className="w-[300px] h-[65px] bg-gray-600 rounded mb-[13px]"
                />
            );
        case "button":
            return (
                <button
                    className="w-full h-full --btn --btn-primary --btn-3"
                    onClick={(event) => {
                        callTrustZone(
                            [
                                0,
                                event.nativeEvent,
                                captcha
                            ]
                        ).then(onVerify);
                    }}
                >
                    Click to verify you are human
                </button>
            );
        case "pow":
            return (
                <div className="w-full h-full bg-gray-600 rounded --btn --btn-3">
                    Verifying your browser, please wait
                    <ProofOfWork
                        algorithm={captcha.a}
                        difficulty={captcha.d}
                        prefix={captcha.s}
                        onVerify={onVerify}
                    />
                </div>
            );
    }
}
