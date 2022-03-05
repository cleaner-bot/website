
import { CheckIcon } from "@heroicons/react/outline";
import { plus } from "hero-patterns";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { getCustomPaths, getCustomProps } from "@/lib/custom.js";
import { InternalLink } from "@/components/buttons.jsx";


export default function Success({ splash }) {
    return (
        <BackgroundImage background={!splash}>
            <MetaTags
                title="Captcha solved successfully!"
                description="The captcha has been solved successfully and access has been granted."
            />
            {splash && <div className="absolute right-0 h-screen overflow-hidden">
                <Image className="object-none w-auto min-h-screen" src={splash} />
            </div>}
            <div className="w-[303px] absolute top-1/2 left-1/2 -mr-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="px-2 py-1 rounded shadow-2xl bg-emerald-550">
                    <h1 className="flex font-bold">
                        <CheckIcon className="inline w-10 h-10" />
                        <span className="self-center ml-2">
                            Access has been granted.
                        </span>
                    </h1>
                    <p className="text-center text-gray-200">
                        You can now return to Discord.
                    </p>
                </div>
                <InternalLink href="/" color="--btn-neutral" className="mt-2">
                    Go to the Homepage
                </InternalLink>
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
