
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {unstable_batchedUpdates} from "react-dom";

import Sidebar from "@/components/dash/sidebar.jsx";
import { InternalLink } from "@/components/buttons.jsx";
import { createOAuthRedirect, getGuild, useGuild } from "@/lib/api.js";
import ErrorHandler from "@/components/dash/error.jsx";


export function LoadingData() {
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="inline font-mono text-4xl">
                Loading data...
            </h1>
            <p className="mt-2 text-gray-200">
                Loading data, please wait a little...
            </p>
        </div>
    )
}

function GuildNotFound() {
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="text-4xl font-medium text-center text-rose-400">
                Server not found!
            </h1>
            <p className="mt-6 text-center text-gray-200">
                The Cleaner is not in this server or 
            </p>
            <p className="text-center text-gray-200">
                you don't have access to it.
            </p>
            <InternalLink href="/dash/" className="mt-12">
                Dashboard
            </InternalLink>
        </div>
    )
}

export function ErrorLoadingData({ guildId, current, error }) {
    const router = useRouter();
    if(error.response && error.response.status === 401) {
        router.push(createOAuthRedirect({ guild: guildId, component: current }));
        return null;
    }
    return <ErrorHandler error={error} />
}

export function DataWrapper({ guildId, current, Inner }) {
    if(!guildId)
        return (
            <Sidebar current={current}>
                <LoadingData />
            </Sidebar>
        )
    return <DataWrapperWithGuildID guildId={guildId} current={current} Inner={Inner} />
}

export function useData() {
    const router = useRouter();
    const [guildId, setGuildId] = useState(null);
    const result = useGuild(guildId);
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [guild, setGuild] = useState();
    const [config, setConfig] = useState();
    const [entitlements, setEntitlements] = useState();
    useEffect(() => {
        if(!router.isReady) return;
        const guildId = router.query.id;
        setGuildId(guildId);
    }, [router]);
    useEffect(() => {
        if(!guildId || !result) return;
        const { data: response, error: newError } = result;
        if(error !== newError)
            setError(newError);
        if(response?.data.user?.id !== user?.id)
            setUser(response?.data.user);
        if(response?.data.guild?.id !== guild?.id) {
            setGuild(response?.data.guild);
            setConfig(response?.data.config);
            setEntitlements(response?.data.entitlements);
        }
    }, [result])
    return { error, setError, user, setUser, guild, setGuild, guildId, setGuildId, config, setConfig, entitlements, setEntitlements };
}

function DataWrapperWithGuildID({ guildId, current, Inner }) {
    const isLoading = !response && !isError;
    if(isLoading)
        return (
            <Sidebar current={current} guildId={guildId}>
                <LoadingData />
            </Sidebar>
        )
    if(isError)
        return (
            <Sidebar current={current} guildId={guildId}>
                <ErrorLoadingData current={current} guildId={guildId} error={isError} />
            </Sidebar>
        )
    if(!response.data.guild)
        return (
            <Sidebar current={current} data={response.data} guildId={guildId}>
                <GuildNotFound />
            </Sidebar>
        )
    return (
        <Sidebar current={current} data={response.data} guildId={guildId}>
            <Inner data={response.data} />
        </Sidebar>
    )
}
