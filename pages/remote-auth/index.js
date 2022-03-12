
import Link from "next/link"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import QRCode from "qrcode.react";

import { createRemoteAuth, postRemoteAuth } from "@/lib/api.js";
import ErrorHandler from "@/components/dash/error.jsx";


export default function RemoteAuth() {
    const router = useRouter();
    if(!router.isReady)
        return (
            <h1 className="mt-20 mb-10 text-4xl font-bold text-center text-red-400">
                Loading...
            </h1>
        )
    const { code } = router.query;
    return code ? <UseRemoteAuth code={code} /> : <CreateRemoteAuth />
}

function CreateRemoteAuth() {
    const [state, setState] = useState({ stage: 0 });
    return (
        <div className="--container">
            <h1 className="mt-20 mb-10 text-4xl font-bold text-center text-red-400">
                Danger!
            </h1>
            <p className="mb-12 text-center">
                Giving someone this URL or QR-Code will give them <b>full control</b> over The Cleaner's settings.
            </p>
            {state.stage === 0 && <div className="grid grid-cols-3 gap-4 mx-auto w-96">
                <Link href="/">
                    <a className="col-span-2 --btn --btn-3 --btn-success">
                        Take me back
                    </a>
                </Link>
                <button className="--btn --btn-1 --btn-destructive" onClick={async () => {
                    setState({ stage: 1 });
                    let response;
                    try {
                        response = await createRemoteAuth();
                    } catch (e) {
                        return setState({ stage: 99, error: e });
                    }
                    console.log(response.data);
                    setState({ stage: 2, code: response.data });
                }}>
                    Continue
                </button>
            </div>}
            {state.stage === 1 && <p className="text-center text-red-300">
                Generating link...
            </p>}
            {state.stage === 2 && <>
                <p>
                    Link: {state.showLink ? <Link href={makeLinkFromCode(state.code)}>
                        <a className="text-blue-200 break-all hover:underline">
                            {makeLinkFromCode(state.code)}
                        </a>
                    </Link> : <button className="text-blue-200 hover:underline" onClick={() => {
                        setState({...state, showLink: true})
                    }}>
                        Show link
                    </button>}
                </p>
                <p className="mt-6">
                    QR Code:
                    {state.showQr ? <QRCode
                        value={makeLinkFromCode(state.code)}
                        renderAs="svg"
                        size={256}
                        className="mx-auto mt-4"
                    /> : <div className="flex justify-center mt-4">
                        <button className="w-64 h-64 bg-gray-600 rounded-lg" onClick={() => {
                            setState({...state, showQr: true})
                        }}>
                            Show QR-code
                        </button>
                    </div>}
                </p>
            </>}
            {state.stage === 99 && <ErrorHandler error={state.error} />}
        </div>
    )
}

function makeLinkFromCode(code) {
    const url = new URL(document.location.href);
    url.searchParams.set("code", code);
    return url.toString();
}

function UseRemoteAuth({ code }) {
    const [error, setError] = useState();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            let response;
            try {
                response = await postRemoteAuth(code);
            } catch (e) {
                return setError(e);
            }
            localStorage.setItem("token", response.data);
            router.push("/dash");
        })();
    }, [code]);
    return (
        <div className="--container">
            <h1 className="mt-20 mb-10 text-4xl font-bold text-center">
                {error ? "Aw snap" : "Logging in..."}
            </h1>
            {error ? <ErrorHandler error={error} /> : <p className="mb-12 text-center">
                Give us a bit... we're logging you in...
            </p>}
        </div>
    )
}
