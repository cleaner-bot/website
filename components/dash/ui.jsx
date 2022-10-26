import clsx from "clsx";
import Link from "next/link";
import { Dialog, Listbox, Switch } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

import plans from "@/lib/plans.js";
import { doChange, patchConfig } from "@/lib/api.js";

export function Checkbox({ enabled, setEnabled, onChange, labelOn, labelOff }) {
    return (
        <Switch.Group>
            <Switch
                checked={enabled}
                onChange={(new_state) => {
                    setEnabled(new_state);
                    onChange && onChange(new_state);
                }}
                className={clsx(
                    "--anim relative inline-flex items-center h-6 rounded-full w-11",
                    enabled ? "bg-blue-400" : "bg-gray-400"
                )}
            >
                <span
                    className={clsx(
                        "--anim inline-block w-4 h-4 transform bg-white rounded-full",
                        enabled ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </Switch>
            {((enabled && labelOn) || (!enabled && labelOff)) && (
                <Switch.Label className="ml-2 select-none">
                    {enabled ? labelOn : labelOff}
                </Switch.Label>
            )}
        </Switch.Group>
    );
}

export function Toggle({
    config,
    updateConfig,
    guildId,
    field,
    onToggle,
    disabled,
}) {
    const enabled = config[field];
    const [updating, setUpdating] = useState(false);
    return (
        <button
            className={clsx(
                "w-32 --btn --btn-3",
                enabled ? "--btn-success" : "--btn-destructive"
            )}
            disabled={disabled || updating}
            onClick={async () => {
                setUpdating(true);
                const success = await doChange(
                    patchConfig(guildId, { [field]: !enabled })
                );
                setUpdating(false);
                if (!success) return;
                updateConfig({ [field]: !enabled });
                if (onToggle) onToggle(!enabled);
            }}
        >
            {enabled ? "Enabled" : "Disabled"}
        </button>
    );
}

export function Slider({ value, setValue, minValue, maxValue, step }) {
    return (
        <input
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={value}
            onInput={(new_value) =>
                setValue(parseFloat(new_value.target.value))
            }
            className="w-full"
        />
    );
}

export function Upgrade({ plan, guildId }) {
    if (!plan || plan >= plans.length)
        return (
            <Link href={`/dash/${guildId}/contact`}>
                <a className="w-32 --btn --btn-3 --btn-primary">Contact us</a>
            </Link>
        );
    return (
        <Link href={`/dash/${guildId}/plan`}>
            <a className="min-w-[8rem] --btn --btn-3 --btn-primary">
                Upgrade to {plans[plan]}
            </a>
        </Link>
    );
}

export function OptionalUpgrade({ entitlements, guildId, required, children }) {
    if (required > entitlements.plan)
        return <Upgrade plan={required} guildId={guildId} />;
    return children || null;
}

export function Button({ text, onClick, disabled, color, className }) {
    return (
        <button
            className={clsx(
                "min-w-[8rem] --btn --btn-3",
                color ?? "--btn-primary",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export function TextInput({ value, setValue, className, ...props }) {
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={clsx(
                    "bg-gray-800 hover:bg-gray-750 focus:bg-gray-750 px-3 py-1 rounded-lg w-full disabled:cursor-not-allowed",
                    className
                )}
                spellCheck={false}
                {...props}
            />
        </>
    );
}
export function MultilineTextInput({
    placeholder,
    value,
    setValue,
    className,
    maxLength,
}) {
    return (
        <>
            <textarea
                value={value}
                placeholder={placeholder}
                onChange={(event) => setValue(event.target.value)}
                className={clsx(
                    "bg-gray-800 hover:bg-gray-750 focus:bg-gray-750 px-3 py-1 rounded-lg w-full",
                    className
                )}
                maxLength={maxLength}
            />
        </>
    );
}

export function Dropdown({ values, current, setCurrent, className }) {
    return (
        <Listbox
            value={current}
            onChange={setCurrent}
            className={clsx("relative", className)}
            as="div"
        >
            <Listbox.Button className="bg-gray-800 hover:bg-gray-750 px-3 py-0.5 w-full text-left rounded-lg">
                {values.find((x) => x.id === current)?.name || "Unselected"}
            </Listbox.Button>
            <Listbox.Options className="bg-gray-800 py-2 rounded-lg absolute z-20 top-[110%] w-full">
                {values.map((value) => (
                    <Listbox.Option
                        value={value.id}
                        disabled={value.disabled}
                        key={value.id}
                        as={Fragment}
                    >
                        {({ active, selected, disabled }) => (
                            <li
                                className={clsx(
                                    "px-3",
                                    selected && !active && "bg-gray-780",
                                    active && "bg-gray-750",
                                    disabled &&
                                        "text-gray-400 cursor-not-allowed"
                                )}
                            >
                                {value.name}{" "}
                                {typeof value.disabled === "string" && (
                                    <span className="italic">
                                        {value.disabled}
                                    </span>
                                )}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
}

export function DropdownSearch({
    placeholder,
    values,
    current,
    setCurrent,
    dontSetQuery,
}) {
    const [query, setQuery] = useState(
        values.find((x) => x.id === current)?.name || ""
    );
    const [isFocused, setFocused] = useState(false);
    return (
        <div className="relative">
            <TextInput
                placeholder={placeholder}
                value={query}
                setValue={setQuery}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 100)}
            />
            <div
                className={clsx(
                    "absolute z-20 top-[110%] bg-gray-800 w-full rounded-lg px-3 py-2 shadow",
                    !isFocused && "hidden"
                )}
            >
                {values
                    .filter(({ name }) => name.indexOf(query) !== -1)
                    .map(({ name, id }) => (
                        <button
                            className={clsx(
                                "block w-full text-left rounded px-2 py-0.5",
                                id === current
                                    ? "bg-coolGray-700"
                                    : "hover:bg-coolGray-700"
                            )}
                            onClick={() => {
                                setCurrent(id);
                                if (!dontSetQuery) setQuery(name);
                                // stop focusing
                                if (document.activeElement.blur)
                                    document.activeElement.blur();
                            }}
                            key={id}
                        >
                            {name}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export function MultiSelect({
    name,
    none,
    singular,
    placeholder,
    field,
    selection,
    guildId,
    config,
    updateConfig,
}) {
    return (
        <>
            <div className="flex flex-wrap gap-2 mb-2">
                {name}
                {config[field].length === 0 ? (
                    <span>{none}</span>
                ) : (
                    config[field].map((x) => (
                        <span
                            key={x}
                            className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800"
                        >
                            {selection.find((y) => x === y.id)?.name ||
                                `Deleted ${singular}: ${x}`}
                            <button
                                className="w-4 h-4 ml-2 text-gray-400"
                                onClick={async () => {
                                    const copy = [...config[field]];
                                    const index = copy.indexOf(x);
                                    if (index < 0) return;
                                    copy.splice(index, 1);
                                    const success = await doChange(
                                        patchConfig(guildId, { [field]: copy })
                                    );
                                    if (!success) return;
                                    updateConfig({ [field]: copy });
                                }}
                            >
                                <svg
                                    className="w-2 h-2 stroke-current"
                                    fill="none"
                                    viewBox="0 0 8 8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                        d="M1 1l6 6m0-6L1 7"
                                    />
                                </svg>
                            </button>
                        </span>
                    ))
                )}
            </div>
            <DropdownSearch
                placeholder={placeholder}
                values={selection.filter(
                    (x) => config[field].indexOf(x.id) === -1
                )}
                current=""
                setCurrent={async (value) => {
                    const copy = [...config[field]];
                    copy.push(value);
                    const success = await doChange(
                        patchConfig(guildId, { [field]: copy })
                    );
                    if (!success) return;
                    updateConfig({ [field]: copy });
                }}
                dontSetQuery={true}
            />
        </>
    );
}

export function Modal({ title, children, isOpen, setOpen, initialFocus }) {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            initialFocus={initialFocus}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="h-full md:flex md:justify-center md:items-center bg-opacity-90 backdrop-filter backdrop-blur-sm">
                <div className="bg-gray-730 rounded-lg w-full h-full md:w-[50vw] md:h-auto md:max-h-[50vh] md:pb-4 overflow-auto shadow-2xl">
                    {title && (
                        <Dialog.Title
                            as="p"
                            className="text-center bg-gray-800 rounded-t-lg px-4 py-0.5"
                        >
                            {title}
                        </Dialog.Title>
                    )}
                    {children}
                </div>
            </div>
        </Dialog>
    );
}

export function Unlocked() {
    return <div className="--btn --btn-3 bg-blue-580">Unlocked</div>;
}

export function Attention({ children, className }) {
    return (
        <div
            className={clsx(
                "w-full px-8 py-4 border rounded-lg border-yellow-550",
                className
            )}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="w-full ml-3">
                    <h3 className="mb-2 font-medium text-yellow-400">
                        Attention needed
                    </h3>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function HorizontalRule({ label, color, className }) {
    if (!label)
        return (
            <div className={clsx("h-1", color ?? "bg-gray-550", className)} />
        );
    return (
        <div className={clsx("flex items-center justify-center", className)}>
            <div className={clsx("flex-grow h-1", color ?? "bg-gray-550")} />
            <div className="px-4">{label}</div>
            <div className={clsx("flex-grow h-1", color ?? "bg-gray-550")} />
        </div>
    );
}
