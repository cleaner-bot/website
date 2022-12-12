import clsx from "clsx";

import { Toggle } from "@/components/dash/ui.jsx";
import { OptionalUpgrade } from "./ui";

export function ToggleBlock({
    name,
    description,
    config,
    updateConfig,
    guildId,
    field,
    entitlement,
    entitlements,
    children,
    disabled,
}) {
    const inner = (
        <Toggle
            config={config}
            updateConfig={updateConfig}
            guildId={guildId}
            field={field}
            disabled={disabled}
        />
    );
    return (
        <BlockWithPanel
            name={name}
            description={description}
            panel={
                entitlement !== undefined ? (
                    <OptionalUpgrade
                        entitlements={entitlements}
                        guildId={guildId}
                        required={entitlement}
                    >
                        {inner}
                    </OptionalUpgrade>
                ) : (
                    inner
                )
            }
        >
            {children}
        </BlockWithPanel>
    );
}

export function PlainBlock({ name, description, children, className }) {
    return (
        <div
            className={clsx(
                "w-full border border-gray-550 rounded-lg px-8 py-4",
                className
            )}
        >
            {name && <h3 className="text-2xl font-medium">{name}</h3>}
            {description && (
                <div className="mt-2 mb-6 text-gray-300">{description}</div>
            )}
            {children}
        </div>
    );
}

export function BlockWithPanel({
    name,
    description,
    children,
    panel,
    className,
    small,
}) {
    return (
        <div
            className={clsx(
                "flex w-full border border-gray-550 rounded-lg flex-wrap lg:flex-nowrap",
                className
            )}
        >
            <div className="flex-auto px-8 py-4">
                {name && (
                    <h3 className="text-2xl font-medium break-all">{name}</h3>
                )}
                {description && (
                    <div className="mt-2 mb-6 text-gray-300">{description}</div>
                )}
                {children}
            </div>
            <div
                className={clsx(
                    "flex gap-2 flex-col sm:flex-row lg:flex-col items-center justify-center flex-none w-full border-t lg:w-64 w lg:border-t-0 lg:border-l border-gray-550",
                    small ? "p-4" : "px-12 py-6 lg:p-12"
                )}
            >
                {panel}
            </div>
        </div>
    );
}
