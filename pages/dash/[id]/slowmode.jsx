import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { MultiSelect } from "@/components/dash/ui.jsx";
import { Attention } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Slowmode | The Cleaner Dashboard" />
            <Page page="slowmode" {...data}>
                <SlowmodeDashboard {...data} />
            </Page>
        </>
    );
}

function SlowmodeDashboard({ config, setConfig, guild, guildId }) {
    const missingInChannels =
        guild.channels &&
        guild.channels.filter(
            (channel) =>
                !channel.permissions.ADMINISTRATOR &&
                !channel.permissions.MANAGE_CHANNELS
        );
    return (
        <>
            <Header name="Slowmode">
                Manage slowmode settings and channels.
            </Header>

            <Section>
                <ToggleBlock
                    name="Enable slowmode"
                    description="Enable automatic slowmode adjustments. Channels with more than 10s slowmode will not be adjusted."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="slowmode_enabled"
                >
                    {guild.channels && missingInChannels.length > 0 && (
                        <Attention>
                            Missing permission to change slowmode in the
                            following channels:
                            <ul className="list-disc list-inside">
                                {missingInChannels.map((channel) => (
                                    <li key={channel.id}>{channel.name}</li>
                                ))}
                            </ul>
                        </Attention>
                    )}
                </ToggleBlock>
            </Section>
            <PlainBlock
                name="Exceptions"
                description="Channels marked as exception will have a lot less slowmode. This also affects Anti Spam and disables the emoji.mass Firewall rule."
            >
                <MultiSelect
                    name="Channels:"
                    none="No channels."
                    singular="Channel"
                    field="slowmode_exceptions"
                    placeholder={
                        guild.channels
                            ? "Select a channel to add as exception."
                            : "Channel list is unavailable. Refresh the page or contact support."
                    }
                    selection={guild.channels ? guild.channels : []}
                    guildId={guildId}
                    config={config}
                    setConfig={setConfig}
                />
            </PlainBlock>
        </>
    );
}
