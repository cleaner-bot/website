
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";

import MetaTags from "@/components/metatags.jsx";
import { Pro, Contra } from "@/components/featurelist.jsx";
import Image from "@/components/image.jsx";


export default function Quickstart() {
    const [currentStep, setCurrentStep] = useState("1-invite");
    const StepFn = steps[currentStep];
    return (
        <div className="-container mt-20">
            <MetaTags
                title="The Cleaner - Quick Start"
                description="Quick Start for The Cleaner. Setup powerful protection for your server in minutes!"
            />

            <h1 className="text-3xl text-center md:text-5xl md:text-left font-bold mb-16">
                Quick Start with The Cleaner
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
                    1. Invite The Cleaner
                </h2>
                <button className="-anim -btn w-60 bg-blue-580 hover:bg-blue-630" onClick={() => {
                    const isMobile = "ontouchstart" in window;
                    const invite = "https://discord.com/oauth2/authorize?client_id=823533449717481492&scope=applications.commands%20bot&permissions=402664502";
                    if(isMobile) {
                        window.open(invite, "_blank");
                        setSkip(false);
                    }
                    else {
                        const popup = window.open(invite, "botinvitepopup", "width=500,height=776,left=100,top=100");
                        const timer = setInterval(() => {
                            if(popup.closed) {
                                clearInterval(timer);
                                setSkip(false);
                            }
                        }, 100)
                    }
                }}>
                    Invite The Cleaner
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
                            Required for banning members if you do not have verification setup or are using the{" "}
                            <code>
                                <Link href="/docs/commands/#rules-banwave">
                                    <a className="hover:underline">
                                        /rules banwave
                                    </a>
                                </Link>
                            </code>
                            {" "} command.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Kick members
                        </h4>
                        <p className="text-gray-200">
                            Required for auto kick of unnatural joins.
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
                            Required for automatic adjustments of Server Verification Level.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage channels
                        </h4>
                        <p className="text-gray-200">
                            Required for{" "}
                            <Link href="/docs/features/#automatic-slow-mode">
                                <a className="hover:underline">
                                    automatic adjustments of slow mode
                                </a>
                            </Link>
                            .
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage roles
                        </h4>
                        <p className="text-gray-200">
                            Required for 
                            {" "}
                            <Link href="/docs/captchas/">
                                <a className="hover:underline">
                                    human verification of users
                                </a>
                            </Link>
                            .
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">
                            Manage nicknames
                        </h4>
                        <p className="text-gray-200">
                            Required for the{" "}
                            <Link href="/docs/features/#automatic-de-hoisting">
                                <a className="hover:underline">
                                    de-hoisting feature
                                </a>
                            </Link>
                            .
                        </p>
                    </div>
                </div>
                <p className="mt-6 text-sm text-gray-100">
                    You can read the{" "}
                    <Link href="/docs/">
                        <a className="hover:underline">
                            Documentation
                        </a>
                    </Link>
                    {" "}for more information about each feature.
                    Some features are purposedly not very well or not at all documented, so that they cannot be bypassed.
                </p>
                <StepBar setCurrentStep={setCurrentStep} next="2-challenge" skip={skip} />
            </>
        )
    },
    "2-challenge": function ChallengeStep({ setCurrentStep }) {
        const [useVerification, setUserVerification] = useState(undefined);
        const [member, setMember] = useState(undefined);
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    2. Human verification Setup
                </h2>

                <p>
                    What should happen when people are issued a challenge?
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className={clsx(
                        "-anim -btn",
                        useVerification === true ? "ring ring-emerald-550 hover:bg-emerald-550" : "ring-2 ring-coolGray-750 hover:bg-coolGray-750"
                    )} onClick={() => setUserVerification(useVerification === true ? undefined : true)}>
                        CAPTCHA Verification
                    </button>
                    <button className={clsx(
                        "-anim -btn",
                        useVerification === false ? "ring ring-emerald-500 hover:bg-emerald-550" : "ring-2 ring-coolGray-750 hover:bg-coolGray-750"
                    )} onClick={() => setUserVerification(useVerification === false ? undefined : false)}>
                        Ban
                    </button>
                </div>
                
                {useVerification === true && <>
                    <div className="mt-12">
                        Do you use a "Member" or "Verification required" role?
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <p className="text-center text-xl underline">
                                    Member
                                </p>
                                <div className="mb-2">
                                    <Contra>
                                        Every member who joins has to verify they are human.
                                    </Contra>
                                    <Contra>
                                        Every member has one role.
                                    </Contra>
                                    <Contra>
                                        Interferes with guild-wide Verification Level.
                                    </Contra>
                                    <Pro>
                                        If The Cleaner has an outage, new members don't have immediately access to the server.
                                    </Pro>
                                </div>
                            </div>
                            <button className={clsx(
                                "-anim -btn md:order-2",
                                member === true ? "ring ring-emerald-550 hover:bg-emerald-550" : "ring-2 ring-coolGray-750 hover:bg-coolGray-750"
                            )} onClick={() => setMember(member === true ? undefined : true)}>
                                {member === true ? "Selected" : "Select"}
                            </button>
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
                                If using Verification on join:
                                <div>
                                    <Contra>
                                        The Cleaner has to give the role to everyone who joins immediately.
                                    </Contra>
                                    <Contra>
                                        If The Cleaner has an outage, new joiners can immediately access the server.
                                    </Contra>
                                </div>
                                If not using Verification on join:
                                <div>
                                    <Pro>
                                        Users aren't annoyed by CAPTCHAs unless they misbehave.
                                    </Pro>
                                </div>
                            </div>
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
                                Run the following command: <code>/config verify set #verify {member ? "give" : "take"} {member ? "@Member" : "@Verification required"}</code>
                            </li>
                            <li>
                                Revoke the <code>{member ? "View Channel" : "Send Messages"}</code> permission for <code>{member ? "Member" : "Verification required"}</code> in every public channel.
                            </li>
                        </ol>
                        <p>
                            <bold>Congratulations!</bold>{" "}
                            Human verification is now setup!
                        </p>
                        <p>
                            You can use{" "}
                            <code>
                                <Link href="/docs/commands/#diagnose">
                                    <a>
                                        /diagnose
                                    </a>
                                </Link>
                            </code>
                            {" "}to check if you set all permissions correctly!
                        </p>
                        {!member && <>
                            <h3>
                                Bonus: Verification on join
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
                </>}
                {useVerification === false && <>
                    <p className="mt-12">
                        Nothing to setup! That's the default!
                    </p>
                </>}
                <StepBar setCurrentStep={setCurrentStep} previous="1-invite" next="3-mod" skip={member === undefined && useVerification !== false} />
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
                        To make sure The Cleaner ignores your moderators, you have to tell us who your moderators are.
                        You use the{" "}
                        <code>
                            <Link href="/docs/commands/#config-modrole-add">
                                <a>
                                    /config modrole add
                                </a>
                            </Link>
                        </code>
                        {" "}command for that!
                    </p>
                    <p>
                        <code>
                            /config modrole add @Moderator
                        </code>
                    </p>
                    <p>
                        You can also remove moderator roles:
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
                        The Cleaner wants to tell you what he does, but he doesn't know where to put it.
                        Tell us by using the following command:
                    </p>
                    <p>
                        <code>
                            /config logging set #bot-log
                        </code>
                    </p>
                    <p>
                        You can also disable logging with <code>/config logging reset</code>
                    </p>
                    <h3>
                        3.3 Mark channels as exception
                    </h3>

                    <p>
                        In some servers there are spam channels that are purely for spam.
                        The Cleaner doesn't know that and will try to fight the spam.
                    </p>
                    <p>
                        So, if you have a <code>#spam</code> channel that is literally only used for spam, mark that channel as an exception.
                        The Cleaner will then only intervene when it gets really severe.
                    </p>
                    <p>
                        <code>/config exception add #spam</code>
                    </p>
                    <p>
                        Changed your mind?
                    </p>
                    <p>
                        <code>/config exception remove #spam</code>
                    </p>
                    <p className="mt-10">
                        Exceptions don't disable the protection! It'll just make it harder to trigger.
                    </p>
                </article>
                <StepBar setCurrentStep={setCurrentStep} previous="2-challenge" next="4-linkchecker" />
            </>
        )
    },
    "4-linkchecker": function RulesStep({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    4. Link Checker
                </h2>
                <article>
                    <p>
                        <bold>
                            The Link Checker is 100% optional.
                        </bold>
                        You can just go straight to the next topic if you don't want Link Checker.
                    </p>
                    <p>
                        If you enable the Link Checker, every time someone sends a message with a link, the link will be re-sent in your logging channel.
                        You can then decide to white- or blacklist the domain or to blacklist only that exact url.
                    </p>
                    <p className="mt-4">
                        Use the following command to enable Link Checker: (you must have a logging channel setup)
                    </p>
                    <p>
                        <code>/config linkchecker enable</code>
                    </p>
                    <Image src="/img/home/feature_link_checker.png" className="w-full md:w-auto" width={415} height={225} alt="Image of a 'new link spotted' logging message" />
                </article>
                <StepBar setCurrentStep={setCurrentStep} previous="3-mod" next="5-rules" />
            </>
        )
    },
    "5-rules": function Rules({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    5. Rules TL;DR
                </h2>
                <Link href="/docs/commands/#rules">
                    <a className="-anim -btn md:w-96 bg-blue-580 hover:bg-blue-630">
                        Not TL;DR version <ArrowRightIcon className="w-6 h-6 ml-2" />
                    </a>
                </Link>
                <article>
                    <h3>
                        5.1 Disable a rule
                    </h3>
                    <p>
                        Want to allow discord invites but messages keep getting deleted because of <code>advertisement.discord</code>?
                        Just disable that rule!
                    </p>
                    <p>
                        <code>/rules disable add advertisement.discord</code>
                    </p>
                    <p>
                        Changed your mind?
                    </p>
                    <p>
                        <code>/rules disable remove advertisement.discord</code>
                    </p>
                </article>
                <StepBar setCurrentStep={setCurrentStep} previous="4-linkchecker" next="6-done" />
            </>
        )
    },
    "6-done": function Done({ setCurrentStep }) {
        return (
            <>
                <h2 className="text-3xl font-semibold mb-8">
                    6. Done
                </h2>
                <article>
                    <p>
                        <bold>Congratulations!</bold>{" "}
                        You have completed the Quick Start guide of The Cleaner!
                    </p>
                    <h3>
                        5.1 Still issues?
                    </h3>
                    <p>
                        Run the{" "}
                        <code>
                            <Link href="/docs/commands/#diagnose">
                                <a>
                                    /diagnose
                                </a>
                            </Link>
                        </code>
                        {" "}command and The Cleaner will detect common issues and tell you about them.
                    </p> 
                    <p>
                        Didn't help? Join the Support Server below and we'll try to help!
                    </p>
                </article>
                <Link href="/discord">
                    <a className="-anim -btn bg-blue-580 hover:bg-blue-630 w-full lg:w-96 mt-4">
                        Support Server
                        <ExternalLinkIcon className="h-6 w-6 inline ml-2" />
                    </a>
                </Link>
                <div className="grid grid-cols-1 gap-2 mt-8 w-full lg:w-96">
                    <Link href="/">
                        <a className="-anim -btn bg-blue-580 hover:bg-blue-630">
                            Back to the homepage
                            <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                        </a>
                    </Link>
                    <Link href="/docs">
                        <a className="-anim -btn bg-blue-580 hover:bg-blue-630">
                            Read the docs
                            <ArrowRightIcon className="h-6 w-6 inline ml-2" />
                        </a>
                    </Link>
                </div>
                <StepBar setCurrentStep={setCurrentStep} previous="5-rules" />
            </>
        )
    }
}
