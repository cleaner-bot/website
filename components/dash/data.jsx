
import { useRouter } from "next/router";

import Sidebar from "@/components/dash/sidebar.jsx";
import { InternalLink } from "@/components/buttons.jsx";
import { createOAuthRedirect, useGuild } from "@/lib/api.js";
import ErrorHandler from "./error";


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

function DataWrapperWithGuildID({ guildId, current, Inner }) {
    // TODO: remove this
    const { data: response, error: isError } = guildId !== "preview" ? useGuild(guildId) : { data: { data: {"guild":{"id":"756989147163656273","name":"Coding Laboratories™","roles":[{"name":"test","id":"1","can_control":true,"is_managed":false},{"name":"test2","id":"2","can_control":true,"is_managed":false},{"name":"bot","id":"3","can_control":false,"is_managed":true},{"name":"test3","id":"4","can_control":false,"is_managed":false}],"channels":[],"me":{"permissions":{"administrator":true}}},"entitlements":{"plan":0,"workers":1,"workers_cpu":10,"workers_ram":131072,"workers_size":16384,"challenge_interactive_join_risk":1,"challenge_interactive_custom_embed":1,"challenge_interactive_custom_webpage":1,"contact_standard":1,"contact_email":2,"bot_limit":0,"bot_dedicated":2,"logging_downloads":1,"logging_retention":3},"config":{"rules_phishing_content":"2","rules_phishing_domain_blacklisted":"2","rules_phishing_domain_heuristic":"2","rules_phishing_embed":"2","rules_selfbot_embed":"2","rules_ping_hidden":"2","rules_ping_roles":"2","rules_ping_users_many":"2","rules_ping_users_few":"1","rules_ping_broad":"1","rules_advertisement_discord_server":"1","rules_emoji_mass":"0","antispam_similar":"yes","antispam_exact":"yes","antispam_token":"yes","antispam_sticker":"yes","antispam_attachment":"yes","overview_modroles":"","overview_dehoisting_enabled":"yes","overview_discordimpersonation_enabled":"yes","slowmode_enabled":"yes","slowmode_exceptions":"","challenge_timeout_enabled":"yes","challenge_interactive_enabled":"yes","challenge_interactive_take_role":"no","challenge_interactive_role":"1","challenge_interactive_joinrisk_custom":"70","challenge_interactive_level":"3","challenge_interactive_webpage_splash":"","logging_enabled":"yes","logging_channel":"0","logging_option_join":"yes","logging_downloads_enabled":"no","workers_enabled":"no","bot_custom":""},"user":{"id":"633993042755452932","name":"狮子座","avatar":"https://cdn.discordapp.com/avatars/633993042755452932/b0de340638818c30f458fd7adf269758.webp?size=64","is_dev":false}} } };
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
