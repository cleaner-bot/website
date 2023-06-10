import clsx from "clsx";
import { useRouter } from "next/router";
import Image from "next/image";

import Skeleton from "@/components/skeleton.jsx";
import { Sidebar } from "@/components/dash/sitebar.jsx";
import registry from "@/dash/user/components.js";

export default function UserSidebar({
    route,
    updateRoute,
    user,
    guild,
    children,
}) {
    const nav = registry.filter(
        (x) => !x.restrictions || (user && x.restrictions.includes("loggedin"))
    );
    return (
        <Sidebar
            content={
                <>
                    <SidebarHeader guild={guild} />
                    <div className="flex-1 h-0 px-2 py-4 space-y-1 overflow-y-auto">
                        <SidebarNavigation
                            navigation={nav}
                            route={route}
                            updateRoute={updateRoute}
                        />
                    </div>
                    <Profile
                        user={user}
                        route={route}
                        updateRoute={updateRoute}
                    />
                </>
            }
        >
            {children}
        </Sidebar>
    );
}

function SidebarHeader() {
    return (
        <div
            className="flex-shrink-0 p-4 border-b border-gray-650"
            style={{ borderBottomWidth: "1px" }}
        >
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-200 truncate">
                <Image
                    src="/img/avatar@256x256.png"
                    alt=""
                    className="w-8 h-8 rounded-full bg-gray-750"
                    width={96}
                    height={96}
                />
                The Cleaner
            </div>
        </div>
    );
}

function SidebarNavigation({ navigation, route, updateRoute }) {
    return navigation.map((component) => (
        <button
            key={component.id}
            onClick={() => {
                updateRoute({ guildId: component.id });
            }}
            className={clsx(
                component.id === route.guildId
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
            )}
        >
            {component.icon && (
                <component.icon
                    className={clsx(
                        component.id === route.guildId
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6",
                        component.icon_className
                    )}
                />
            )}
            {component.name}
            {component.badges && component.badges.includes("beta") && (
                <span className="px-2 ml-auto rounded-full bg-indigo-550">
                    BETA
                </span>
            )}
        </button>
    ));
}

function Profile({ user, updateRoute }) {
    const router = useRouter();
    const options = [];
    options.push({
        name: user ? user.discriminator === "0" ? user.name : `${user.name}#${user.discriminator}` : "Loading name...",
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
                    <div className="flex-none w-9 h-9">
                        {opt.image === null
                            ? null
                            : opt.image || (
                                  <Skeleton className="rounded-full" />
                              )}
                    </div>
                    <div className="w-full ml-3 text-left">
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
                    discriminator === "0"
                    ? Number(BigInt(user.id) >> 22n) % 6
                    : user.discriminator % 5
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
