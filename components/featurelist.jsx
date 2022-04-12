
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";

const sizes = {
    "sm": {icon: "h-5 w-5 mr-1.5", text: "text-sm"},
    "default": {icon: "h-6 w-6 mr-2", text: ""}
}



export function Pro({ children, size, className }) {
    return (
        <div className={clsx("flex flex-nowrap", sizes[size || "default"].text, className)}>
            <CheckIcon className={clsx("inline text-emerald-400 mr-2 flex-none", sizes[size || "default"].icon)} />
            {children}
        </div>
    )
}

export function Contra({ children, size, className }) {
    return (
        <div className={clsx("flex flex-nowrap", sizes[size || "default"].text, className)}>
            <XIcon className={clsx("inline text-red-400 mr-2 flex-none", sizes[size || "default"].icon)} />
            {children}
        </div>
    )
}

export function Restriction({ children, size, className }) {
    return (
        <div className={clsx("flex flex-nowrap", sizes[size || "default"].text, className)}>
            <XIcon className={clsx("inline text-gray-400 mr-2 flex-none", sizes[size || "default"].icon)} />
            {children}
        </div>
    )
}
