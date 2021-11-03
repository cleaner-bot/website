
import { ArrowRightIcon, CheckIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Head from "next/head";

import Image from "@/components/image.jsx";


export default function Home() {
    return (
        <>
            <Head>
                <title>Mr. Clean - Keeps servers clean</title>
                <meta property="og:title" content="Mr. Clean - Keeps servers clean" />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="A bot built for keeping servers clean.\nStart protecting your server with Mr. Clean now!" />
            </Head>
            <div className="-container">
                <div className="flex justify-center mb-12">
                    <h1 className="text-6xl font-extrabold -heading">
                        <Image className="w-16 h-16 align-middle rounded-full inline" src="https://cdn.discordapp.com/avatars/823533449717481492/cc36bba21762e6822f22e75d5be68c78.png?size=256" />
                        <span className="align-middle px-2 hover:border-b-4 border-b-indigo-600">
                            Mr. Clean
                        </span>
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h2 className="text-5xl text-extrabold leading-10">
                            A bot built for keeping servers clean
                        </h2>
                        <p className="text-gray-100 mt-1">
                            Mr. Clean is a Discord bot designed to keep your server clean by removing spam, phishing, and more!
                        </p>
                        <div className="mt-2 space-y-1">
                            <FeatureList>
                                Raid detection within seconds.
                            </FeatureList>
                            <FeatureList>
                                Instant phishing link detection with the help of heuristics and a huge database.
                            </FeatureList>
                            <FeatureList>
                                Filter bots out with captchas.
                            </FeatureList>
                        </div>
                        <div className="grid gap-1 grid-cols-2 mt-2">
                            <Link href="/quickstart">
                                <a className="-btn -anim bg-blue-500 hover:bg-blue-550">
                                    Quick Start
                                    <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                                </a>
                            </Link>
                            <Link href="/discord">
                                <a className="-btn -anim bg-blue-500 hover:bg-blue-550">
                                    Join the Discord
                                    <ExternalLinkIcon className="h-6 w-6 inline ml-2" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="text-gray-400">
                        image here
                    </div>
                </div>
            </div>
            <div className="text-coolGray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,80C384,43,480,21,576,32C672,43,768,85,864,122.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-coolGray-750">
                <div className="-container">
                    <div className="grid md:grid-cols-2">
                        <div>
                            <h2 className="text-4xl text-bold leading-10">
                                Automatic Raid Prevention
                            </h2>
                            <p className="text-gray-100 mt-1">
                                Automatically detects raids and deploys on-the-fly rules to detect it.
                            </p>
                            <p className="text-gray-100">
                                Uses Discord's features whenever necessary:
                            </p>
                            <div className="space-y-1 mt-2">
                                <FeatureList>
                                    Automatic slowmode adjustments.
                                </FeatureList>
                                <FeatureList>
                                    Automatic adjustments of the Verification Level.
                                </FeatureList>
                                <FeatureList>
                                    Temporary lockdown of attack channel.
                                </FeatureList>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            image here
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2">
                        <div>
                            <h2 className="text-4xl text-bold leading-10">
                                Phishing Prevention
                            </h2>
                            <p className="text-gray-100">
                                Detects phishing links and automatically freezes the account until the owner recovers it.
                            </p>
                            <div className="space-y-1 mt-2">
                                <FeatureList>
                                    Huge database of already known domains.
                                </FeatureList>
                                <FeatureList>
                                    Smart heuristics for detecting new domains.
                                </FeatureList>
                                <FeatureList>
                                    Information exchange of new domains in real-time.
                                </FeatureList>
                            </div>
                            <p className="text-gray-100 mt-4">
                                Once phishing has been detected, the account will be issued a captcha that must be solved.
                            </p>
                            <p className="text-gray-100">
                                This ensures the account owner can regain access to the server once the account is recovered.
                            </p>
                        </div>
                        <div className="text-gray-400 md:order-first">
                            image here
                        </div>
                    </div>
                    <div className="mt-40 grid md:grid-cols-2">
                        <div>
                            <h2 className="text-4xl text-bold leading-10">
                                Captchas for anyone, anytime.
                            </h2>
                            <p className="text-gray-100">
                                Captchas can be disabled, but Mr. Clean will be forced to fallback to banning.
                            </p>
                            <div className="space-y-1 mt-2">
                                <FeatureList>
                                    Captcha on join.  <span className="text-sm text-gray-200 ml-2">(configurable)</span>
                                </FeatureList>
                                <FeatureList>
                                    Captcha when deemed necessary by Mr. Clean.
                                </FeatureList>
                            </div>
                        </div>
                        <div className="text-gray-400">
                            image here
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-coolGray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fill-opacity="1" d="M0,128L48,133.3C96,139,192,149,288,176C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <div className="-container">
                <h2 className="text-6xl font-bold leading-[3rem]">
                    Start protecting <span className="-highlight">your server</span> now.
                </h2>
                <Link href="/quickstart">
                    <a className="w-1/2 mt-6 -btn -anim bg-blue-500 hover:bg-blue-550">
                        Quick Start
                        <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                    </a>
                </Link>
            </div>
            <div className="-container mb-10 mt-[50vh] grid grid-cols-4">
                <div className="col-span-2">
                    <h3 className="text-3xl font-bold">
                        Mr. Clean
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
                    <p className="text-gray-200 leading-4">
                        Not affiliated with Mr. Clean by Procter and Gamble.
                    </p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-200">
                        Docs
                    </h3>
                    <div className="flex flex-col">
                        <Link href="/quickstart">
                            <a className="hover:underline">Quick Start</a>
                        </Link>
                        <Link href="/docs">
                            <a className="hover:underline">Full docs</a>
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm text-gray-200">
                        Legal
                    </h3>
                    <div className="flex flex-col">
                        <Link href="/privacy">
                            <a className="hover:underline">Privacy Policy</a>
                        </Link>
                        <Link href="/tos">
                            <a className="hover:underline">Terms</a>
                        </Link>
                        <Link href="/discord">
                            <a className="hover:underline">Contact (discord)</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

function FeatureList({ children }) {
    return (
        <div className="flex flex-nowrap">
            <CheckIcon className="w-6 h-6 inline text-emerald-400 mr-2 flex-none" />
            {children}
        </div>
    )
}
