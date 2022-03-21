
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import Link from "next/link";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { Pro } from "@/components/featurelist.jsx";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";
import Footer from "@/components/footer.jsx";
import Features from "@/components/features.jsx";

const trustedBy = [
    { name: "Servers", count: "80+" },
    { name: "Users", count: "150,000+" },
]


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
            <div className="--container">
                <div className="flex flex-wrap justify-center mb-12">
                    <h1 className="flex-none px-2 text-5xl font-extrabold sm:text-6xl">
                        <Image className="hidden w-16 h-16 align-middle rounded-full md:inline-block" src="/img/avatar.png" width={256} height={256} alt="Avatar of The Cleaner." />
                        <span className="px-2 align-middle hover:border-b-4 border-b-indigo-600">
                            The Cleaner
                        </span>
                    </h1>
                    <div className="flex h-6 mt-2 space-x-2 md:mt-10">
                        <Link href="/dash">
                            <a className="inline-block px-1 align-bottom hover:border-b-2 border-b-indigo-600">
                                Dashboard
                            </a>
                        </Link>
                        <Link href="/discord">
                            <a className="inline-block px-1 align-bottom hover:border-b-2 border-b-indigo-600">
                                Discord
                            </a>
                        </Link>
                        <Link href="/docs/">
                            <a className="inline-block px-1 align-bottom hover:border-b-2 border-b-indigo-600">
                                Documentation
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                    <div className="m-auto">
                        <h2 className="text-5xl font-extrabold leading-10 text-center sm:text-left">
                            A bot built for keeping servers clean
                        </h2>
                        <p className="mt-6 text-gray-100">
                            The Cleaner is a Discord bot designed to keep your server clean by removing spam, phishing, and more!
                        </p>
                        <div className="my-4 space-y-1">
                            <Pro>
                                Spam detection within seconds.
                            </Pro>
                            <Pro>
                                Instant phishing link detection with the help of heuristics, a database of old links and shared knowledge between servers.
                            </Pro>
                            <Pro>
                                Enable Verification to filter out all bots.
                            </Pro>
                        </div>
                        <div className="grid gap-2 mt-2 md:grid-cols-2">
                            <InternalLink href="/dash">
                                Dashboard
                            </InternalLink>
                            <ExternalLink href="/discord">
                                Join the Discord
                            </ExternalLink>
                        </div>
                    </div>
                    <div className="m-auto">
                        <h2 className="text-5xl font-extrabold leading-10 text-center">
                            Trusted by the community
                        </h2>
                        <p className="mt-6 text-gray-100">
                            The Cleaner is trusted by many servers and users to keep their environment clean.
                        </p>
                        <p className="font-bold text-gray-300 hover:underline">
                            <Link href="/radar">
                                <a>
                                    Find the exact numbers and more statistics here.
                                </a>
                            </Link>
                        </p>
                        <div className="grid px-4 mt-12 text-center sm:grid-cols-2 sm:text-left">
                            {trustedBy.map(({ name, count }) => <div>
                                <p className="text-lg font-medium text-gray-350">{name}</p>
                                <p className="text-5xl font-extrabold text-blue-400">{count}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-gray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,80C384,43,480,21,576,32C672,43,768,85,864,122.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-gray-750">
                <div className="--container">
                    <Features />
                </div>
            </div>
            <div className="text-gray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,128L48,133.3C96,139,192,149,288,176C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <div className="--container" data-aos="fade-up">
                <h2 className="text-6xl font-bold leading-[3rem] text-center max-w-[30rem] lg:max-w-none mx-auto">
                    Start protecting <span className="text-blue-330">your server</span> now
                </h2>
                <InternalLink href="/dash" className="mx-auto max-w-[27rem] lg:max-w-[56rem] mt-12">
                    Dashboard
                </InternalLink>
            </div>
            <div className="mt-20 text-gray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,256L48,213.3C96,171,192,85,288,80C384,75,480,149,576,154.7C672,160,768,96,864,90.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-gray-750">
                <Footer className="--container" />
            </div>
        </>
    )
}
