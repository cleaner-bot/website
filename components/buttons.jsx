import {
    LinkIcon,
    ArrowTopRightOnSquareIcon,
    ArrowRightIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";

export function ExternalLink({ href, className, style, color, children }) {
    return (
        <Link href={href}>
            <a
                className={clsx(
                    "--btn",
                    style || "--btn-4",
                    color || "--btn-primary",
                    className
                )}
            >
                {children}
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-3 -mr-1" />
            </a>
        </Link>
    );
}

export function InternalLink({ href, className, style, color, children }) {
    return (
        <Link href={href}>
            <a
                className={clsx(
                    "--btn",
                    style || "--btn-4",
                    color || "--btn-primary",
                    className
                )}
            >
                {children}
                <ArrowRightIcon className="w-5 h-5 ml-3 -mr-1" />
            </a>
        </Link>
    );
}
