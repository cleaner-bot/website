import Link from "next/link";

import { Pro } from "@/components/featurelist.jsx";
import {
    BoxArrowUpRight,
    People,
    BarChart,
    ShieldCheck,
    PersonPlus,
    Funnel,
    ShieldLock,
    Lock,
    PersonVcard,
    X,
    ClipboardCheck,
} from "react-bootstrap-icons";

const features = [
    {
        name: "Anti Spam",
        description: "Automatically detect and mitigate spam.",
        points: [
            "Detects all kinds of spam.",
            "Automatic adjustments to channel slowmode to slow spam down.",
        ],
        icon: ShieldCheck,
    },
    {
        name: "Auto Moderator",
        description: "Block unsocialized content in your server.",
        points: [
            "Protection against mass pings.",
            "Protection against Discord invites.",
            "Protection against broad pings. (@here and @everyone)",
            "Protection against Phishing. (see more below)",
            "Protection against certain selfbots.",
        ],
        icon: Funnel,
    },
    {
        name: "Phishing Protection",
        description:
            "Auto Moderator automatically detects phishing, malware and other malicious content.",
        points: [
            "Huge database of past phishing waves.",
            "Advanced heuristics for previously unknown domains.",
            "Using preview embeds to enhance detection",
        ],
        icon: X,
    },
    {
        name: "Anti Raid",
        description: "Automatically fight & mitigate raids",
        points: [
            "Fully automatic",
            "Handles big raids without fail",
            "Customizable limits",
        ],
        icon: People,
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/features/antiraid/",
            },
        ],
    },
    {
        name: "Verification",
        description: "Verification for new or bad behaving members.",
        points: [
            "Passthrough for aged accounts (can be disabled)",
            "In-discord CAPTCHAs (3x3 captcha, classification, text)",
            "External CAPTCHAs (hCaptcha, Turnstile)",
        ],
        icon: Lock,
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/verification/verification",
            },
        ],
    },
    {
        name: "Super Verification",
        description:
            "Verification using Discord's Moderation Level to prevent DMs while pending verification.",
        points: [
            "Prevents DMs while pending verification",
            "Prevents all automated raids",
            "Normal users unaffected by raids and can continue verifying",
            "Supports hCAPTCHA Verification",
        ],
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/verification/super-verification",
            },
        ],
        icon: ShieldLock,
    },
    {
        name: "Join Guard",
        description: "Say goodbye to normal invites and bots.",
        points: [
            "Users join the server using the website",
            "Bots get blocked on the website directly",
            "Supports hCAPTCHA Verification",
        ],
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/verification/joinguard",
            },
        ],
        icon: PersonPlus,
    },
    {
        name: "Name Checker",
        description: "Checks the names of your users.",
        points: [
            "Automatic de-hoisting.",
            "Kicks accounts impersonating Discord",
            // "Blacklist content of usernames",
        ],
        icon: PersonVcard,
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/features/namechecker/",
            },
        ],
    },
    {
        name: "Link Filter",
        description: "Checks all links send by users.",
        points: ["Custom whitelist and blacklist.", "Block unknown links."],
        icon: ClipboardCheck,
        links: [
            {
                name: "Documentation",
                href: "https://docs.cleanerbot.xyz/features/linkfilter/",
            },
        ],
    },
    {
        name: "Statistics",
        description: "",
        points: [
            "Per-server statistics",
            "Per-user statistics (all servers you can manage)",
            "Global statistics",
        ],
        icon: BarChart,
        links: [
            { name: "Per-server", href: "/dash#/statistics" },
            { name: "Per-user", href: "/dash#statistics" },
            { name: "Global Statistics", href: "/statistics" },
        ],
    },
];

export default function Features() {
    return (
        <div className="grid gap-10 lg:grid-cols-2">
            {features.map((feat) => (
                <div data-aos="fade-up" key={feat.name}>
                    <h2 className="flex mb-4 text-4xl font-bold leading-10">
                        {feat.icon && <feat.icon className="w-10 h-10 mr-2" />}
                        {feat.name}
                    </h2>
                    <div className="text-gray-100">{feat.description}</div>
                    <div className="my-4 space-y-1">
                        {feat.points.map((point) => (
                            <Pro key={point}>{point}</Pro>
                        ))}
                    </div>
                    {feat.links && (
                        <p className="flex flex-wrap gap-4">
                            {feat.links.map((link) => (
                                <Link
                                    href={link.href}
                                    key={link.href}
                                    className="flex items-center text-blue-300 hover:underline"
                                >
                                    <BoxArrowUpRight className="w-5 h-5 mr-2" />
                                    {link.name}
                                </Link>
                            ))}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
