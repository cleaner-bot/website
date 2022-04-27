
import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { DropdownSearch, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Report | The Cleaner Dashboard"
            />
            <Page page="report" {...data}>
                <ReportDashboard {...data} />
            </Page>
        </>
    )
}


function ReportDashboard({ config, setConfig, entitlements, guildId }) {
    const reportChannel = guild.channels.find(channel => channel.id === config.report_channel);
    return (
        <>
            <Header name="Report">
                Manage your reporting.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable report"
                    description="Enable report."
                    field="report_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.report}
                    entitlements={entitlements}
                />
                {config.report_enabled && <>
                    <PlainBlock
                        name="Report channel"
                        description="Select the channel where reports will be sent to."
                    >
                        <DropdownSearch
                            placeholder="Select channel."
                            values={guild.channels.filter(channel => guild.myself.permissions.ADMINISTRATOR || (channel.permissions.VIEW_CHANNEL && channel.permissions.SEND_MESSAGES && channel.permissions.EMBED_LINKS))}
                            current={config.report_channel}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(guildId, {report_channel: new_value}));
                                if(!success) return;
                                setConfig({...config, report_channel: new_value});
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send messages and embeds in it.
                        </p>
                        {config.report_channel === "0" && <Attention>
                            No report channel selected.
                        </Attention>}
                        {!reportChannel && config.report_channel !== "0" && <Attention>
                            The report channel has been deleted. Please select a new one.
                        </Attention>}
                        {reportChannel && !(reportChannel.permissions.ADMINISTRATOR || (reportChannel.permissions.VIEW_CHANNEL && reportChannel.permissions.SEND_MESSAGES && reportChannel.permissions.EMBED_LINKS)) && <Attention>
                            The Cleaner can not send messages and embeds in the current report channel. Please select a new one or give me the missing permissions.
                        </Attention>}
                    </PlainBlock>
                </>}
            </Section>
        </>
    )
}

