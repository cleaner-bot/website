import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MetaTags from "@/components/metatags.jsx";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";
import Footer from "@/components/footer.jsx";
import { Features, ReducedFeatures } from "@/components/features.jsx";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const headerLinks = [
    { name: "Documentation", href: "https://docs.cleanerbot.xyz/" },
    { name: "Blog", href: "https://docs.cleanerbot.xyz/blog/" },
    { name: "Discord", href: "/discord" },
];

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

function Header() {
    return (
        <div className="flex flex-wrap items-end justify-center h-10 gap-4 mt-4 overflow-hidden sm:justify-between gap-y-10">
            <h1 className="flex items-center justify-center h-full text-2xl font-extrabold hover:underline decoration-indigo-550 decoration-4 underline-offset-2">
                <Image
                    className="hidden w-8 h-8 mr-2 rounded-full md:inline-block"
                    src="/img/avatar@96x96.png"
                    width={96}
                    height={96}
                    alt=""
                />
                The Cleaner
            </h1>
            <div className="hidden gap-4 sm:flex">
                {headerLinks.map((x) => (
                    <Link
                        href={x.href}
                        key={x.href}
                        className="hover:underline"
                    >
                        {x.name}
                    </Link>
                ))}
            </div>
            <Link
                href="/dash"
                className="--btn --btn-primary --btn-3 !rounded-full"
            >
                Open Dashboard
            </Link>
        </div>
    )
}

function Hero() {
    return (
        <>
            <h2 className="mt-20 text-5xl font-extrabold leading-10 text-center md:text-left">
                Keep your server clean
            </h2>
            <p className="mt-6 text-gray-100">
                The Cleaner helps you keep your server clean and safe while
                you are away.
            </p>
            <p>
                Fully automated state-of-the-art security for your server in
                bundled into an all-in-one package to let you sleep.
            </p>
            <div className="flex items-center justify-center w-full gap-4 mt-12 md:w-1/2 md:max-w-xl">
                <InternalLink
                    href="/dash"
                    className="w-full"
                >
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
    )
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
                {showMore ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
            </button>
            {showMore && (
                <div className="mt-20">
                    <Features withAos={true} />
                </div>
            )}
        </>
    )
}

function CTA() {
    return (
        <div className="my-40 --container" data-aos="fade-up">
            <h2 className="text-6xl font-bold leading-[3rem] text-center max-w-[30rem] lg:max-w-none mx-auto">
                Try <span className="text-blue-300">The Cleaner</span> now
            </h2>
            <InternalLink
                href="/dash"
                className="mx-auto max-w-[27rem] mt-12"
            >
                Dashboard
            </InternalLink>
        </div>
    )
}
