import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QRCode from "qrcode.react";

import ErrorHandler from "@/components/dash/error.jsx";
import { base32encode } from "@/lib/base32.js";
import { getMFA, postTOTPMFA, deleteMFA, AXIOS } from "@/lib/api.js";
import { b64decode, b64encode } from "@/lib/base64.js";
import { HorizontalRule } from "@/components/dash/ui.jsx";

export default function MFAComponent({ user, setUser, route, updateRoute }) {
    const [mfa, setMFA] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        getMFA()
            .then((response) => {
                setMFA(response.data);
            })
            .catch((error) => {
                if (error?.response?.status === 404) return setMFA(null);
                setError(error);
            });
    }, []);
    const onVerify = () => {
        if (route.other.length > 0) {
            updateRoute({
                guildId: route.other.shift() ?? "",
                component: route.other.shift() ?? "",
                other: route.other,
            });
        } else {
            setUser({ ...user, has_mfa: true });
        }
    };
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {error ? (
                <ErrorHandler error={error} />
            ) : mfa ? (
                user.has_mfa ? (
                    <>
                        <p className="mb-4">
                            You are currently using: {mfa.toUpperCase()}
                        </p>
                        <div className="flex gap-4">
                            <button
                                className="--btn --btn-3 --btn-destructive"
                                onClick={() => {
                                    deleteMFA()
                                        .then(() =>
                                            setMFA({
                                                response: { status: 404 },
                                            })
                                        )
                                        .catch(setMFA);
                                }}
                            >
                                Deauthorize MFA
                            </button>
                        </div>
                    </>
                ) : (
                    <MFAVerify mfa={mfa} onVerify={onVerify} />
                )
            ) : mfa === null ? (
                <MFASetup onVerify={onVerify} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

function MFAVerify({ mfa, onVerify }) {
    return (
        <>
            <p className="mb-4">Please verify using: {mfa.toUpperCase()}</p>
            {mfa === "totp" ? (
                <TOTPCodeInput onVerify={onVerify} />
            ) : (
                <U2FMFA v="a" onVerify={onVerify} />
            )}
        </>
    );
}

function MFASetup({ onVerify }) {
    const [settingUp, setSettingUp] = useState();
    if (settingUp === "totp") return <TOTPMFASetup onVerify={onVerify} />;
    if (settingUp === "u2f") return <U2FMFA v="r" onVerify={onVerify} />;
    return (
        <>
            <p className="text-xl font-bold text-center">
                You do not have MFA set up.
            </p>
            <div className="mt-6 space-y-1 w-80">
                <button
                    className="w-full --btn --btn-3 --btn-primary"
                    onClick={() => {
                        setSettingUp("totp");
                    }}
                >
                    Use TOTP
                </button>
                <button
                    className="w-full --btn --btn-3 --btn-primary"
                    onClick={() => {
                        setSettingUp("u2f");
                    }}
                >
                    Use U2F
                </button>
            </div>
        </>
    );
}

function TOTPMFASetup() {
    const [secret, setSecret] = useState();
    useEffect(() => {
        const buffer = new Uint8Array(16);
        while (true) {
            crypto.getRandomValues(buffer);
            const base32 = base32encode(buffer);
            if (base32.length % 8 !== 1) return setSecret(base32);
        }
    }, []);
    if (!secret) return <p>Generating code</p>;
    return (
        <div>
            <p className="mb-2 text-center">
                Scan this QR code with your favorite 2FA App:
            </p>
            <QRCode
                value={`otpauth://totp/The Cleaner Dashboard?secret=${secret}`}
                renderAs="svg"
                size={256}
                className="mx-auto"
            />
            <HorizontalRule label="OR" className="mt-4" />
            <p className="mt-2 text-sm text-center">
                Enter the following code:{" "}
            </p>
            <p className="w-full text-center">
                <span className="px-1 bg-gray-600 rounded">{secret}</span>
            </p>

            <HorizontalRule
                label="THEN"
                color="bg-indigo-550"
                className="mt-4"
            />

            <p className="mt-6 mb-4 text-xl font-semibold text-center">
                Enter the verification code from the app:
            </p>
            <div className="flex justify-center">
                <TOTPCodeInput secret={secret} />
            </div>
        </div>
    );
}

function U2FMFA({ v, onVerify }) {
    const [aborted, setAborted] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        if (aborted) return;
        AXIOS.get(`/v1/user/me/mfa/u2f/${v}`)
            .then((response) => {
                const data = response.data;
                if (data.user) data.user.id = b64decode(data.user.id);
                data.challenge = b64decode(data.challenge);
                if (data.allowCredentials)
                    data.allowCredentials = data.allowCredentials.map(
                        (cred) => {
                            cred.id = b64decode(cred.id);
                            return cred;
                        }
                    );
                if (data.excludeCredentials)
                    data.excludeCredentials = data.excludeCredentials.map(
                        (cred) => {
                            cred.id = b64decode(cred.id);
                            return cred;
                        }
                    );
                navigator.credentials[v === "r" ? "create" : "get"]({
                    publicKey: data,
                })
                    .then(function (response) {
                        let data =
                            v === "r"
                                ? {
                                      id: b64encode(response.rawId),
                                      response: {
                                          data: b64encode(
                                              response.response.clientDataJSON
                                          ),
                                          attestation: b64encode(
                                              response.response
                                                  .attestationObject
                                          ),
                                      },
                                  }
                                : {
                                      id: b64encode(response.rawId),
                                      response: {
                                          authenticator: b64encode(
                                              response.response
                                                  .authenticatorData
                                          ),
                                          data: b64encode(
                                              response.response.clientDataJSON
                                          ),
                                          signature: b64encode(
                                              response.response.signature
                                          ),
                                          userHandle: b64encode(
                                              response.response.userHandle
                                          ),
                                      },
                                  };
                        AXIOS.post(`/v1/user/me/mfa/u2f/${v}`, data)
                            .then((response) => {
                                localStorage.setItem("token", response.data);
                                onVerify();
                            })
                            .catch(setError);
                    })
                    .catch((error) => {
                        if (
                            error.message.includes(
                                "sctn-privacy-considerations-client"
                            )
                        ) {
                            setAborted(true);
                        } else {
                            setError(error);
                        }
                    });
            })
            .catch(setError);
    }, [aborted]);
    if (aborted)
        return (
            <>
                <div>Operation was aborted.</div>
                <button
                    className="w-40 --btn --btn-0 --btn-primary"
                    onClick={() => setAborted(false)}
                >
                    Try again
                </button>
            </>
        );
    if (error) return <ErrorHandler error={error} />;
    return <div>Loading...</div>;
}

function TOTPCodeInput({ secret, onVerify }) {
    const [code, setCode] = useState("");
    const [submitting, setSubmitting] = useState(false);
    if (![true, false].includes(submitting))
        return <ErrorHandler error={submitting} />;
    return (
        <input
            type="text"
            value={code}
            onChange={(event) => {
                if (!/^\d{0,3} ?\d{0,3}$/.test(event.target.value))
                    return event.preventDefault(true);
                setCode(event.target.value);
                const totp = event.target.value.replaceAll(" ", "");
                if (totp.length === 6) {
                    setSubmitting(true);
                    postTOTPMFA({ secret, code: +totp })
                        .then((response) => {
                            setSubmitting(false);
                            localStorage.setItem("token", response.data);
                            onVerify();
                        })
                        .catch((error) => {
                            setSubmitting(false);
                            if (error?.response?.status === 403)
                                return toast.error("Invalid code");
                            setSubmitting(error);
                        });
                }
            }}
            placeholder="000 000"
            className="w-[5.5rem] px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-750 focus:bg-gray-750 disabled:cursor-not-allowed"
            maxLength={7}
            disabled={submitting}
            spellCheck={false}
        />
    );
}
