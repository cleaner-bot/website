
import Link from "next/link";
import Head from "next/head";
import { ArrowRightIcon } from "@heroicons/react/outline";


export default function What() {
    return (
        <div className="-container">
            <Head>
                <title>What? Why? What now? Help?</title>
                <meta property="og:title" content="The Cleaner - What? Why? What now? Help?" />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="A Captcha? What? Why? What now? Help?" />
            </Head>
            <article>
                <h1>
                    What?
                </h1>
                <p>
                    You are required to prove that you are human.
                    Click the "I am human" button to begin.
                </p>
                <h2>
                    Why?
                </h2>
                <p>
                    The most common reasons for a challenge are:
                </p>
                <ol>
                    <li>
                        The server has requested that new members prove they're human.
                    </li>
                    <li>
                        Your behavior has been deemed to be bot-like or inappropriate.
                    </li>
                    <li>
                        Unnormal join or message rate (burst/flood)
                    </li>
                </ol>
                <p>
                    This is a non-exhaustive list, there are many more factors that determine if you have to solve a challenge or not.
                </p>

                <h2>
                    What now? And how?
                </h2>
                <ol>
                    <li>
                        Press the <code>`I am human`</code> button.
                    </li>
                    <li>
                        If the bot answers with "You have been verified", you are done!
                    </li>
                    <li>
                        Click on the <code>`Solve CAPTCHA`</code> button link of the new message.
                    </li>
                    <li>
                        Complete the CAPTCHA on the website.
                    </li>
                    <li>
                        After completing, press the <code>`Submit CAPTCHA`</code> button.
                    </li>
                    <li>
                        Done!
                    </li>
                </ol>

                <h2>
                    Help?
                </h2>
                <p>
                    if you require assistance, you can join our <Link href="/discord"><a>Support Server</a></Link>.
                </p>
                <p>
                    <bold>
                        Staff will not be able to remove the Captcha challenge!
                    </bold>
                </p>
            </article>

            <Link href="/">
                <a className="-anim -btn bg-blue-500 hover:bg-blue-550 w-full md:w-96 my-32">
                    Back to the homepage
                    <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                </a>
            </Link>
        </div>
    )
}
