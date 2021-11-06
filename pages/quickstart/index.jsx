
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, ScaleIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";


export default function Quickstart() {
    const [currentStep, setCurrentStep] = useState("1-invite");
    const StepFn = steps[currentStep];
    return (
        <div className="-container mt-20">
            <Head>
                <title>Mr. Clean - Quick Start</title>
                <meta property="og:title" content="Mr. Clean - Quick Start" />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Quick Start for Mr. Clean. Setup powerful protection for your server in minutes!" />
            </Head>

            <h1 className="text-3xl text-center md:text-5xl md:text-left font-bold mb-16">
                Quick Start with Mr. Clean
            </h1>
            <StepFn setCurrentStep={setCurrentStep} />
        </div>
    )
}

function StepBar({ setCurrentStep, previous, next, skip }) {
    return (
        <div className="flex flex-row-reverse my-16">
            {next ? <button className={clsx(
                "-anim -btn hover:bg-coolGray-750 gap-2 w-40",
                skip ? "hover:bg-coolGray-750" : "bg-emerald-500 hover:bg-emerald-620"
            )} onClick={() => {
                setCurrentStep(next);
            }}>
                {skip ? "Skip" : "Next"}
                <ChevronRightIcon className="w-4 h-4 inline" />
            </button> : <div className="w-40" />}
            {previous ? <button className="-anim -btn hover:bg-coolGray-750 gap-2 w-40" onClick={() => {
                setCurrentStep(previous);
            }}>
                <ChevronLeftIcon className="w-4 h-4 inline" />
                Previous
            </button> : <div className="w-40" />}
        </div>
    );
}

const steps = {
    "1-invite": function InviteStep({ setCurrentStep }) {
        const [skip, setSkip] = useState(true);
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    1. Invite Mr. Clean
                </h2>
                <button className="-anim -btn w-60 bg-blue-500 hover:bg-blue-550" onClick={() => {
                    const popup = window.open("https://discord.com/oauth2/authorize?client_id=823533449717481492&scope=applications.commands%20bot&permissions=27652", "botinvitepopup", "width=500,height=776,left=100,top=100");
                    const timer = setInterval(() => {
                        if(popup.closed) {
                            clearInterval(timer);
                            setSkip(false);
                        }
                    }, 100)
                }}>
                    Invite Mr. Clean
                </button>
                <h3 className="text-xl font-semibold mt-8 mb-2">
                    Permission info:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div>
                        <h4 className="font-bold">
                            Ban members
                        </h4>
                        <p className="text-gray-200">
                            Required for... banning members.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Send / Read messages + Embed links
                        </h4>
                        <p className="text-gray-200">
                            Required for analyzing messages and interacting with the server.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage messages
                        </h4>
                        <p className="text-gray-200">
                            Required for deleting messages.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage server
                        </h4>
                        <p className="text-gray-200">
                            Required for automatic adjustments of Verification Level.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage channels
                        </h4>
                        <p className="text-gray-200">
                            Required for automatic adjustments of slowmode and lockdown.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage roles
                        </h4>
                        <p className="text-gray-200">
                            Required for captcha challenge of users.
                        </p>
                    </div>
                </div>
                <StepBar setCurrentStep={setCurrentStep} next="2-captcha" skip={skip} />
            </>
        )
    },
    "2-captcha": function CaptchaStep({ setCurrentStep }) {
        const [member, setMember] = useState(undefined);
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    2. Captcha Setup
                </h2>
                <div className="border-yellow-500 border-2 rounded-md bg-yellow-300 bg-opacity-30 px-2 py-0.5 my-2">
                    <p>
                        If you don't want to setup captcha, you can skip this step!
                    </p>
                    <p>
                        Mr. Clean will ban instead of issuing a captcha.
                    </p>
                </div>
                <div className="mt-12">
                    Do you use a "Member" or "Verification required" role?
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p className="text-center text-xl underline">
                                Member
                            </p>
                            <div className="mb-2">
                                <Contra>
                                    Every member who joins has to solve a captcha.
                                </Contra>
                                <Contra>
                                    Every member has one role.
                                </Contra>
                                <Contra>
                                    Interferes with guild-wide Verification Level.
                                </Contra>
                            </div>
                        </div>
                        <div>
                            <p className="text-center text-xl underline">
                                Verification Required
                            </p>
                            <div className="mb-2">
                                <Pro>
                                    Members do not have any unneeded roles.
                                </Pro>
                                <Pro>
                                    Better for read-only access. (without causing conflicts with your muted role)
                                </Pro>
                                <Pro>
                                    Does not interfere with guild-wide Verification Level.
                                </Pro>
                            </div>
                            If using captcha on join:
                            <div>
                                <Contra>
                                    Bot has to give the role to everyone who joins immediately.
                                </Contra>
                                <Contra>
                                    If the bot has an outage, new joiners can immediately access the server.
                                </Contra>
                            </div>
                            If not using captcha on join:
                            <div>
                                <Pro>
                                    Users aren't annoyed by captchas unless they misbehave.
                                </Pro>
                            </div>
                        </div>
                        <button className={clsx(
                            "-anim -btn",
                            member === true ? "ring ring-emerald-550 hover:bg-emerald-550" : "ring-2 ring-coolGray-750 hover:bg-coolGray-750"
                        )} onClick={() => setMember(member === true ? undefined : true)}>
                            {member === true ? "Selected" : "Select"}
                        </button>
                        <button className={clsx(
                            "-anim -btn",
                            member === false ? "ring ring-emerald-500 hover:bg-emerald-550" : "ring-2 ring-coolGray-750 hover:bg-coolGray-750"
                        )} onClick={() => setMember(member === false ? undefined : false)}>
                            {member === false ? "Selected" : "Select"}
                        </button>
                    </div>
                </div>
                {member !== undefined && <article className="mt-8">
                    <h3>
                        Channel Setup
                    </h3>
                    <ol>
                        <li>
                            Create a channel (something like <code>#verify</code>)
                        </li>
                        <li>
                            Create the <code>{member ? "Member" : "Verification required"}</code> role.
                        </li>
                        <li>
                            Run the following command: <code>/config verify set #verify {member ? "@Member" : "@Verification required"} {member ? "give" : "take"}</code>
                        </li>
                        <li>
                            Revoke the <code>{member ? "View Channel" : "Send Messages"}</code> permission for <code>{member ? "Member" : "Verification required"}</code> in every public channel.
                        </li>
                    </ol>
                    <p>
                        <bold>Congratulations!</bold>{" "}
                        Captcha verification is now setup properly!
                    </p>
                    {!member && <>
                        <h3>
                            Bonus: Captcha on join
                        </h3>
                        <ol>
                            <li>
                                Run the following command: <code>/config verify join enable</code>
                            </li>
                            <li>
                                That's it!
                            </li>
                        </ol>
                    </>}
                </article>}
                <StepBar setCurrentStep={setCurrentStep} previous="1-invite" next="3-mod" skip={member === undefined} />
            </>
        )
    },
    "3-mod": function ModStep({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    3. Moderation Setup
                </h2>
                <article>
                    <h3>
                        3.1 Add Moderator roles
                    </h3>
                    <p>
                        You can add Moderator roles using the following command.
                        Mr. Clean will ignore Moderators and they will be able to use moderation commands.
                    </p>
                    <p>
                        <code>
                            /config modrole add @Moderator
                        </code>
                    </p>
                    <p>
                        You can also remove Moderator roles:
                    </p>
                    <p>
                        <code>
                            /config modrole remove @Moderator
                        </code>
                    </p>

                    <h3>
                        3.2 Add logging channel
                    </h3>
                    <p>
                        All log events will be sent into the channel you specify with the command below.
                    </p>
                    <p>
                        <code>
                            /config logging set #bot-log
                        </code>
                    </p>
                    <p>
                        You can also disable logging with <code>/config logging reset</code>
                    </p>
                </article>
                <StepBar setCurrentStep={setCurrentStep} previous="2-captcha" next="4-exceptions" />
            </>
        )
    },
    "4-exceptions": function RulesStep({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    4. Exceptions
                </h2>
                <p>
                    If you have a <code>#bot-spam</code> channel that is literally only used for spam, you can add an exception for that channel which will increase the threshold needed for activating raid prevention.
                </p>
                <p>
                    Exceptions don't disable the protection! It'll just make it harder to trigger.
                </p>
                <article>
                    You can use <code>/config exception add #bot-spam</code> to add an exception and <code>/config exception remove #bot-spam</code>.
                </article>
                <StepBar setCurrentStep={setCurrentStep} previous="3-mod" next="5-done" />
            </>
        )
    },
    "5-done": function Done({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    5. Done
                </h2>
                <article>
                    <p>
                        You have completed the Quick Start guide of Mr. Clean!
                    </p>
                    <p>
                        Still have questions? Join the support server below and we'll try to help!
                    </p>
                </article>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Link href="/discord">
                        <a className="-anim -btn bg-blue-500 hover:bg-blue-550">
                            Support Server
                            <ExternalLinkIcon className="h-6 w-6 inline ml-2" />
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="-anim -btn bg-blue-500 hover:bg-blue-550">
                            Back to the homepage
                            <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                        </a>
                    </Link>
                    <Link href="/docs">
                        <a className="-anim -btn bg-blue-500 hover:bg-blue-550">
                            Read the docs
                            <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                        </a>
                    </Link>
                </div>
                <StepBar setCurrentStep={setCurrentStep} previous="4-exceptions" />
            </>
        )
    }
}


function Pro({ children }) {
    return (
        <div className="flex flex-nowrap">
            <CheckIcon className="w-6 h-6 inline text-emerald-400 mr-2 flex-none" />
            {children}
        </div>
    )
}
function Contra({ children }) {
    return (
        <div className="flex flex-nowrap">
            <XIcon className="w-6 h-6 inline text-red-400 mr-2 flex-none" />
            {children}
        </div>
    )
}
