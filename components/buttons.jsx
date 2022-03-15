
import { LinkIcon, ExternalLinkIcon, ArrowRightIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Link from "next/link";


export function DefaultLink({ href, className, style, color, children }) {
    return (
        <Link href={href}>
            <a className={clsx("--btn", style || "--btn-4", color || "--btn-primary", className)}>
                {children}
                <LinkIcon className="w-5 h-5 ml-3 -mr-1" />
            </a>
        </Link>
    )
}


export function ExternalLink({ href, className, style, color, children }) {
    return (
        <Link href={href}>
            <a className={clsx("--btn", style || "--btn-4", color || "--btn-primary", className)}>
                {children}
                <ExternalLinkIcon className="w-5 h-5 ml-3 -mr-1" />
            </a>
        </Link>
    )
}


export function InternalLink({ href, className, style, color, children }) {
    return (
        <Link href={href}>
            <a className={clsx("--btn", style || "--btn-4", color || "--btn-primary", className)}>
                {children}
                <ArrowRightIcon className="w-5 h-5 ml-3 -mr-1" />
            </a>
        </Link>
    )
}
