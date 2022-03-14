
import clsx from "clsx";
import Link from "next/link";
import { ArchiveIcon, HomeIcon, ShieldCheckIcon, FilterIcon, FingerPrintIcon, CodeIcon, ClockIcon, CreditCardIcon, FolderIcon, IdentificationIcon, MailIcon, CubeTransparentIcon, ExclamationIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Skeleton from "@/components/skeleton.jsx";
import Footer from "@/components/footer.jsx";
import Image from "@/components/image.jsx";
import plans from "@/lib/plans.js";
import { Attention } from "@/components/dash/ui.jsx";


const navigation = [
    { name: "Overview", id: "", icon: HomeIcon },
    { name: "Firewall", id: "firewall", icon: FilterIcon },
    { name: "Anti Spam", id: "antispam", icon: ShieldCheckIcon },
    { name: "Slowmode", id: "slowmode", icon: ClockIcon },
    { name: "Challenge", id: "challenge", icon: FingerPrintIcon },
    { name: "Logging", id: "logging", icon: ArchiveIcon },
    { name: "Impersonation", id: "impersonation", icon: IdentificationIcon, restricted: true },
    { name: "Workers", id: "workers", icon: CodeIcon, restricted: true },
    { name: "Backup", id: "backup", icon: FolderIcon, restricted: true },
    { name: "Bot", id: "bot", icon: CubeTransparentIcon, restricted: true },
    { name: "Plan", id: "plan", icon: CreditCardIcon, restricted: true },
    { name: "Contact", id: "contact", icon: MailIcon, restricted: true },
    { name: "Developer panel", id: "dev", icon: ExclamationIcon, restricted: true },
]

export default function Sidebar({ current, data, guildId, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const is_dev = data && data.user.is_dev;
  
    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <XIcon className="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex items-center flex-shrink-0 gap-2 px-4 text-2xl font-semibold text-gray-200 truncate">
                                        <Image src="/img/avatar.png" alt="" className="w-8 h-8 rounded-full bg-gray-750" />
                                        The Cleaner
                                    </div>
                                    <div className="flex-shrink-0 px-4 mt-2 truncate">
                                        {data && data.guild ? data.guild.name : <Skeleton className="h-6 rounded" />}
                                    </div>
                                    <nav className="px-2 mt-5 space-y-1">
                                        {navigation.filter(x => !x.restricted || is_dev || x.id === current).map((item) => (
                                            <Link
                                                key={item.name}
                                                href={`/dash/${guildId}/${item.id}`}
                                            >
                                                <a className={clsx(
                                                    item.id === current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                )}>
                                                    <item.icon
                                                        className={clsx(
                                                            item.id === current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
                                                            "mr-4 flex-shrink-0 h-6 w-6"
                                                        )}
                                                    />
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                                <Profile data={data} />
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
                        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 gap-2 px-4 text-2xl font-semibold text-gray-200 truncate">
                                <Image src="/img/avatar.png" alt="" className="w-8 h-8 rounded-full bg-gray-750" />
                                The Cleaner
                            </div>
                            <div className="flex-shrink-0 px-4 mt-2 truncate">
                                {data && data.guild ? data.guild.name : <Skeleton className="h-6 rounded" />}
                            </div>
                            <nav className="flex-1 px-2 mt-5 space-y-1">
                                {navigation.filter(x => !x.restricted || is_dev || x.id === current).map(item => (
                                    <Link key={item.id} href={`/dash/${guildId}/${item.id}`}>
                                        <a className={clsx(
                                            item.id === current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                        )}>
                                            <item.icon
                                                className={clsx(
                                                    item.id === current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
                                                    "mr-3 flex-shrink-0 h-6 w-6"
                                                )}
                                            />
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <Profile data={data} />
                    </div>
                </div>
                <div className="flex flex-col flex-1 md:pl-64">
                    <div className="sticky top-0 z-10 pt-1 pl-1 bg-gray-800 md:hidden sm:pl-3 sm:pt-3">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-200"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <main className="flex-1 p-6 md:p-12 w-full max-w-[1280px] mx-auto">
                        <div className="min-h-screen md:min-h-[calc(100vh-13rem)]">
                            {data && data.entitlements && data.entitlements.suspended > 0 && <Attention className="mb-12">
                                <p>
                                    This server is currently suspended due to <Link href="/legal/terms#prohibited-activities">
                                        <a className="hover:underline">
                                            Terms of Service
                                        </a>
                                    </Link> violations.
                                </p>
                                <p>
                                    Contact support for further information.
                                </p>
                            </Attention>}
                            {children}
                        </div>
                        <div className="pt-8 mt-40 border-t md:p-12 border-gray-550">
                            <Footer />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

function Profile({ data }) {
    const options = [];
    if(data && data.user.is_dev)
        options.push({ name: "Developer options", text: "View developer panel", href: "/admin/", image: null });
    if(data && data.entitlements && data.entitlements.plan > 0)
        options.push({ name: "Current plan", text: plans[data.entitlements.plan] || "Developer", href: `/dash/${data.guild.id}/plan`, image: null });
    options.push({
        name: data ? data.user.name : "Loading name...",
        text: "View servers",
        href: "/dash/",
        image: data && data.user.avatar,
    })
    return (
        <>
            {options.map(opt => <div className="flex flex-shrink-0 p-4 border-t border-gray-650" key={opt.href}>
                <Link href={opt.href}>
                    <a className="flex-shrink-0 block w-full group">
                        <div className="flex items-center">
                            {opt.image !== null && <div>
                                {opt.image ? <Image src={opt.image} alt="" className="inline-block rounded-full h-9 w-9 bg-gray-750" /> : <Skeleton className="rounded-full h-9 w-9" />}
                            </div>}
                            <div className={opt.image === null ? "ml-12" : "ml-3"}>
                                <p className="text-sm font-medium text-white truncate">{opt.name}</p>
                                <p className="text-xs font-medium text-gray-300 --anim group-hover:text-gray-200">{opt.text}</p>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>)}
        </>
    )
}
