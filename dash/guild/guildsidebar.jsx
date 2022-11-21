import clsx from "clsx";
import {
    ExclamationTriangle,
    ChevronUp,
    ChevronDown,
} from "react-bootstrap-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Skeleton from "@/components/skeleton.jsx";
import plans from "@/lib/plans.js";
import { InternalLink } from "@/components/buttons.jsx";
import { Sidebar } from "@/components/dash/sitebar.jsx";
import registry from "@/dash/guild/components.js";

export default function GuildSidebar({
    route,
    updateRoute,
    user,
    guild,
    entitlements,
    children,
}) {
    const isDev = user?.is_dev;
    const isSuspended =
        entitlements?.suspended > 0 && !(isDev && route.component === "dev");

    const nav = registry
        .map((nav) => ({
            ...nav,
            components: nav.components.filter(
                (x) =>
                    x.id === route.component ||
                    true ||
                    !x.restrictions ||
                    x.restrictions.some((r) =>
                        r === "dev"
                            ? isDev
                            : entitlements &&
                              entitlements.plan >= entitlements[r]
                    )
            ),
        }))
        .filter((nav) => nav.components.length > 0);

    return (
        <Sidebar
            content={
                <>
                    <SidebarHeader guild={guild} />
                    <div className="flex-1 h-0 pb-4 overflow-y-auto">
                        <SidebarNavigation
                            navigation={nav}
                            guild={guild}
                            route={route}
                            updateRoute={updateRoute}
                        />
                    </div>
                    <Profile
                        user={user}
                        entitlements={entitlements}
                        route={route}
                        updateRoute={updateRoute}
                    />
                </>
            }
            childrenClassNames={isSuspended && "bg-red-500"}
        >
            {isSuspended ? <Suspended /> : children}
        </Sidebar>
    );
}

function SidebarHeader({ guild }) {
    return (
        <div
            className="flex-shrink-0 p-4 border-b border-gray-650"
            style={{ borderBottomWidth: "1px" }}
        >
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-200 truncate">
                <Image
                    src="/img/avatar@96x96.png"
                    alt=""
                    className="w-8 h-8 rounded-full bg-gray-750"
                    width={96}
                    height={96}
                />
                The Cleaner
            </div>
            <div className="mt-2 truncate">
                {guild ? guild.name : <Skeleton className="h-6 rounded" />}
            </div>
        </div>
    );
}

function SidebarNavigation({ navigation, guild, ...props }) {
    return (
        <nav className="flex-1 px-2 mt-5 space-y-1">
            {navigation.map((category) => (
                <SidebarCategory
                    category={category}
                    key={category.name}
                    {...props}
                />
            ))}
        </nav>
    );
}

function SidebarCategory({ category, route, updateRoute }) {
    const [hidden, setHidden] = useState(category.defaultHidden ?? false);
    return (
        <>
            <button
                className="flex items-center justify-center w-full px-2 text-gray-300 rounded-full hover:bg-gray-700"
                onClick={() => setHidden(!hidden)}
            >
                <div className="flex-grow h-1 bg-gray-550" />
                <span className="px-4">{category.name}</span>
                <div className="flex-grow h-1 bg-gray-550" />
                {hidden ? (
                    <ChevronDown className="w-5 h-5 ml-1" />
                ) : (
                    <ChevronUp className="w-5 h-5 ml-1" />
                )}
            </button>
            {!hidden &&
                category.components.map((component) => (
                    <button
                        key={component.id}
                        onClick={() => {
                            updateRoute({ component: component.id });
                        }}
                        className={clsx(
                            component.id === route.component
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                        )}
                    >
                        {component.icon && (
                            <component.icon
                                className={clsx(
                                    component.id === route.component
                                        ? "text-gray-300"
                                        : "text-gray-400 group-hover:text-gray-300",
                                    "mr-3 flex-shrink-0 h-6 w-6",
                                    component.icon_className
                                )}
                            />
                        )}
                        {component.name}
                        {component.badges &&
                            component.badges.includes("beta") && (
                                <span className="px-2 ml-auto rounded-full bg-indigo-550">
                                    BETA
                                </span>
                            )}
                    </button>
                ))}
        </>
    );
}

function Profile({ user, entitlements, updateRoute }) {
    const router = useRouter();
    const options = [];
    if (entitlements && entitlements.suspended > 0)
        options.push({
            name: "Suspension",
            text: "Guild is suspended",
            href: "https://docs.cleanerbot.xyz/misc/suspension#suspended-guild",
            image: <ExclamationTriangle className="text-red-500 w-9 h-9" />,
        });
    if (entitlements && entitlements.plan > 0)
        options.push({
            name: "Current plan",
            text: plans[entitlements.plan] || "Developer",
            route: { component: "plan" },
            image: null,
        });
    options.push({
        name: user ? `${user.name}#${user.discriminator}` : "Loading name...",
        text: "View servers",
        route: { guildId: "", component: "" },
        image: user && <UserAvatar user={user} />,
    });
    return options.map((opt) => (
        <div
            className="flex flex-shrink-0 p-4 border-t border-gray-650"
            key={opt.name}
        >
            <button
                className="flex-shrink-0 block w-full group"
                onClick={() => {
                    if (opt.href) return router.push(opt.href);
                    updateRoute({ ...opt.route });
                }}
            >
                <div className="flex items-center">
                    <div className="w-9 h-9">
                        {opt.image === null
                            ? null
                            : opt.image || (
                                  <Skeleton className="rounded-full" />
                              )}
                    </div>
                    <div className="ml-3 text-left">
                        <p className="text-sm font-medium text-white truncate">
                            {opt.name}
                        </p>
                        <p className="text-xs font-medium text-gray-300 --anim group-hover:text-gray-200">
                            {opt.text}
                        </p>
                    </div>
                </div>
            </button>
        </div>
    ));
}

function UserAvatar({ user }) {
    if (!user.avatar)
        return (
            <Image
                src={`https://cdn.discordapp.com/embed/avatars/${
                    user.discriminator % 5
                }.png`}
                className="rounded-full w-9 h-9 bg-gray-810"
                alt="User avatar"
                width={128}
                height={128}
            />
        );
    const CDN_BASE = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`;
    return (
        <picture>
            <source type="image/webp" srcSet={`${CDN_BASE}.webp?size=64`} />
            <Image
                src={`${CDN_BASE}.png?size=64`}
                className="rounded-full w-9 h-9 lazyload bg-gray-810"
                alt="User avatar"
                width={64}
                height={64}
            />
        </picture>
    );
}

function Suspended() {
    return (
        <div className="flex flex-col items-center justify-center">
            <ExclamationTriangle className="w-32 h-32" />
            <h1 className="text-5xl font-bold text-center">
                Guild is suspended
            </h1>
            <InternalLink
                href="https://docs.cleanerbot.xyz/misc/suspension#suspended-guild"
                color="--btn-neutral"
                className="mt-12 w-60"
            >
                Learn more
            </InternalLink>
            <InternalLink
                href="/discord"
                color="--btn-neutral"
                className="mt-2 w-60"
            >
                Support
            </InternalLink>
        </div>
    );
}
