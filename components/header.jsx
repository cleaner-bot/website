import Link from "next/link";
import Image from "next/image";

const headerLinks = [
    { name: "Documentation", href: "https://docs.cleanerbot.xyz/" },
    { name: "Blog", href: "https://docs.cleanerbot.xyz/blog/" },
    { name: "Discord", href: "/discord" },
];

export default function Header() {
    return (
        <div className="flex items-center justify-center gap-4 py-4 border-b border-gray-550">
            <Link
                href="/"
                className="flex items-center justify-center h-full text-2xl font-extrabold hover:underline decoration-indigo-550 decoration-4 underline-offset-2 sm:mr-12"
            >
                <Image
                    className="inline-block w-8 h-8 mr-2 rounded-full sm:hidden md:inline-block"
                    src="/img/avatar@96x96.png"
                    width={96}
                    height={96}
                    alt=""
                />
                The Cleaner
            </Link>
            <div className="hidden gap-4 sm:flex">
                {headerLinks.map((x) => (
                    <Link
                        href={x.href}
                        key={x.href}
                        className="--btn hover:bg-gray-550 --btn-3"
                    >
                        {x.name}
                    </Link>
                ))}
            </div>
            <div className="hidden ml-auto sm:block">
                <Link
                    href="/dash"
                    className="--btn --btn-primary --btn-3 w-fit"
                >
                    Open Dashboard
                </Link>
            </div>
        </div>
    );
}
