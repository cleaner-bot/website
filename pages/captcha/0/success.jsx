
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/outline";
import { plus } from "hero-patterns";
import Link from "next/link";
import Head from "next/head";


export default function Success() {
    return (
        <div style={{backgroundImage: plus("9c92ac", 0.4)}}>
            <div className="mx-auto w-[303px] min-h-screen py-20 md:py-40">
                <Head>
                    <title>Captcha solved successfully.</title>
                    <meta property="og:title" content="Captcha solved successfully." />
                    <meta property="og:type" content="article" />
                    <meta proeprty="og:description" content="The captcha has been solved successfully and access has been granted." />
                </Head>

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
        </div>
    )
}
