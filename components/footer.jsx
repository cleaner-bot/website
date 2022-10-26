import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const footer = [
    {
        name: "Quick access",
        links: [
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
            { name: "About & Team", href: "/docs/about/" },
            { name: "Global Statistics", href: "/statistics" },
            { name: "Blog", href: "https://blog.cleanerbot.xyz" },
            { name: "Status", href: "https://cleaner.instatus.com/" },
        ],
    },
];

export default function Footer({ className }) {
    return (
        <div
            className={clsx(
                "grid grid-cols-3 lg:grid-cols-4 pb-10 gap-y-12",
                className
            )}
        >
            <div className="col-span-3 lg:col-span-1">
                <Link
                    href="/"
                    className="block w-24 h-24 col-span-2 mx-auto rounded-full bg-gray-710 hover:bg-gray-650 --anim"
                >
                    <Image
                        src="/img/avatar@96x96.png"
                        alt="The Cleaner Logo"
                        width={96}
                        height={96}
                    />
                </Link>
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="https://docs.cleanerbot.xyz/legal/terms" className="hover:underline">
                        Terms
                    </Link>
                    <Link href="https://docs.cleanerbot.xyz/legal/privacy/" className="hover:underline">
                        Privacy
                    </Link>
                    <Link href="https://docs.cleanerbot.xyz/legal/impressum/" className="hover:underline">
                        Impressum
                    </Link>
                </div>
                <p className="mt-6 text-center text-gray-200">
                    Copyright &copy; 2021 - 2022
                </p>
                <Link
                    href="https://github.com/le0developer"
                    className="block text-center hover:underline"
                >
                    Leo Developer
                </Link>
                <p className="mt-2 text-center text-gray-200">
                    Not affiliated with Discord
                </p>
            </div>
            {footer.map((foot) => (
                <div key={foot.name} className="mx-auto">
                    <p className="mb-2 text-sm text-gray-200">{foot.name}</p>
                    <div>
                        {foot.links.map((link) => (
                            <Link 
                                href={link.href}
                                className="block hover:underline"
                                key={link.href}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
