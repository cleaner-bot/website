
import Link from "next/link";

import Image from "@/components/image.jsx";
import MetaTags from "@/components/metatags.jsx";
import { Pro, Restriction } from "@/components/featurelist.jsx";


export default function ProSite() {
    return (
        <div>
            <MetaTags
                title="Go Professionally Clean with The Cleaner!"
                description="Time to go professional. Support The Cleaner and unlock exclusive features!"
            />
            <div className="-container">
                <h1 className="text-6xl font-bold mt-8">
                    Require <span className="-highlight italic">Professional</span> Cleaning?
                </h1>
                <p className="mt-6">
                    Go <span className="-highlight">Pro</span> to Support The Cleaner and unlock exclusive features!
                </p>
                <p className="font-extrabold my-8">
                    NOT FINAL DESIGN. ALL OF THIS IS WIP AND MAY CHANGE AT ANY POINT.
                </p>
                {/*
                <div className="mt-40 grid md:grid-cols-2">
                    <div>
                        <FeatureList>
                            Multiple Cleaner Bots (bypass rate limits)  (WIP)
                        </FeatureList>
                    </div>
                    <div className="text-gray-400">
                        image here
                    </div>
                </div>
                */}
                <div className="mt-40 grid md:grid-cols-2 gap-y-10">
                    <div className="space-y-1 m-auto">
                        <Pro>
                            Customizable "Human verification required" embed
                        </Pro>
                        <Pro>
                            Custom delay before the human verification can be performed
                        </Pro>
                    </div>
                    <div className="text-gray-400 md:order-first">
                        <Image src="/img/pro/benefit_verify.png" className="w-full" width={667} height={268} />
                    </div>
                </div>
                <div className="mt-40 grid md:grid-cols-2 gap-y-10">
                    <div className="space-y-1 m-auto">
                        <Pro>
                            Custom Splash on the CAPTCHA sites
                        </Pro>
                        <Pro>
                            Custom Text on the CAPTCHA sites
                        </Pro>
                    </div>
                    <div className="text-gray-400">
                        image here
                    </div>
                </div>
                <div className="mt-40 grid md:grid-cols-2 gap-y-10">
                    <div className="space-y-1 m-auto">
                        <Pro>
                            1
                            <Link href="/docs/rules/#javascript-rules">
                                <a className="ml-1.5    hover:underline">
                                    Javascript Firewall rule
                                </a>
                            </Link>
                        </Pro>
                        <Restriction size="sm" className="text-gray-100">
                            CPU: 10ms per message
                        </Restriction>
                        <Restriction size="sm" className="text-gray-100">
                            RAM: 100kb
                        </Restriction>
                        <Restriction size="sm" className="text-gray-100">
                            Script size: 16kb
                        </Restriction>
                        <p className="text-sm mt-2">
                            Need more? Contact us in the Discord!
                        </p>
                    </div>
                    <div className="text-gray-400 md:order-first">
                        image here
                    </div>
                </div>
                <div className="mt-40 grid md:grid-cols-2 gap-y-10">
                    <div className="space-y-1 m-auto">
                        <Pro>
                            Exclusive role and support channels on Discord
                        </Pro>
                    </div>
                    <div className="text-gray-400 relative">
                        <Image src="/img/pro/benefit_discord1.png" className="w-full" width={421} height={290} />
                        <Image src="/img/pro/benefit_discord2.png" className="w-40 top-4 right-4 absolute rounded-lg" width={168} height={59} />
                    </div>
                </div>
            </div>
            <div className="text-coolGray-750">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="currentColor">
                    <path fillOpacity="1" d="M0,160L34.3,186.7C68.6,213,137,267,206,261.3C274.3,256,343,192,411,176C480,160,549,192,617,213.3C685.7,235,754,245,823,240C891.4,235,960,213,1029,186.7C1097.1,160,1166,128,1234,122.7C1302.9,117,1371,139,1406,149.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                </svg>
            </div>
            <div className="bg-coolGray-750 pb-20">
                <div className="-container">
                    <h2 className="text-6xl font-bold mb-6">
                        Time To Go <span className="-highlight italic">Professional</span>!
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-2 xl:w-1/2">
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
                </div>
            </div>
        </div>
    )
}
