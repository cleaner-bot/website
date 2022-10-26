import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import clsx from "clsx";

import Footer from "@/components/footer.jsx";

export function Sidebar({ content, children, childrenClassNames }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40 flex md:hidden"
                    onClose={setSidebarOpen}
                >
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
                                        <XMarkIcon className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </Transition.Child>
                            {content}
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
                    {content}
                </div>
            </div>
            <div className="flex flex-col flex-1 md:pl-64">
                <div className="sticky top-0 z-10 pt-1 pl-1 bg-gray-800 md:hidden sm:pl-3 sm:pt-3">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-200"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>
                <main className="flex-1 w-full">
                    <div
                        className={clsx(
                            "min-h-screen p-6 md:p-12 pb-8 md:pb-20",
                            childrenClassNames
                        )}
                    >
                        <div className="max-w-[1280px] mx-auto">{children}</div>
                    </div>
                    <div className="p-6 mt-40 bg-gray-700 border-t md:p-12 border-gray-550 max-w-[1280px] mx-auto">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    );
}
