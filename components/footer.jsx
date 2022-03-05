
import clsx from "clsx";
import Link from "next/link";

import Image from "@/components/image.jsx";


const footer = [
    {
        name: "Quick access",
        links: [
            { name: "Home", href: "/" },
            { name: "Dashboard", href: "/dash/" },
        ]
    },
    {
        name: "Features",
        links: [
            { name: "Anti Spam", href: "/features#antispam" },
            { name: "Anti Phishing", href: "/features#phishing" },
            { name: "Verification", href: "/features#verification" },
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
                    <Link href="/terms">
                        <a className="hover:underline">Terms</a>
                    </Link>
                    <Link href="/privacy">
                        <a className="hover:underline">Privacy</a>
                    </Link>
                    <Link href="/impressum">
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
                <div className="">
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


function FooterX({ className }) {
    return (
        <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10 xl:grid-cols-4 gap-y-12", className)}>
            <div>
                <Link href="/">
                    <a className="text-3xl font-bold hover:underline">
                        The Cleaner
                    </a>
                </Link>
                <p className="mt-1 text-gray-200">
                    Copyright &copy; 2021 - 2022
                </p>
                <p className="text-gray-200">
                    <Link href="https://leodev.xyz">
                        <a className="hover:underline text-whites">
                            Leo Developer
                        </a>
                    </Link>.
                </p>
                <p className="mt-2 text-gray-200">
                    Not affiliated with Discord.
                </p>
            </div>
            <div>
                <h3 className="text-sm text-gray-200">
                    Services
                </h3>
                <div className="flex flex-col gap-2 mt-4 md:gap-0 md:mt-0">
                    <Link href="/dash">
                        <a className="hover:underline">Dashboard</a>
                    </Link>
                    {/* <Link href="/docs/workers/">
                        <a className="hover:underline">Workers</a>
                    </Link> */}
                </div>
            </div>
            <div>
                <h3 className="text-sm text-gray-200">
                    Information
                </h3>
                <div className="flex flex-col gap-2 mt-4 md:gap-0 md:mt-0">
                    <Link href="/docs">
                        <a className="hover:underline">Documentation</a>
                    </Link>
                    <Link href="/blog">
                        <a className="hover:underline">Blog</a>
                    </Link>
                    <Link href="/status">
                        <a className="hover:underline">System Status</a>
                    </Link>
                    <Link href="/radar">
                        <a className="hover:underline">Radar</a>
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="text-sm text-gray-200">
                    Legal
                </h3>
                <div className="flex flex-col gap-2 mt-4 md:gap-0 md:mt-0">
                    <Link href="/privacy">
                        <a className="hover:underline">Privacy Policy</a>
                    </Link>
                    <Link href="/impressum">
                        <a className="hover:underline">Impressum</a>
                    </Link>
                    <Link href="/terms">
                        <a className="hover:underline">Terms of Use</a>
                    </Link>
                    <Link href="/discord">
                        <a className="hover:underline">Contact (Discord)</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
