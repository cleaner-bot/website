
import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { DropdownSearch, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig, useLoggingDownloads } from "@/lib/api.js";
import ErrorHandler from "@/components/dash/error.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Logging | The Cleaner Dashboard"
            />
            <Page page="logging" {...data}>
                <LoggingDashboard {...data} />
            </Page>
        </>
    )
}


function LoggingDashboard({ config, setConfig, entitlements, guild, guildId }) {
    const loggingChannel = guild.channels.find(channel => channel.id === config.logging_channel);
    return (
        <>
            <Header name="Logging" />
            <Section>
                <ToggleBlock
                    name="Enable logging"
                    description="Logging allows you to get notified about actions The Cleaner is performing."
                    field="logging_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                />
                {config.logging_enabled && <>
                    <PlainBlock
                        name="Logging channel"
                        description="Select the channel where logs will be sent to."
                    >
                        <DropdownSearch
                            placeholder="Select channel."
                            values={guild.channels.filter(channel => guild.myself.permissions.ADMINISTRATOR || (channel.permissions.VIEW_CHANNEL && channel.permissions.SEND_MESSAGES && channel.permissions.EMBED_LINKS))}
                            current={config.logging_channel}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(guildId, {logging_channel: new_value}));
                                if(!success) return;
                                setConfig({...config, logging_channel: new_value});
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send messages and embeds in it.
                        </p>
                        {config.logging_channel === "0" && <Attention>
                            No logging channel selected.
                        </Attention>}
                        {!loggingChannel && config.logging_channel !== "0" && <Attention>
                            The logging channel has been deleted. Please select a new one.
                        </Attention>}
                        {loggingChannel && !(loggingChannel.permissions.ADMINISTRATOR || (loggingChannel.permissions.VIEW_CHANNEL && loggingChannel.permissions.SEND_MESSAGES && loggingChannel.permissions.EMBED_LINKS)) && <Attention>
                            The Cleaner can not send messages and embeds in the current logging channel. Please select a new one or give me the missing permissions.
                        </Attention>}
                    </PlainBlock>
                    <ToggleBlock
                        name="Join log"
                        description="Logs member join with account age and risk rating information."
                        field="logging_option_join"
                        config={config}
                        setConfig={setConfig}
                        guildId={guildId}
                    />
                    <ToggleBlock
                        name="Leave log"
                        description="Logs member leaves."
                        field="logging_option_leave"
                        config={config}
                        setConfig={setConfig}
                        guildId={guildId}
                    />
                    <ToggleBlock
                        name="Verify log"
                        description="Logs member who verify (super verification and challenges)."
                        field="logging_option_verify"
                        config={config}
                        setConfig={setConfig}
                        guildId={guildId}
                    />
                    <ToggleBlock
                        name="Downloads"
                        description={<>
                            <p>We'll save all your logs and you can download them here until they expire.</p>
                            <p>Your logs expire after <b>{entitlements.logging_retention}</b> month{entitlements.logging_retention !== 1 && "s"}.</p>
                        </>}
                        field="logging_downloads_enabled"
                        config={config}
                        setConfig={setConfig}
                        guildId={guildId}
                        entitlement={entitlements.logging_downloads}
                        entitlements={entitlements}
                    >
                        {(entitlements.plan >= entitlements.logging_downloads && config.logging_downloads_enabled) && <>
                            <h2 className="mt-12 mb-6 text-2xl font-medium">
                                Files
                            </h2>
                            <DownloadFiles guildId={guildId} />
                        </>}
                    </ToggleBlock>
                </>}
            </Section>
        </>
    )
}

function DownloadFiles({ guildId }) {
    const { data: response, error: isError } = useLoggingDownloads(guildId);
    if(isError)
        return (
            <ErrorHandler error={isError} />
        )
    if(!response)
        return (
            <>
                Loading....
            </>
        )
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <table className="divide-y divide-gray-550">
            <thead>
                <tr>
                    <th className="px-2 text-xs font-medium tracking-wider text-left uppercase">
                        Year
                    </th>
                    <th className="text-xs font-medium tracking-wider text-left uppercase">
                        Month
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-550">
                {response.data.map(x => <tr key={`${x.year}-${x.month}`}>
                    <td className="w-32 px-2 py-2">
                        {x.year}
                    </td>
                    <td className="w-32 py-2">
                        {months[x.month - 1]}
                    </td>
                    <td className="w-64 py-2">
                        <button
                            className="--btn --btn-2 --btn-primary w-60"
                            disabled={x.expired}
                        >
                            {x.expired ? "Download expired" : "Download"}
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}
