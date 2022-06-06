import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { DiscordIconWhite } from "@/components/discord.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { AXIOS, createAssetURL } from "@/lib/api.js";
import Or from "@/components/or.jsx";

export default function Challenger({
    baseUrl,
    field,
    createOAuthRedirect,
    service,
}) {
    const router = useRouter();
    const [state, setState] = useState({ stage: 0 });

    useEffect(() => {
        if (!router.isReady || state.stage > 0 || state.error || state.splash) return;
        const value = router.query[field];
        let state_ = { ...state };
        if (router.query.splash) {
            state_.splash = createAssetURL("splash", value);
            setState(state_);
        }

        if (!value) {
            router.push("/");
            return;
        }

        (async () => {
            let response;
            try {
                response = await AXIOS.get(baseUrl, {
                    params: { [field]: value },
                });
            } catch (e) {
                if (e.response && e.response.status === 401) {
                    return setState({ ...state_, stage: 1 });
                }
                return setState({ ...state_, error: e });
            }
            if(service === "joinguard" && !response.data.has_join_scope)
                return setState({ stage: 7, ...response.data });
            setState({
                stage: response.data.is_valid ? 2 : 6,
                ...response.data,
            });
        })();
    }, [router, baseUrl, field, state]);

    const overlayStyle = state.splash
        ? "p-8 bg-gray-700 rounded-lg shadow-xl max-w-lg"
        : "max-w-lg ";

    return (
        <div
            className="h-screen bg-no-repeat bg-cover"
            style={{
                backgroundImage: state.splash && `url("${state.splash}")`,
            }}
        >
            <div className="flex flex-col items-center justify-center h-full --container">
                {state.stage === 0 && (
                    <div className={overlayStyle}>
                        {state.error ? (
                            <ErrorHandler error={state.error} />
                        ) : (
                            <h1 className="text-4xl font-extrabold">
                                Loading...
                            </h1>
                        )}
                    </div>
                )}
                {state.stage === 1 && (
                    <div className={overlayStyle}>
                        <h1 className="text-4xl font-extrabold text-center">
                            Are you human?
                        </h1>
                        <p className="mt-2 text-center font-gray-300">
                            We need to make sure you that you are human, before you can gain access to this server.
                        </p>
                        <button
                            className="w-full mx-auto mt-12 sm:w-80 --btn --btn-4 --btn-primary"
                            onClick={() => {
                                const url = createOAuthRedirect(
                                    router.query[field]
                                );
                                router.push(url);
                            }}
                        >
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            Authorize with Discord
                        </button>
                        {!state.captcha_required && service === "challenge" && (
                            <>
                                <Or />
                                <CaptchaFrame>
                                    {state.show_the_captcha ? (
                                        <Captcha
                                            state={state}
                                            setState={setState}
                                            baseUrl={baseUrl}
                                            field={field}
                                        />
                                    ) : (
                                        <button
                                            className="w-full h-full --btn --btn-3 --btn-neutral"
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    show_the_captcha: true,
                                                });
                                            }}
                                        >
                                            Solve a CAPTCHA instead
                                        </button>
                                    )}
                                </CaptchaFrame>
                            </>
                        )}

                        <p className="mt-6 text-center">
                            By continuing you agree to our{" "}
                            <Link href="/legal/terms">
                                <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                                    Terms of Service
                                </a>
                            </Link>{" "}
                            and{" "}
                            <Link href="/legal/terms">
                                <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                                    Privacy Policy
                                </a>
                            </Link>
                            .
                        </p>
                    </div>
                )}
                {state.stage === 2 && (
                    <div className={overlayStyle}>
                        <h1 className="text-4xl font-extrabold text-center">
                            Are you human?
                        </h1>
                        <p className="mt-2 text-center font-gray-300">
                            We need to make sure you that you are human, before you can gain access to this server.
                        </p>
                        <p className="mt-6 text-center text-gray-200">
                            Logged in as{" "}
                            <span className="text-blue-300">
                                {state.user.name}#{state.user.discriminator}
                            </span>
                            .
                        </p>
                        <div className="grid gap-4 mt-12">
                            <button
                                className="--btn --btn-primary --btn-3"
                                onClick={async () => {
                                    if (state.captcha_required)
                                        return setState({ ...state, stage: 3 });
                                    setState({ ...state, stage: 4 });
                                    try {
                                        await AXIOS.post(
                                            baseUrl,
                                            {},
                                            {
                                                params: {
                                                    [field]:
                                                        router.query[field],
                                                },
                                            }
                                        );
                                    } catch (e) {
                                        return setState({
                                            ...state,
                                            stage: 4,
                                            error: e,
                                        });
                                    }
                                    setState({ ...state, stage: 5 });
                                }}
                            >
                                Continue
                            </button>
                            {(service === "verification" || service === "joinguard") && (
                                <button
                                    className="--btn --btn-neutral --btn-3"
                                    onClick={() => {
                                        const url = createOAuthRedirect(
                                            router.query[field],
                                            true
                                        );
                                        router.push(url);
                                    }}
                                >
                                    <DiscordIconWhite className="w-6 h-6 mr-4" />
                                    Change account
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {state.stage === 3 && (
                    <CaptchaFrame>
                        <Captcha
                            state={state}
                            setState={setState}
                            baseUrl={baseUrl}
                            field={field}
                        />
                    </CaptchaFrame>
                )}
                {state.stage === 4 && (
                    <div className={overlayStyle}>
                        {state.error ? (
                            <ErrorHandler error={state.error} />
                        ) : (
                            <h1 className="text-4xl font-extrabold">
                                Submitting...
                            </h1>
                        )}
                    </div>
                )}
                {state.stage === 5 && (
                    <>
                        <div className={overlayStyle}>
                            <h1 className="text-4xl font-extrabold text-center">
                                {service === "joinguard" ? "Added to server!" : "Verified!"}
                            </h1>
                            <p className="mt-6 text-center">
                                You can now close this tab and return to
                                Discord.
                            </p>
                        </div>
                        <div className={clsx(overlayStyle, "mt-12")}>
                            <p className="text-sm text-center">
                                Protection provided by{" "}
                                <Link href="/">
                                    <a className="font-bold text-gray-300 hover:underline">
                                        The Cleaner
                                    </a>
                                </Link>
                                .
                            </p>
                        </div>
                    </>
                )}
                {state.stage === 6 && (
                    <div className={overlayStyle}>
                        <h1 className="text-4xl font-extrabold text-center">
                            {service === "verification"
                                ? "No verification required"
                                : "Wrong account?"}
                        </h1>
                        <p className="mt-6 text-center text-gray-200">
                            Are you{" "}
                            <span className="text-blue-300">
                                {state.user.name}#{state.user.discriminator}
                            </span>
                            ?
                        </p>
                        <p className="text-center text-gray-200">
                            If not, change your account below.
                        </p>
                        <button
                            className="w-full mt-12 --btn --btn-neutral --btn-3"
                            onClick={() => {
                                const url = createOAuthRedirect(
                                    router.query[field],
                                    true
                                );
                                router.push(url);
                            }}
                        >
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            Change account
                        </button>
                    </div>
                )}
                {state.stage === 7 && (
                    <div className={overlayStyle}>
                        <h1 className="text-4xl font-extrabold text-center">
                            Missing permissions.
                        </h1>
                        <p className="mt-2 text-center font-gray-300">
                            To continue we need you to grant us additional permissions.
                        </p>
                        <button
                            className="w-full mt-12 --btn --btn-primary --btn-3"
                            onClick={() => {
                                const url = createOAuthRedirect(
                                    router.query[field],
                                    true
                                );
                                router.push(url);
                            }}
                        >
                            <DiscordIconWhite className="w-6 h-6 mr-4" />
                            Re-authorize with Discord
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function CaptchaFrame({ children }) {
    return (
        <div className="w-[303px] h-[78px] mx-auto mt-6 bg-gray-600 rounded">
            {children}
        </div>
    );
}

function Captcha({ state, setState, baseUrl, field }) {
    const router = useRouter();
    return (
        <HCaptcha
            sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
            theme="dark"
            reCaptchaCompat={false}
            onVerify={async (token) => {
                setState({ ...state, stage: 4 });
                try {
                    await AXIOS.post(
                        baseUrl,
                        { token },
                        {
                            params: {
                                [field]: router.query[field],
                            },
                        }
                    );
                } catch (e) {
                    return setState({
                        ...state,
                        stage: 4,
                        error: e,
                    });
                }
                setState({ ...state, stage: 5 });
            }}
        />
    );
}
