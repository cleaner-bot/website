
import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { DropdownSearch } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";


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
            <Header name="Overview">
                Manage slowmode settings and channels.
            </Header>
            
            <Section>
                <ToggleBlock
                    name="Enable slowmode"
                    description="Automatically dehoists members that put special characters in front of their name to appear higher in the memberlist."
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
                <div className="flex flex-wrap gap-2 mb-6">
                    Channels: 
                    {config.slowmode_exceptions.length === 0 ? <span>
                        No channels.
                    </span> : config.slowmode_exceptions.map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                        {guild.channels.find(y => x === y.id)?.name || `Deleted channel: ${x}`}
                        <button className="w-4 h-4 ml-2 text-gray-400" onClick={async () => {
                            const slowmodeExceptions = [...config.slowmode_exceptions];
                            const index = slowmodeExceptions.indexOf(x);
                            if(index >= 0)
                                slowmodeExceptions.splice(index, 1);
                            const success = await doChange(patchConfig(guildId, {slowmode_exceptions: slowmodeExceptions}));
                            if(!success) return;
                            setConfig({...config, slowmode_exceptions: slowmodeExceptions})
                        }}>
                            <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                            </svg>
                        </button>
                    </span>)}
                </div>
                <DropdownSearch
                    placeholder="Select a channel to add as exception."
                    values={guild.channels.filter(x => config.slowmode_exceptions.indexOf(x.id) === -1)}
                    current=""
                    setCurrent={async value => {
                        const slowmodeExceptions = [...config.slowmode_exceptions];
                        slowmodeExceptions.push(value);
                        const success = await doChange(patchConfig(guildId, {slowmode_exceptions: slowmodeExceptions}));
                        if(!success) return;
                        setConfig({...config, slowmode_exceptions: slowmodeExceptions})
                    }}
                />
            </PlainBlock>
        </>
    )
}

