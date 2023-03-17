import Link from "next/link";
import Image from "next/image";
import { Discord, EnvelopeFill, Github, Twitter } from "react-bootstrap-icons";

const footer = [
    {
        name: "Quick access",
        links: [
            { name: "Home", href: "/" },
            { name: "Dashboard", href: "/dash/" },
            { name: "Discord", href: "/discord" },
            { name: "Documentation", href: "https://docs.cleanerbot.xyz/" },
        ],
    },
    {
        name: "Features",
        links: [
            {
                name: "Anti Spam",
                href: "https://docs.cleanerbot.xyz/features/antispam/",
            },
            {
                name: "Anti Phishing",
                href: "https://docs.cleanerbot.xyz/features/automod/#phishing",
            },
            {
                name: "Verification",
                href: "https://docs.cleanerbot.xyz/verification/verification/",
            },
            {
                name: "Super Verification",
                href: "https://docs.cleanerbot.xyz/verification/super-verification/",
            },
            {
                name: "Anti Raid",
                href: "https://docs.cleanerbot.xyz/features/antiraid/",
            },
            {
                name: "Dehoisting",
                href: "https://docs.cleanerbot.xyz/features/namechecker/",
            },
        ],
    },
    {
        name: "Information",
        links: [
            {
                name: "About & Team",
                href: "https://docs.cleanerbot.xyz/misc/about/",
            },
            { name: "Global Statistics", href: "/statistics" },
            { name: "Blog", href: "https://docs.cleanerbot.xyz/blog/" },
            { name: "Status", href: "https://cleaner.instatus.com/" },
        ],
    },
    {
        name: "Contact",
        links: [
            {
                name: "hi@cleanerbot.xyz",
                href: "mailto:hi@cleanerbot.xyz",
                icon: EnvelopeFill,
            },
            { name: "Discord", href: "/discord", icon: Discord },
        ],
    },
];

const legal = [
    { name: "Terms", href: "https://docs.cleanerbot.xyz/legal/terms/" },
    { name: "Privacy", href: "https://docs.cleanerbot.xyz/legal/privacy/" },
    { name: "Impressum", href: "https://docs.cleanerbot.xyz/legal/impressum/" },
];

const social = [
    { icon: Discord, href: "/discord" },
    { icon: Github, href: "https://github.com/cleaner-bot" },
    { icon: Twitter, href: "https://twitter.com/leodeveloper2" },
];

export default function Footer() {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 lg:gap-y-0 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
                <Link
                    href="/"
                    className="block w-16 h-16 col-span-2 rounded-full bg-gray-710 hover:bg-gray-650 --anim"
                >
                    <Image
                        src="/img/avatar@96x96.png"
                        alt="The Cleaner Logo"
                        width={96}
                        height={96}
                    />
                </Link>
                <p className="my-4">
                    Keeping the world clean, one server at a time.
                </p>
                <p className="mt-2 text-gray-200">
                    Not affiliated with Discord
                </p>
                <div className="flex gap-4 my-4">
                    {social.map((link) => (
                        <Link href={link.href} key={link.href}>
                            <link.icon className="w-5 h-5 hover:text-gray-300 --anim" />
                        </Link>
                    ))}
                </div>
            </div>
            {footer.map((section) => (
                <div key={section.name} className="col-span-2 sm:col-span-1">
                    <p className="mb-2 text-sm text-gray-200">{section.name}</p>
                    <div className="flex flex-col">
                        {section.links.map((link) => (
                            <Link
                                href={link.href}
                                className="flex items-center gap-2 hover:underline "
                                key={link.href}
                            >
                                {link.icon && <link.icon className="w-5 h-5" />}
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex flex-wrap justify-between col-span-2 py-2 text-xs text-gray-300 border-t gap-x-8 gap-y-2 md:col-span-4 border-gray-550 lg:col-span-5">
                <p className="text-xs text-gray-300">
                    Copyright &copy; 2021 - 2023 &middot;{" "}
                    <Link
                        href="https://github.com/le0developer"
                        className="hover:underline"
                    >
                        Leo Developer
                    </Link>
                </p>
                <div className="flex gap-4">
                    {legal.map((link) => (
                        <Link
                            href={link.href}
                            key={link.href}
                            className="hover:underline"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
