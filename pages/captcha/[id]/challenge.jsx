
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ArrowLeftIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { plus } from "hero-patterns";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { getCustomPaths, getCustomProps } from "@/lib/custom.js";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";


export default function Solve({ splash, text }) {
    const router = useRouter();
    return (
        <BackgroundImage background={!splash}>
            <MetaTags
                title="CAPTCHA Verification required."
                description={text || "The server you're trying to access is demanding a CAPTCHA to protect itself."}
            />
            {splash && <div className="absolute right-0 h-screen overflow-hidden">
                <Image className="object-none w-auto min-h-screen" src={splash} />
            </div>}
            <div className="w-[303px] absolute top-1/2 left-1/2 -mr-1/2 -translate-x-1/2 -translate-y-1/2">
                {router.query.failed && <div className="px-2 py-1 mb-4 text-center bg-red-500 rounded shadow-2xl">
                    CAPTCHA failed for some reason.
                </div>}

                <div className="px-2 py-3 mb-4 text-center bg-gray-700 rounded shadow-2xl">
                    <p className="font-semibold">
                        Solve the CAPTCHA to proceed.
                    </p>
                    <p className="mt-2 text-sm text-gray-200">
                        {text || "The server you're trying to access is demanding a CAPTCHA to protect itself."}
                    </p>
                </div>
                {router.query.state ? <div className="bg-gray-700 h-[78px] shadow-2xl">
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
                </div> : <>
                    <div className="px-2 py-1 mb-4 text-center bg-red-500 rounded shadow-2xl">
                        The link you used to come here is invalid.
                    </div>
                    <InternalLink href="/" color="--btn-neutral">
                        Go to the Homepage
                    </InternalLink>
                    <ExternalLink href="/discord" color="--btn-neutral" className="mt-2">
                        Help (discord)
                    </ExternalLink>
                </>}
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
