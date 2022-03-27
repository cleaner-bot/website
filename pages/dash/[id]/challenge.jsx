
import { useState } from "react";
import toast from "react-hot-toast";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, BlockWithPanel, ToggleBlock } from "@/components/dash/block.jsx";
import { Upgrade, Button, Dropdown, DropdownSearch, OptionalUpgrade, Slider } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig, postChallengeEmbed } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Challenge | The Cleaner Dashboard"
            />
            <Page page="challenge" {...data}>
                <ChallengeDashboard {...data} />
            </Page>
        </>
    )
}


function ChallengeDashboard({ config, setConfig, entitlements, guild, guildId }) {
    const [sendChallengeInteractiveEmbedChannel, setSendChallengeInteractiveEmbedChannel] = useState("");

    return (
        <>
            <Header name="Challenges">
                <p>Control which challenges are issued.</p>
                <p>
                    <b>Note:</b> Ratelimits on timeouting or giving roles are harsh. If the ratelimit is reached, The Cleaner will fallback to kicking or banning.
                </p>
            </Header>
            <Section>
                <BlockWithPanel
                    name="Kick / Ban"
                    description={<>
                        <p>Disruptive users will be kicked or banned whenever necessary.</p>
                        <p>This cannot be disabled.</p>
                    </>}
                    panel={<div className="w-32 cursor-not-allowed --btn --btn-3 bg-gray-580">Enabled</div>}
                />
                <ToggleBlock
                    name="Timeout challenges"
                    description="Disruptive users will be put in timeout whenever possible."
                    field="challenge_timeout_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                />
                <ToggleBlock
                    name="Interactive challenges"
                    description={<>
                        <p>Disruptive users will have to complete an interactive challenge to prove that they are human.</p>
                        <p>This means they have to authenticate using discord and under special circumstances solve a CAPTCHA.</p>
                    </>}
                    field="challenge_interactive_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                />
                {config.challenge_interactive_enabled && <>
                    <PlainBlock
                        name="Interactive role settings"
                        description="Give or take people who have to verify a role to deny them access to the server until they have verified."
                    >
                        <p className="mb-2 text-gray-200">
                            The role that is{" "}
                            <b>{config.challenge_interactive_take_role ? "taken" : "given"}</b>
                            {" "} after solving the challenge:
                        </p>
                        <DropdownSearch
                            placeholder="Select a role."
                            values={guild.roles.filter(role => role.can_control)}
                            current={config.challenge_interactive_role}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(guildId, {challenge_interactive_role: new_value}));
                                if(!success) return;
                                setConfig({...config, challenge_interactive_role: new_value});
                            }}
                        />
                        <Button
                            text={config.challenge_interactive_take_role ? "Take role" : "Give role"}
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(patchConfig(guildId, {challenge_interactive_take_role: !config.challenge_interactive_take_role}));
                                if(!success) return;
                                setConfig({...config, challenge_interactive_take_role: !config.challenge_interactive_take_role})
                            }}
                        />
                        <p className="mt-6 text-sm text-gray-300">
                            Role not listed? Make sure The Cleaner is above it in the role hierarchy.
                        </p>
                    </PlainBlock>
                    <PlainBlock
                        name="Send challenge embed"
                        description="Sends the challenge embed in the selected channel. Challenged people need access to this embed to solve their challenge and (re-)gain access to the server."
                    >
                        <DropdownSearch
                            placeholder="Select a channel."
                            values={guild.channels.filter(channel => guild.myself.permissions.ADMINISTRATOR || (channel.permissions.VIEW_CHANNEL && channel.permissions.SEND_MESSAGES && channel.permissions.EMBED_LINKS))}
                            current={sendChallengeInteractiveEmbedChannel}
                            setCurrent={setSendChallengeInteractiveEmbedChannel} 
                        />
                        <Button text="Send embed" disabled={!sendChallengeInteractiveEmbedChannel} className="mt-4" onClick={async () => {
                            const success = await doChange(postChallengeEmbed(guildId, sendChallengeInteractiveEmbedChannel), {loading: "Sending...", error: "Filed to send: ", success: "Embed sent"});
                            if(!success) return;
                            setSendChallengeInteractiveEmbedChannel(0);
                        }} />
                        <p className="mt-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send messages and embeds in it.
                        </p>
                    </PlainBlock>
                    
                    {entitlements.plan >= entitlements.challenge_interactive_join_risk ? (
                        <PlainBlock
                            name="Security Level"
                            description="Challenge people based on risk rating when joining."
                        >
                            <SecurityLevel config={config} setConfig={setConfig} guildId={guildId} unlocked={true} />
                        </PlainBlock>
                    ) : (
                        <BlockWithPanel
                            name="Security Level"
                            description="Challenge people based on risk rating when joining."
                            panel={<Upgrade plan={entitlements.challenge_interactive_join_risk} guildId={guildId} />}
                        >
                            <SecurityLevel config={config} setConfig={setConfig} guildId={guildId} />
                        </BlockWithPanel>
                    )}
                </>}
            </Section>
            {config.challenge_interactive_enabled && (
                <Section
                    name="Custom content"
                    description="Customize messages, images and other content."
                >
                <BlockWithPanel
                    name="Custom challenge embed"
                    description="Customize the text in the challenge embed."
                    panel={<OptionalUpgrade entitlements={entitlements} guildId={guildId} required={entitlements.challenge_interactive_custom_embed}>
                        <button className="w-32 --btn --btn-3 --btn-primary" disabled>Coming soon!</button>
                    </OptionalUpgrade>}
                />
                <BlockWithPanel
                    name="Custom interactive webpage"
                    description="Customize the contents on the webpage of interactive challenges."
                    panel={<OptionalUpgrade entitlements={entitlements} guildId={guildId} required={entitlements.challenge_interactive_custom_webpage}>
                        <button className="w-32 --btn --btn-3 --btn-primary" disabled>Coming soon!</button>
                    </OptionalUpgrade>}
                />
            </Section>
            )}
        </>
    )
}


function SecurityLevel({ config, setConfig, guildId, unlocked }) {
    const [challengeInteractiveSecurityLevel, setChallengeInteractiveSecurityLevel] = useState(config.challenge_interactive_level);
    const [challengeInteractiveJoinRisk, setChallengeInteractiveJoinRisk] = useState(config.challenge_interactive_joinrisk_custom);
    const securityLevels = [
        { name: "Custom", id: 0, disabled: !unlocked && "(Not unlocked)" },
        { name: "Off", id: 1, disabled: !unlocked && "(Not unlocked)" },
        { name: "Low", id: 2, value: 100 },
        { name: "Medium", id: 3, value: 70 },
        { name: "High", id: 4, value: 30 },
        { name: "I'm Under Attack", id: 5, value: 0 },
    ]

    return (
        <>
            <Dropdown
                values={securityLevels}
                current={challengeInteractiveSecurityLevel}
                setCurrent={async new_value => {
                    const success = await doChange(patchConfig(guildId, {challenge_interactive_level: new_value}));
                    if(!success) return;
                    setChallengeInteractiveSecurityLevel(new_value);
                }}
            />
            {challengeInteractiveSecurityLevel > 0 && <p className="mt-2">
                {challengeInteractiveSecurityLevel === 1 ? <>
                    Currently nobody has to complete a challenge.
                </> : challengeInteractiveSecurityLevel < 5 ? <>
                    Currently anyone with a risk rating above <b>{securityLevels[challengeInteractiveSecurityLevel].value}%</b> has to complete a challenge.
                </> : challengeInteractiveSecurityLevel === 5 && <>
                    Currently everyone has to complete a challenge.
                </>}
            </p>}
            {challengeInteractiveSecurityLevel === 0 && <>
                <p className="my-2">
                    {challengeInteractiveJoinRisk === 0 ? <>
                        Currently everyone has to complete a challenge.
                    </> : challengeInteractiveJoinRisk === 100 ? <>
                        Currently only the most disruptive users have to complete a challenge.
                    </> : <>
                        Currently anyone with a risk rating above <b>{challengeInteractiveJoinRisk}%</b> has to complete a challenge.
                    </>}
                </p>
                <Slider value={challengeInteractiveJoinRisk} setValue={setChallengeInteractiveJoinRisk} minValue={0} maxValue={100} step={1} />
                <Button
                    text="Save"
                    disabled={challengeInteractiveJoinRisk === config.challenge_interactive_joinrisk_custom}
                    onClick={async () => {
                        const success = await doChange(patchConfig(guildId, {challenge_interactive_joinrisk_custom: challengeInteractiveJoinRisk}));
                        if(!success) return;
                        setConfig({...config, challenge_interactive_joinrisk_custom: challengeInteractiveJoinRisk});
                    }}
                />
            </>}
        </>
    )
}
