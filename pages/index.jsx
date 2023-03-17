import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

import MetaTags from "@/components/metatags.jsx";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";
import { Features, ReducedFeatures } from "@/components/features.jsx";


export default function Home() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <MetaTags
                title="The Cleaner - Keeping your servers clean"
                description="A bot built for keeping servers clean. Start protecting your server with The Cleaner now!"
            />
            <div className="--container">
                <Header />
                <Hero />
            </div>
            <div className="py-20 mt-20 border-t border-b bg-gray-750 border-gray-550">
                <div className="--container">
                    <FeatureSection />
                </div>
            </div>
            <CTA />
            <div className="--container">
                <div className="pb-8 border-t border-gray-550" />
                <Footer />
            </div>
        </>
    );
}

function Hero() {
    return (
        <>
            <h2 className="mt-20 text-5xl font-extrabold leading-10 text-center md:text-left">
                Keep your server clean
            </h2>
            <p className="mt-6 text-gray-100">
                The Cleaner helps you keep your server clean and safe while you
                are away.
            </p>
            <p>
                Fully automated state-of-the-art security for your server in
                bundled into an all-in-one package to let you sleep.
            </p>
            <div className="flex items-center justify-center w-full gap-4 mt-12 md:w-1/2 md:max-w-xl">
                <InternalLink href="/dash" className="w-full">
                    Dashboard
                </InternalLink>
                <ExternalLink
                    href="https://docs.cleanerbot.xyz"
                    color="--btn-neutral"
                    style="--btn-0"
                    className="!hidden md:!flex"
                >
                    Documentation
                </ExternalLink>
            </div>
        </>
    );
}

function FeatureSection() {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            <ReducedFeatures withAos={true} />
            <button
                className="mx-auto mt-20 --btn --btn-0 --btn-neutral"
                onClick={() => {
                    setShowMore(!showMore);
                }}
            >
                Show {showMore ? "less" : "more"} features
                {showMore ? (
                    <ChevronUp className="ml-2" />
                ) : (
                    <ChevronDown className="ml-2" />
                )}
            </button>
            {showMore && (
                <div className="mt-20">
                    <Features withAos={true} />
                </div>
            )}
        </>
    );
}

function CTA() {
    return (
        <div className="my-40 --container" data-aos="fade-up">
            <h2 className="text-6xl font-bold leading-[3rem] text-center max-w-[30rem] lg:max-w-none mx-auto">
                Try <span className="text-blue-300">The Cleaner</span> now
            </h2>
            <InternalLink href="/dash" className="mx-auto max-w-[27rem] mt-12">
                Dashboard
            </InternalLink>
        </div>
    );
}
