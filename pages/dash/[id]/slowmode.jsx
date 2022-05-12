
import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { MultiSelect } from "@/components/dash/ui.jsx";


export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Slowmode | The Cleaner Dashboard"
            />
            <Page page="slowmode" {...data}>
                <SlowmodeDashboard {...data} />
            </Page>
        </>
    )
}


function SlowmodeDashboard({ config, setConfig, guild, guildId }) {
    return (
        <>
            <Header name="Slowmode">
                Manage slowmode settings and channels.
            </Header>
            
            <Section>
                <ToggleBlock
                    name="Enable slowmode"
                    description="Enable slowmode automatic slowmode adjustments. Channels with more than 10s slowmode will not be adjusted."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="slowmode_enabled"
                />
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
                    placeholder="Select a achannel to add as exception."
                    selection={guild.channels}
                    guildId={guildId}
                    config={config}
                    setConfig={setConfig}
                />
            </PlainBlock>
        </>
    )
}

