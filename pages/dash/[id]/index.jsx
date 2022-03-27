
import { InternalLink } from "@/components/buttons.jsx";
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
                title="The Cleaner Dashboard"
            />
            <Page page="" {...data}>
                <Dashboard {...data} />
            </Page>
        </>
    )
}


function Dashboard({ config, setConfig, guild, guildId }) {
    return (
        <>
            <Header name="Overview" />
            <Section>
                {(!config.logging_enabled || config.logging_channel === "0") && <Attention>
                    {config.logging_enabled === "no" ? "You do not have logging enabled!" : "You do not have a logging channel selected!"}
                    <InternalLink href={`/dash/${guildId}/logging`} className="mt-4 lg:w-96">
                        Go to Logging
                    </InternalLink>
                </Attention>}
                {config.challenge_interactive_enabled && config.challenge_interactive_role === "0" && <Attention>
                    You do not have a role for interactive challenges selected.
                    <InternalLink href={`/dash/${guildId}/challenge`} className="mt-4 lg:w-96">
                        Go to Challenge
                    </InternalLink>
                </Attention>}

                <PlainBlock
                    name="Moderator roles"
                    description={<>
                        <p>Moderators will be not affected by the security solutions. (firewall, antispam, challenges, ...)</p>
                        <p>Members with <b>administrator</b> or <b>manage server</b> permission, the <b>server owner</b>, and <b>bots</b> will always be ignored.</p>
                    </>}
                >
                    <div className="flex flex-wrap gap-2 mb-6">
                        Roles: 
                        {config.overview_modroles.length === 0 ? <span>
                            No roles.
                        </span> : config.overview_modroles.map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                            {guild.roles.find(y => x === y.id)?.name || `Deleted role: ${x}`}
                            <button className="w-4 h-4 ml-2 text-gray-400" onClick={async () => {
                                const overviewModRoles = [...config.overview_modroles];
                                const index = overviewModRoles.indexOf(x);
                                if(index >= 0)
                                    overviewModRoles.splice(index, 1);
                                const success = await doChange(patchConfig(guildId, {overview_modroles: overviewModRoles}));
                                if(!success) return;
                                setConfig({...config, overview_modroles: overviewModRoles});
                            }}>
                                <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>)}
                    </div>
                    <DropdownSearch
                        placeholder="Select a role to add as moderator."
                        values={guild.roles.filter(x => !x.is_managed && config.overview_modroles.indexOf(x.id) === -1)}
                        current=""
                        setCurrent={async value => {
                            const overviewModRoles = [...config.overview_modroles];
                            overviewModRoles.push(value);
                            const success = await doChange(patchConfig(guildId, {overview_modroles: overviewModRoles}));
                            if(!success) return;
                            setConfig({...config, overview_modroles: overviewModRoles});
                        }}
                    />
                </PlainBlock>
                <ToggleBlock
                    name="Automatic dehoisting"
                    description="Automatically dehoists members that put special characters in front of their name to appear higher in the memberlist."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="overview_dehoisting_enabled"
                />
            </Section>
        </>
    )
}
