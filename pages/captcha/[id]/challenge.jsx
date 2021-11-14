
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { plus } from "hero-patterns";
import { useRouter } from "next/router";
import Head from "next/head";

import Image from "@/components/image.jsx";
import { getCustomPaths, getCustomProps } from "@/lib/custom.js";


export default function Solve({ splash }) {
    const router = useRouter();
    return (
        <BackgroundImage background={!splash}>
            {splash && <div className="absolute right-0">
                <Image className="object-none min-h-screen w-auto" src={splash} />
            </div>}
            <div className="w-[303px] absolute top-1/2 left-1/2 -mr-1/2 -translate-x-1/2 -translate-y-1/2">
                <Head>
                    <title>CAPTCHA required.</title>
                    <meta property="og:title" content="Captcha required." />
                    <meta property="og:type" content="article" />
                    <meta proeprty="og:description" content="The server you are trying to access is using The Cleaner to protect itself. A captcha is required." />
                </Head>

                {router.query.failed && <div className="bg-red-500 text-center px-2 py-1 rounded mb-4 shadow-2xl">
                    CAPTCHA failed for some reason.
                </div>}

                <div className="bg-coolGray-600 text-center mb-4 px-2 py-3 rounded shadow-2xl">
                    <p className="font-semibold">
                        Solve the CAPTCHA to proceed.
                    </p>
                    <p className="mt-2 text-gray-200 text-sm">
                        The server you're trying to access is demanding a CAPTCHA to protect itself.
                    </p>
                </div>
                <div className="bg-coolGray-600 h-[78px] shadow-2xl">
                    <HCaptcha
                        sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                        theme="dark"
                        reCaptchaCompat={false}
                        onVerify={token => {
                            const query = new URLSearchParams();
                            query.append("site", router.query.id);
                            query.append("token", token);
                            query.append("state", router.query.state);
                            router.push("/api/captcha/verify?" + query.toString());
                        }}
                    />
                </div>
            </div>
        </BackgroundImage>
    )
}

function BackgroundImage({ background, children }) {
    if(!background)
        return children;
    return (
        <div className="h-screen" style={{backgroundImage: plus("9c92ac", 0.4)}}>
            {children}
        </div>
    )
}

export async function getStaticProps({ params: {id} }) {
    return {
        props: getCustomProps(id)
    };
}


export async function getStaticPaths() {
    return {
        paths: getCustomPaths(),
        fallback: false
    }
}
