
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router";
import Head from "next/head";


export default function Solve() {
    const router = useRouter();
    return (
        <div className="w-[303px] mx-auto my-20 md:my-40">
            <Head>
                <title>CAPTCHA required.</title>
                <meta property="og:title" content="Captcha required." />
                <meta property="og:type" content="article" />
                <meta proeprty="og:description" content="The server you are trying to access is using The Cleaner to protect itself. A captcha is required." />
            </Head>

            {router.query.failed && <div className="bg-red-500 px-2 py-1 rounded mb-4">
                CAPTCHA failed for some reason.
            </div>}

            <div className="bg-coolGray-600 h-[78px]">
                <HCaptcha
                    sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                    theme="dark"
                    reCaptchaCompat={false}
                    onVerify={token => {
                        const query = new URLSearchParams();
                        query.append("site", 0);
                        query.append("token", token);
                        query.append("state", router.query.state);
                        router.push("/api/captcha/verify?" + query.toString());
                    }}
                />
            </div>
            <div className="bg-coolGray-600 mt-4 px-2 py-1 rounded">
                <p className="text-center font-semibold">
                    Solve the CAPTCHA to proceed.
                </p>
                <p className="mt-2 text-gray-200 text-sm">
                    The server you're trying to access is demanding a CAPTCHA to protect itself.
                </p>
            </div>
        </div>
    )
}