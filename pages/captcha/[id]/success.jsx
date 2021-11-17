
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/outline";
import { plus } from "hero-patterns";
import Link from "next/link";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { getCustomPaths, getCustomProps } from "@/lib/custom.js";


export default function Success({ splash }) {
    return (
        <BackgroundImage background={!splash}>
            <MetaTags
                title="Captcha solved successfully!"
                description="The captcha has been solved successfully and access has been granted."
            />
            {splash && <div className="absolute right-0 h-screen overflow-hidden">
                <Image className="object-none min-h-screen w-auto" src={splash} />
            </div>}
            <div className="w-[303px] absolute top-1/2 left-1/2 -mr-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-emerald-550 rounded py-1 px-2 shadow-2xl">
                    <h1 className="font-bold flex">
                        <CheckIcon className="h-10 w-10 inline" />
                        <span className="ml-2 self-center">
                            Access has been granted.
                        </span>
                    </h1>
                    <p className="text-gray-200">
                        You can now return to Discord.
                    </p>
                </div>
                <Link href="/">
                    <a className="-anim -btn bg-coolGray-800 hover:bg-emerald-600 mt-4 shadow-2xl">
                        <ArrowLeftIcon className="h-6 w-6 mr-2" />
                        Go to Homepage
                    </a>
                </Link>
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
