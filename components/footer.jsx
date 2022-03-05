
import clsx from "clsx";
import Link from "next/link";

import Image from "@/components/image.jsx";


const footer = [
    {
        name: "Quick access",
        links: [
            { name: "Home", href: "/" },
            { name: "Dashboard", href: "/dash/" },
            { name: "Discord", href: "/discord" }
        ]
    },
    {
        name: "Features",
        links: [
            { name: "Anti Spam", href: "/docs/features#raid-protection" },
            { name: "Anti Phishing", href: "/docs/featuress#phishing-prevention" },
            { name: "Verification", href: "/docs/challenges" },
        ]
    },
    {
        name: "Information",
        links: [
            { name: "About & Team", href: "/docs/about/" },
            { name: "Documentation", href: "/docs/" },
            { name: "Blog", href: "/blog/" },
            { name: "Radar", href: "/radar/" },
            { name: "Status", href: "/status/" },
        ]
    }
]


export default function Footer({ className }) {
    return (
        <div className={clsx("grid grid-cols-3 lg:grid-cols-4 pb-10 gap-y-12", className)}>
            <div className="col-span-3 lg:col-span-1">
                <Image className="w-24 h-24 col-span-2 mx-auto rounded-full bg-gray-710" src="/img/avatar.png" alt="The Cleaner Logo" />
                <div className="flex justify-center gap-4 mt-2">
                    <Link href="/legal/terms">
                        <a className="hover:underline">Terms</a>
                    </Link>
                    <Link href="/legal/privacy">
                        <a className="hover:underline">Privacy</a>
                    </Link>
                    <Link href="/legal/impressum">
                        <a className="hover:underline">Impressum</a>
                    </Link>
                </div>
                <p className="mt-6 text-center text-gray-200">
                    Copyright &copy; 2021 - 2022
                </p>
                <Link href="https://github.com/le0developer">
                    <a className="block text-center hover:underline">
                        Leo Developer
                    </a>
                </Link>
            </div>
            {footer.map(foot => <div key={foot.name} className="mx-auto">
                <p className="text-sm text-gray-200">
                    {foot.name}
                </p>
                <div>
                    {foot.links.map(link => <Link href={link.href} key={link.href}>
                        <a className="block hover:underline">
                            {link.name}
                        </a>
                    </Link>)}
                </div>
            </div>)}
        </div>
    )
}