import { useEffect, useReducer, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import GuildSidebar from "@/dash/guild/guildsidebar.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { Header } from "@/components/dash/dash.jsx";
import { Attention } from "@/components/dash/ui.jsx";
import { getGuild, createOAuthRedirect } from "@/lib/api.js";
import { routeUrl } from "@/lib/route.js";
import registry from "@/dash/guild/components.js";

const components = {};
registry.forEach((category) =>
    category.components.forEach(
        (component) =>
            component?.component &&
            (components[component.id] = component.component)
    )
);

export default function GuildRouter({ route, updateRoute, user }) {
    const resetScroll = useRef(null);
    const [guild, setGuild] = useState();
    const [config, updateConfig] = useReducer(
        (state, action) => ({ ...state, ...action }),
        {}
    );
    const [entitlements, updateEntitlements] = useReducer(
        (state, action) => ({ ...state, ...action }),
        {}
    );
    const [error, setError] = useState();

    useEffect(() => {
        resetScroll.current.scrollIntoView({ behavior: "smooth" });
        if (guild?.id === route.guildId) return;
        getGuild(route.guildId)
            .then((res) => {
                setGuild(res.data.guild);
                updateConfig(res.data.config);
                updateEntitlements(res.data.entitlements);
            })
            .catch(setError);
    }, [route]);

    return (
        <GuildSidebar
            user={user}
            guild={guild}
            entitlements={entitlements}
            route={route}
            updateRoute={updateRoute}
        >
            <div ref={resetScroll} className="absolute top-0" />
            {error ? (
                <>
                    <ErrorHandler error={error} />
                    {error?.response?.status === 401 &&
                        !error?.response?.data && <Login route={route} />}
                </>
            ) : !guild || !user ? (
                <Loading />
            ) : (
                <DashboardComponent
                    guild={guild}
                    config={config}
                    updateConfig={updateConfig}
                    entitlements={entitlements}
                    updateEntitlements={updateEntitlements}
                    user={user}
                    route={route}
                    updateRoute={updateRoute}
                />
            )}
        </GuildSidebar>
    );
}

function DashboardComponent(props) {
    const component = components[props.route.component];
    if (!component) return <p>component not found.</p>;
    return (
        <>
            {props.guild?.access?.requires_mfa && !props.user?.flags.includes("mfa_verified") && (
                <Attention className="mb-12">
                    <p>
                        This server requires MFA. You are not able to modify any
                        settings until you verify your session.
                    </p>
                    <button
                        className="mt-6 --btn --btn-3 --btn-primary w-60"
                        onClick={() => {
                            props.updateRoute({
                                guildId: "mfa",
                                component: "",
                                other: [
                                    props.route.guildId,
                                    props.route.component,
                                ],
                            });
                        }}
                    >
                        Verify session
                    </button>
                </Attention>
            )}
            {props.guild?.mfa_level !== 0 && !props.user?.flags.includes("discord:mfa") && (
                <Attention className="mb-12">
                    This server has the "server-wide 2FA" Discord setting enabled.
                    To modify any settings, you need to add 
                    <Link href="https://support.discord.com/hc/en-us/articles/219576828-Setting-up-Two-Factor-Authentication">
                        2FA to your Discord account
                    </Link>.
                </Attention>
            )}
            {props.entitlements?.suspended && (
                <Attention className="mb-12">
                    This server is currently suspended.
                </Attention>
            )}
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
        <button
            onClick={() => {
                const url = createOAuthRedirect({
                    destination: `/dash#${routeUrl(route)}`,
                    allowChange: true,
                });
                router.push(url);
            }}
            className="mx-auto w-60 --btn --btn-3 --btn-primary"
        >
            Login
        </button>
    );
}
