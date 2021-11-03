
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Head from "next/head";


export default function Success() {
    return (
        <div className="mx-auto w-96 my-20 md:my-40">
            <Head>
                <title>Captcha solved successfully.</title>
                <meta property="og:title" content="Captcha solved successfully." />
                <meta property="og:type" content="article" />
                <meta proeprty="og:description" content="The captcha has been solved successfully and access has been granted." />
            </Head>

            <div className="bg-emerald-550 rounded py-1 px-2">
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
                <a className="-anim -btn bg-coolGray-800 hover:bg-emerald-600 mt-4">
                    <ArrowLeftIcon className="h-6 w-6 mr-2" />
                    Go back
                </a>
            </Link>
        </div>
    )
}
