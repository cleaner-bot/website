import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import UserSidebar from "@/dash/user/usersidebar.jsx";
import { DiscordIconWhite } from "@/components/discord.jsx";
import { Header } from "@/components/dash/dash.jsx";
import { HorizontalRule } from "@/components/dash/ui.jsx";
import { createOAuthRedirect } from "@/lib/api.js";
import { routeUrl } from "@/lib/route.js";
import registry from "@/dash/user/components.js";

const components = {};
registry.forEach(
    (component) =>
        component?.component && (components[component.id] = component.component)
);

export default function UserRouter({ route, updateRoute, user, setUser }) {
    const resetScroll = useRef(null);

    useEffect(() => {
        resetScroll.current.scrollIntoView({ behavior: "smooth" });
    }, [route]);

    return (
        <UserSidebar user={user} route={route} updateRoute={updateRoute}>
            <div ref={resetScroll} className="absolute top-0" />
            {user === null ? (
                <Login route={route} />
            ) : !user ? (
                <Loading />
            ) : (
                <DashboardComponent
                    user={user}
                    setUser={setUser}
                    route={route}
                    updateRoute={updateRoute}
                />
            )}
        </UserSidebar>
    );
}

function DashboardComponent(props) {
    const component = components[props.route.guildId];
    if (!component) return <p>component not found.</p>;
    return (
        <>
            <Header name={component.title}>{component.description}</Header>
            {component.component && <component.component {...props} />}
        </>
    );
}

function Loading() {
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="inline font-mono text-4xl">Loading...</h1>
            <p className="mt-2 text-gray-200">
                Loading, please wait a little...
            </p>
        </div>
    );
}

function Login({ route }) {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center">
            <div>
                <h1 className="mb-12 text-2xl font-bold text-center">
                    You must login with Discord to gain access to the Dashboard.
                </h1>
                <button
                    className="w-full mx-auto --btn --btn-4 --btn-primary sm:w-80"
                    onClick={() => {
                        const url = createOAuthRedirect({
                            destination: `/dash#${routeUrl(route)}`,
                        });
                        router.push(url);
                    }}
                >
                    <DiscordIconWhite className="w-6 h-6 mr-4" />
                    Login with Discord
                </button>
                <HorizontalRule label="OR" className="my-8" />
                <button
                    className="w-full mx-auto --btn --btn-4 --btn-primary sm:w-80"
                    onClick={() => {
                        const url = createOAuthRedirect({
                            destination: `/dash#${routeUrl(route)}`,
                            withBot: true,
                        });
                        router.push(url);
                    }}
                >
                    <DiscordIconWhite className="w-6 h-6 mr-4" />
                    Invite bot directly
                </button>
                <p className="mt-6 text-center">
                    By logging in you agree to our{" "}
                    <Link href="/legal/terms">
                        <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                            Terms of Service
                        </a>
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy">
                        <a className="font-bold text-gray-300 hover:underline whitespace-nowrap">
                            Privacy Policy
                        </a>
                    </Link>{" "}
                    .
                </p>
            </div>
        </div>
    );
}
