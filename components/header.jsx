
import Link from "next/link";
import Image from "next/image";

const headerLinks = [
    { name: "Documentation", href: "https://docs.cleanerbot.xyz/" },
    { name: "Blog", href: "https://docs.cleanerbot.xyz/blog/" },
    { name: "Discord", href: "/discord" },
];

export default function Header() {
    return (
        <div className="flex flex-wrap items-end justify-center h-10 gap-4 mt-4 overflow-hidden sm:justify-between gap-y-10">
            <h1 className="flex items-center justify-center h-full text-2xl font-extrabold hover:underline decoration-indigo-550 decoration-4 underline-offset-2">
                <Image
                    className="hidden w-8 h-8 mr-2 rounded-full md:inline-block"
                    src="/img/avatar@96x96.png"
                    width={96}
                    height={96}
                    alt=""
                />
                The Cleaner
            </h1>
            <div className="hidden gap-4 sm:flex">
                {headerLinks.map((x) => (
                    <Link
                        href={x.href}
                        key={x.href}
                        className="hover:underline"
                    >
                        {x.name}
                    </Link>
                ))}
            </div>
            <Link
                href="/dash"
                className="--btn --btn-primary --btn-3 !rounded-full"
            >
                Open Dashboard
            </Link>
        </div>
    );
}
