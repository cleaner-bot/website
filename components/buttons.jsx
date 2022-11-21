import { BoxArrowUpRight, ArrowRight } from "react-bootstrap-icons";
import clsx from "clsx";
import Link from "next/link";

export function ExternalLink({ href, className, style, color, children }) {
    return (
        <Link
            href={href}
            className={clsx(
                "--btn",
                style || "--btn-4",
                color || "--btn-primary",
                className
            )}
        >
            {children}
            <BoxArrowUpRight className="w-5 h-5 ml-3 -mr-1" />
        </Link>
    );
}

export function InternalLink({ href, className, style, color, children }) {
    return (
        <Link
            href={href}
            className={clsx(
                "--btn",
                style || "--btn-4",
                color || "--btn-primary",
                className
            )}
        >
            {children}
            <ArrowRight className="w-5 h-5 ml-3 -mr-1" />
        </Link>
    );
}
