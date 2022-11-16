import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import MetaTags from "@/components/metatags.jsx";
import { Pro } from "@/components/featurelist.jsx";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";
import Footer from "@/components/footer.jsx";
import Features from "@/components/features.jsx";

const headerLinks = [
    { name: "Documentation", href: "https://docs.cleanerbot.xyz/" },
    { name: "Blog", href: "https://blog.cleanerbot.xyz" },
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
                <h2 className="mt-20 text-5xl font-extrabold leading-10 text-center">
                    A bot built to keep your servers clean
                </h2>
                <div className="mx-auto md:w-max">
                    <p className="mt-6 text-gray-100">
                        The Cleaner is a Discord bot designed to keep your
                        server clean and safe.
                    </p>
                    <div className="mx-auto my-4 space-y-1">
                        <Pro>Anti Spam</Pro>
                        <Pro>Auto Moderator</Pro>
                        <Pro>
                            Phishing detection (included in Auto Moderator)
                        </Pro>
                        <Pro>Anti Raid and Link Filter</Pro>
                        <Pro>Member Verification</Pro>
                        <p className="ml-8">
                            and more to keep your server secure
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <InternalLink
                            href="/dash"
                            className="w-full md:max-w-96"
                        >
                            Dashboard
                        </InternalLink>
                        <ExternalLink
                            href="/discord"
                            className="w-full md:max-w-96"
                        >
                            Join the Discord
                        </ExternalLink>
                    </div>
                </div>
            </div>
            <div className="py-20 mt-20 border-t border-b bg-gray-750 border-gray-550">
                <div className="--container">
                    <Features />
                </div>
            </div>
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
            <div className="--container">
                <div className="pb-8 border-t border-gray-550" />
                <Footer />
            </div>
        </>
    );
}
