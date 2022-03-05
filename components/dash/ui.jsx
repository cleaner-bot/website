
import clsx from "clsx";
import Link from "next/link";
import { Dialog, Listbox, Switch } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

import plans from "@/lib/plans.js";
import { doChange, patchConfig } from "@/lib/api.js";


export function Checkbox({ enabled, setEnabled, onChange, labelOn, labelOff }) {
    return (
        <Switch.Group>
            <Switch
                checked={enabled}
                onChange={new_state => {
                    setEnabled(new_state);
                    onChange && onChange(new_state);
                }}
                className={clsx("--anim relative inline-flex items-center h-6 rounded-full w-11", enabled ? 'bg-blue-400' : 'bg-gray-400')}
            >
                <span className={clsx("--anim inline-block w-4 h-4 transform bg-white rounded-full", enabled ? "translate-x-6" : "translate-x-1")} />
            </Switch>
            {((enabled && labelOn) || (!enabled && labelOff)) && <Switch.Label className="ml-2 select-none">
                {enabled ? labelOn : labelOff}
            </Switch.Label>}
        </Switch.Group>
    )
}

export function Toggle({ data, field, onToggle }) {
    const [enabled, setEnabled] = useState(data.config[field] === "yes");
    const [updating, setUpdating] = useState(false);
    return (
        <button className={clsx("w-32 --btn --btn-3", enabled ? "--btn-success" : "--btn-destructive")} disabled={updating} onClick={async () => {
            setUpdating(true);
            const success = await doChange(patchConfig(data.guild.id, {[field]: enabled ? "no" : "yes"}));
            setUpdating(false);
            if(!success) return;
            setUpdating(false);
            setEnabled(!enabled);
            data.config[field] = enabled ? "no" : "yes";
            if(onToggle) onToggle(!enabled);
        }}>
            {enabled ? "Enabled" : "Disabled"}
        </button>
    )
}

export function Slider({ value, setValue, minValue, maxValue, step }) {
    return (
        <input
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={value}
            onInput={new_value => setValue(parseFloat(new_value.target.value))}
            className="w-full"
        />
    )
}

export function Upgrade({ plan, data }) {
    if(!plan || plan >= plans.length)
        return (
            <Link href={`/dash/${data.guild.id}/contact`}>
                <a className="w-32 --btn --btn-3 --btn-primary">
                    Contact us
                </a>
            </Link>
        )
    return (
        <Link href={`/dash/${data.guild.id}/plan`}>
            <a className="min-w-[8rem] --btn --btn-3 --btn-primary">
                Upgrade to {plans[plan].name}
            </a>
        </Link>
    )
}

export function OptionalUpgrade({ data, required, children }) {
    if(required > data.entitlements.plan)
        return <Upgrade plan={required} data={data}/>
    return children || null;
}

export function Button({ text, onClick, disabled, className }) {
    return (
        <button className={clsx("min-w-[8rem] --btn --btn-3 --btn-primary", className)} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export function TextInput({ placeholder, value, setValue, changeOnInput, className }) {
    return (
        <>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={!changeOnInput && (event => setValue(event.target.value)) || undefined}
                onInput={changeOnInput && (event => setValue(event.target.value)) || undefined}
                className={clsx("bg-gray-800 hover:bg-gray-750 focus:bg-gray-750 px-3 py-1 rounded-lg w-full", className)}
            />
        </>
    )
}
export function NumberInput({ value, setValue, className }) {
    return (
        <>
            <input
                type="number"
                value={value}
                onChange={event => setValue(event.target.value)}
                className={clsx("bg-gray-800 hover:bg-gray-750 focus:bg-gray-750 px-3 py-1 rounded-lg w-full", className)}
            />
        </>
    )
}

export function Dropdown({ values, current, setCurrent, className }) {
    return (
        <Listbox value={current} onChange={setCurrent} className={clsx("relative", className)} as="div">
            <Listbox.Button className="bg-gray-800 hover:bg-gray-750 px-3 py-0.5 w-full text-left rounded-lg">
                {values.find(x => x.id === current)?.name || "Unselected"}
            </Listbox.Button>
            <Listbox.Options className="bg-gray-800 py-2 rounded-lg absolute z-20 top-[110%] w-full">
                {values.map(value => <Listbox.Option value={value.id} disabled={value.disabled} key={value.id} as={Fragment}>
                    {({ active, selected, disabled }) => (
                        <li className={clsx("px-3", selected && !active && "bg-gray-780", active && "bg-gray-750", disabled && "text-gray-400 cursor-not-allowed")}>
                            {value.name} {typeof(value.disabled) === "string" && <span className="italic">
                                {value.disabled}
                            </span>}
                        </li>
                    )}
                </Listbox.Option>)}
            </Listbox.Options>
        </Listbox>
    )
}

export function DropdownSearch({ placeholder, values, current, setCurrent }) {
    const [query, setQuery] = useState(values.find(x => x.id === current)?.name || "");
    return (
        <div className="relative group">
            <TextInput placeholder={placeholder} value={query} setValue={setQuery} changeOnInput={true} />
            <div className="hidden group-focus-within:block absolute z-20 top-[110%] bg-gray-800 w-full rounded-lg px-3 py-2 shadow">
                {values.map(({ name, id }) => <button
                    className={clsx("block w-full text-left rounded px-2 py-0.5", id === current ? "bg-coolGray-700" : "hover:bg-coolGray-700")}
                    onClick={() => {
                        setCurrent(id);
                        setQuery(name);
                        // stop focusing
                        if(document.activeElement.blur)
                            document.activeElement.blur();
                    }}
                    key={id}
                >
                    {name}
                </button>)}
            </div>
        </div>
    )
}

export function Modal({ title, children, isOpen, setOpen, initialFocus }) {
    return (
        <Dialog open={isOpen} onClose={() => setOpen(false)} initialFocus={initialFocus} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="h-full md:flex md:justify-center md:items-center bg-opacity-90 backdrop-filter backdrop-blur-sm">
                <div className="bg-gray-730 rounded-lg w-full h-full md:w-[50vw] md:h-auto md:max-h-[50vh] md:pb-4 overflow-auto shadow-2xl">
                    {title && <Dialog.Title as="p" className="text-center bg-gray-800 rounded-t-lg px-4 py-0.5">{title}</Dialog.Title>}
                    {children}
                </div>
            </div>
        </Dialog>
    )
}

export function JustBlock({ children, className }) {
    return (
        <div className={clsx("w-full border border-gray-550 rounded-lg px-8 py-4", className)}>
            {children}
        </div>
    )
}

export function BlockRightSide({ children, rightSide, className }) {
    return (
        <div className={clsx("flex w-full border border-gray-550 rounded-lg flex-wrap lg:flex-nowrap", className)}>
            <div className="flex-auto px-8 py-4">
                {children}
            </div>
            <div className="flex items-center justify-center flex-none w-full px-12 py-6 border-t lg:p-12 lg:w-64 w lg:border-t-0 lg:border-l border-gray-550">
                {rightSide}
            </div>
        </div>
    )
}

export function HorizontalRule() {
    return (
        <div className="border-t border-gray-550" />
    )
}

export function Unlocked() {
    return (
        <div className="--btn --btn-3 bg-blue-580">
            Unlocked
        </div>
    )
}

export function Attention({ children }) {
    return (
        <div className="w-full px-8 py-4 border rounded-lg border-yellow-550">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="w-full ml-3">
                    <h3 className="mb-2 font-medium text-yellow-400">Attention needed</h3>
                    {children}
                </div>
            </div>
        </div>
    )
}
