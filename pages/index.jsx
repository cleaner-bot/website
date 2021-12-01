
import AOS from "aos";
import "aos/dist/aos.css";

import { ArrowRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { Pro } from "@/components/featurelist.jsx";
import isDev from "@/lib/dev.js";
import { useEffect } from "react";


export default function Home() {
    useEffect(() => {
        AOS.init();
    })
    return (
        <>
            <MetaTags
                title="The Cleaner - Keeps servers clean"
                description="A bot built for keeping servers clean. Start protecting your server with The Cleaner now!"
            />
            <div className="-container">
                <div className="flex flex-wrap justify-center mb-12">
                    <h1 className="text-5xl sm:text-6xl font-extrabold -heading px-2 flex-none">
                        <Image className="w-16 h-16 align-middle rounded-full hidden md:inline-block" src="https://cdn.discordapp.com/avatars/823533449717481492/8f9fa1d877c02711fe00a1c91fc2836d.png?size=256" width={256} height={256} alt="Avatar of The Cleaner." />
                        <span className="align-middle px-2 hover:border-b-4 border-b-indigo-600">
                            The Cleaner
                        </span>
                    </h1>
                    <div className="space-x-2 mt-8 md:mt-10 flex h-6">
                        <Link href="/quickstart">
                            <a className="inline-block align-bottom px-1 hover:border-b-2 border-b-indigo-600">
                                Quickstart
                            </a>
                        </Link>
                        <Link href="/discord">
                            <a className="inline-block align-bottom px-1 hover:border-b-2 border-b-indigo-600">
                                Discord
                            </a>
                        </Link>
                        <Link href="/docs/">
                            <a className="inline-block align-bottom px-1 hover:border-b-2 border-b-indigo-600">
                                Documentation
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10">
                    <div className="m-auto">
                        <h2 className="text-5xl font-extrabold leading-10">
                            A bot built for keeping servers clean
                        </h2>
                        <p className="text-gray-100 mt-6">
                            The Cleaner is a Discord bot designed to keep your server clean by removing spam, phishing, and more!
                        </p>
                        <div className="space-y-1 my-4">
                            <Pro>
                                Raid detection within seconds.
                            </Pro>
                            <Pro>
                                Instant phishing link detection with the help of heuristics, a database of old links and shared knowledge between servers.
                            </Pro>
                            <Pro>
                                Filter bots out with CAPTCHAs.
                            </Pro>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 mt-2">
                            <Link href="/quickstart">
                                <a className="-btn -anim bg-blue-580 hover:bg-blue-630 sm:col-span-2">
                                    Quick Start
                                    <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                                </a>
                            </Link>
                            <Link href="/discord">
                                <a className="-btn -anim bg-blue-580 hover:bg-blue-630">
                                    Join the Discord
                                    <ExternalLinkIcon className="h-6 w-6 inline ml-2" />
                                </a>
                            </Link>
                            <Link href="/docs/">
                                <a className="-btn -anim bg-blue-580 hover:bg-blue-630">
                                    Documentation
                                    <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="m-auto">
                        <Image src="/img/home/feature_phishing.gif" className="w-full" width={600} height={300} alt="GIF of phishing protection in action" />
                    </div>
                </div>
            </div>
            <div className="text-coolGray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,80C384,43,480,21,576,32C672,43,768,85,864,122.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-coolGray-750">
                <div className="-container">
                    <div className="grid md:grid-cols-2 gap-y-10" data-aos="fade-up">
                        <div className="md:m-auto">
                            <h2 className="text-4xl font-bold leading-10 mb-4">
                                Automatic Raid Prevention
                            </h2>
                            <p className="text-gray-100 mt-1">
                                Automatically detects raids and deploys on-the-fly rules to detect it.
                            </p>
                            <p className="text-gray-100">
                                Uses Discord's features whenever necessary:
                            </p>
                            <div className="space-y-1 my-4">
                                <Pro>
                                    Detection generally within 5 seconds.
                                </Pro>
                                <Pro>
                                    Can handle up to 33 messages/second. (discord ratelimit)
                                </Pro>
                                <Pro>
                                    Automatic adjustments of Slowmode & Verification Level.
                                </Pro>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            <Image src="/img/home/feature_antiraid.png" className="w-full" width={1260} height={764} alt="Image of antiraid in action" />
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2 gap-y-10" data-aos="fade-up">
                        <div className="m-auto">
                            <h2 className="text-4xl font-bold leading-10 mb-4">
                                Phishing Prevention
                            </h2>
                            <p className="text-gray-100">
                                Detects phishing links and automatically freezes the account until the owner recovers it.
                            </p>
                            <div className="space-y-1 my-4">
                                <Pro>
                                    Huge database of past phishing waves.
                                </Pro>
                                <Pro>
                                    Advanced heuristics for detecting new domains.
                                </Pro>
                                <Pro>
                                    Learning from past waves and independent of link detection.
                                </Pro>
                            </div>
                            <p className="text-gray-100">
                                Once phishing has been detected, the account will be issued a CAPTCHA that must be solved.
                            </p>
                            <p className="text-gray-100">
                                This ensures the account owner can regain access to the server once the account is recovered.
                            </p>
                        </div>
                        <div className="text-gray-400 md:order-first">
                            <Image src="/img/home/feature_phishing.png" className="w-full" width={1221} height={539} alt="Image of phishing prevention catching a phishing message" />
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2 gap-y-10" data-aos="fade-up">
                        <div className="m-auto">
                            <h2 className="text-4xl font-bold leading-10 mb-4">
                                CAPTCHAs for anyone, anytime.
                            </h2>
                            <p className="text-gray-100">
                                If members are misbehaving, they're issued a CAPTCHA that they must solve to continue participating.
                                If a member is issued too many CAPTCHAs, they'll have to wait a bit until they can solve the next one.
                            </p>
                            <p className="text-gray-100">
                                If CAPTCHA verification is not setup, The Cleaner will ban misbehaving members instead.
                            </p>
                            <div className="space-y-1 my-4">
                                <Pro>
                                    CAPTCHA on join.
                                </Pro>
                                <Pro>
                                    CAPTCHA when deemed necessary.
                                </Pro>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            <Image src="/img/home/feature_captcha.png" className="w-full" width={1250} height={777} alt="Image of the CAPTCHA challenge in Discord" />
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2 gap-y-10" data-aos="fade-up">
                        <div className="m-auto">
                            <h2 className="text-4xl font-bold leading-10 mb-4">
                                Keep links clean
                            </h2>
                            <p className="text-gray-100">
                                Sends every link into the logging channel where it can be reviewed.
                            </p>
                            <div className="space-y-1 my-4">
                                <Pro>
                                    Whitelist domains so they don't have to be reviewed again.
                                </Pro>
                                <Pro>
                                    Blacklist only that exact url.
                                </Pro>
                                <Pro>
                                    Blacklist entire domain.
                                </Pro>
                            </div>
                            <p>
                                Enable Link Checker with {" "}
                                <Link href="/docs/commands/#config-linkchecker">
                                    <a className="hover:underline">
                                        <code>/config linkchecker enable</code>
                                    </a>
                                </Link>
                            </p>
                        </div>
                        <div className="text-gray-400 md:order-first">
                            <Image src="/img/home/feature_link_checker.png" className="w-full" width={415} height={225} alt="Image of a 'new link spotted' logging message" />
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2 gap-y-10" data-aos="fade-up">
                        <div className="m-auto">
                            <h2 className="text-4xl font-bold leading-10 mb-4">
                                Just... keep it clean.
                            </h2>
                            <p className="text-gray-100">
                                Keeps a lot of unsocialized content out of your server - by default.
                            </p>
                            <div className="space-y-1 my-4">
                                <Pro>
                                    Automatic de-hoisting.
                                </Pro>
                                <Pro>
                                    Block on mass ping. (triggers after 5)
                                </Pro>
                                <Pro>
                                    Block on mass emoji.  (triggers after 7)
                                </Pro>
                                <Pro>
                                    Block on Discord invites.
                                </Pro>
                                <Pro>
                                    Block on @everyone and @here pings. (only if the ping fails)
                                </Pro>
                            </div>
                            <p>
                                Want to disable some rules? Check out the command documentation on rules.
                            </p>
                            <Link href="/docs/commands/#rules">
                                <a className="w-full sm:w-1/2 md:w-full lg:w-1/2 mt-6 -btn -anim bg-blue-580 hover:bg-blue-630">
                                    Rules Commands
                                    <ArrowRightIcon className="w-6 h-6 ml-2 inline" />
                                </a>
                            </Link>
                        </div>
                        <div className="text-gray-400">
                            <Image src="/img/home/feature_clean.png" className="w-full" width={1177} height={797} alt="Image of just named rules in actions" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-coolGray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,128L48,133.3C96,139,192,149,288,176C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <div className="-container" data-aos="fade-up">
                <h2 className="text-6xl font-bold leading-[3rem] text-center max-w-[30rem] lg:max-w-none mx-auto">
                    Start protecting <span className="text-blue-330">your server</span> now
                </h2>
                <Link href="/quickstart">
                    <a className="mx-auto max-w-[27rem] lg:max-w-[56rem] mt-12 -btn -anim bg-blue-580 hover:bg-blue-630">
                        Quick Start
                        <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                    </a>
                </Link>
            </div>
            <div className="text-coolGray-750 mt-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,256L48,213.3C96,171,192,85,288,80C384,75,480,149,576,154.7C672,160,768,96,864,90.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-coolGray-750">
                {isDev() && <div className="-container pb-40">
                    <h2 className="text-6xl font-bold">
                        Require <span className="-highlight italic">Professional</span> Cleaning?
                    </h2>
                    <p className="my-2">
                        Go <span className="-highlight">Pro</span> to support The Cleaner and unlock the following features:
                    </p>
                    <div>
                        {/*
                        <Pro>
                            Multiple Cleaner Bots (bypass rate limits)
                        </Pro>
                        */}
                        <Pro>
                            Custom delay before the human verification can be performed
                        </Pro>
                        <Pro>
                            Customizable "Human verification required" embed
                        </Pro>
                        <Pro>
                            Custom Text and Splash on the CAPTCHA sites
                        </Pro>
                        <Pro>
                            1 Javascript Firewall rule
                        </Pro>
                        <Pro>
                            Exclusive role and support channels on Discord
                        </Pro>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 xl:w-1/2 my-4">
                        <Link href="/pro?plan=monthly">
                            <a className="-anim -btn-basic bg-coolGray-720 hover:bg-emerald-600">
                                <p className="text-lg font-bold text-center">
                                    Monthly
                                </p>
                                <div className="flex">
                                    <span className="text-3xl font-extrabold slashed-zero pr-4">
                                        2,00€
                                    </span>
                                    <div>
                                        <p className="text-sm leading-tight">
                                            EUR / month
                                        </p>
                                        <p className="text-xs text-gray-200">
                                            Billed monthly
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <Link href="/pro?plan=yearly">
                            <a className="-anim -btn-basic bg-coolGray-720 hover:bg-emerald-600">
                                <p className="text-lg font-bold text-center">
                                    Yearly
                                </p>
                                <div className="flex">
                                    <span className="text-3xl font-extrabold slashed-zero pr-4">
                                        1,50€
                                    </span>
                                    <div>
                                        <p className="text-sm leading-tight">
                                            EUR / month
                                        </p>
                                        <p className="text-xs text-gray-200">
                                            Billed yearly (18€)
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <p>
                        Mr. Clean at its core will always stay free - but the servers do not pay themselves.
                    </p>
                </div>}
                <div className="-container grid grid-cols-2 md:grid-cols-4 pb-10 gap-4 gap-y-12">
                    <div className="col-span-2">
                        <h3 className="text-3xl font-bold">
                            The Cleaner
                        </h3>
                        <p className="text-gray-200 mt-1">
                            Copyright &copy; 2021 - 2021
                            {" "}
                            <Link href="https://leodev.xyz">
                                <a>
                                    Leo Developer.
                                </a>
                            </Link>
                        </p>
                        <p className="text-gray-200 mt-2 leading-4">
                            Not affiliated with Discord.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-200">
                            Docs
                        </h3>
                        <div className="flex flex-col gap-2 mt-4 md:gap-0 md:mt-0">
                            <Link href="/quickstart">
                                <a className="hover:underline">Quick Start</a>
                            </Link>
                            <Link href="/docs">
                                <a className="hover:underline">Documentation</a>
                            </Link>
                            <Link href="/what">
                                <a className="hover:underline">What?</a>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm text-gray-200">
                            Legal
                        </h3>
                        <div className="flex flex-col gap-2 mt-4 md:gap-0 md:mt-0">
                            <Link href="/privacy">
                                <a className="hover:underline">Privacy Policy</a>
                            </Link>
                            <Link href="/impressum">
                                <a className="hover:underline">Impressum</a>
                            </Link>
                            <Link href="/discord">
                                <a className="hover:underline">Contact (discord)</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
