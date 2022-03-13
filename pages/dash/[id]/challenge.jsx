
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Toggle, Button, Dropdown, DropdownSearch, OptionalUpgrade, Slider, JustBlock, BlockRightSide, HorizontalRule } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Challenge | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={ChallengeDashboard} current="challenge" />
        </>
    )
}


function ChallengeDashboard({ data }) {
    const [challengeInteractiveRoleID, setChallengeInteractiveRoleID] = useState(data.config.challenge_interactive_role);
    const [challengeInteractiveTakeRole, setChallengeInteractiveTakeRole] = useState(data.config.challenge_interactive_take_role === "yes");
    const [challengeInteractiveSecurityLevel, setChallengeInteractiveSecurityLevel] = useState(+data.config.challenge_interactive_level)
    const [challengeInteractiveJoinRisk, setChallengeInteractiveJoinRisk] = useState(+data.config.challenge_interactive_joinrisk_custom);

    const [sendChallengeInteractiveEmbedChannel, setSendChallengeInteractiveEmbedChannel] = useState("");

    const challengeInteractiveJoinRiskAccess = data.entitlements.challenge_interactive_join_risk <= data.entitlements.plan;
    const securityLevels = [
        { name: "Custom", id: 0, disabled: !challengeInteractiveJoinRiskAccess && "(Upgrade required)" },
        { name: "Off", id: 1, disabled: !challengeInteractiveJoinRiskAccess && "(Upgrade required)" },
        { name: "Low", id: 2, value: 100 },
        { name: "Medium", id: 3, value: 70 },
        { name: "High", id: 4, value: 30 },
        { name: "I'm Under Attack", id: 5, value: 0 },
    ]

    return (
        <>
            <h1 className="text-2xl">
                Challenge
            </h1>
            <p className="mt-2 text-gray-300">
                Control challenges.
            </p>
            <p className="mt-2 text-gray-200">
                <b>Note:</b> Ratelimits on timeouting or giving roles are harsh. If the ratelimit is reached, The Cleaner will fallback to kicking or banning.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <div className="w-32 cursor-not-allowed --btn --btn-3 bg-gray-580">
                            Enabled
                        </div>
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Kick / ban
                    </h2>
                    <p className="text-gray-200">
                        Disruptive users will be kicked or banned whenever necessary.
                    </p>
                    <p className="text-gray-200">
                        This cannot be disabled.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="challenge_timeout_enabled" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Timeout challenges
                    </h2>
                    <p className="text-gray-200">
                        Disruptive users will be put in timeout whenever possible.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="challenge_interactive_enabled" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Interactive challenges
                    </h2>
                    <p className="text-gray-200">
                        Disruptive users will have to complete an interactive challenge to prove that they are human.
                    </p>
                    <p className="text-gray-200">
                        This means they have to authenticate using discord and under special circumstances solve a CAPTCHA.
                    </p>
                </BlockRightSide>
                {data.config.challenge_interactive_enabled === "yes" && <>
                    <JustBlock>
                        <h2 className="text-2xl font-medium">
                            Interactive role settings
                        </h2>
                        <p className="mb-4 text-gray-200">
                            This is required for treating people who have to solve a challenge differently from normal people. (eg making them unable to speak in channels)
                        </p>
                        <p className="mb-2 text-gray-200">
                            The role that is{" "}
                            <b>{challengeInteractiveTakeRole ? "taken" : "given"}</b>
                            {" "}when after solving the challenge:
                        </p>
                        
                        <DropdownSearch
                            placeholder="Select a role."
                            values={data.guild.roles.filter(role => role.can_control)}
                            current={challengeInteractiveRoleID}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(data.guild.id, {challenge_interactive_role: new_value}));
                                if(!success) return;
                                setChallengeInteractiveRoleID(new_value);
                            }}
                        />
                        <Button
                            text={challengeInteractiveTakeRole ? "Take role" : "Give role"}
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(patchConfig(data.guild.id, {challenge_interactive_take_role: !challengeInteractiveTakeRole}));
                                if(!success) return;
                                setChallengeInteractiveTakeRole(!challengeInteractiveTakeRole);
                            }}
                        />
                        <p className="mt-6 text-sm text-gray-300">
                            Role not listed? Make sure The Cleaner is above it in the role hierarchy.
                        </p>
                    </JustBlock>
                    <JustBlock>
                        <h2 className="text-2xl font-medium">
                            Send challenge embed
                        </h2>
                        <p className="mb-2 text-gray-200">
                            Sends the challenge embed in the selected channel.
                            Challenged people need access to this embed to solve their challenge and (re-)gain access to the server.
                        </p>
                        <DropdownSearch
                            placeholder="Select a channel."
                            values={data.guild.channels.filter(channel => data.guild.me.permissions.administrator || (channel.permissions.read_messages && channel.permissions.send_messages && channel.permissions.embed_links))}
                            current={sendChallengeInteractiveEmbedChannel}
                            setCurrent={setSendChallengeInteractiveEmbedChannel} 
                        />
                        <Button text="Send embed" disabled={!sendChallengeInteractiveEmbedChannel} className="mt-4" />
                        <p className="mt-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send messages and embeds in it.
                        </p>
                    </JustBlock>

                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.challenge_interactive_join_risk} />
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Security Level
                        </h2>
                        <p className="mb-2 text-gray-200">
                            Challenge people based on risk rating when joining.
                        </p>
                        <Dropdown values={securityLevels} current={challengeInteractiveSecurityLevel} setCurrent={setChallengeInteractiveSecurityLevel} />
                        {challengeInteractiveSecurityLevel < 5 && <p className="mt-2">
                            {challengeInteractiveSecurityLevel === 0 ? <>
                                Currently nobody has to complete a challenge.
                            </> : challengeInteractiveSecurityLevel < 4 ? <>
                                Currently anyone with a risk rating above <b>{securityLevels[challengeInteractiveSecurityLevel].value}%</b> has to complete a challenge.
                            </> : challengeInteractiveSecurityLevel === 4 && <>
                                Currently everyone has to complete a challenge.
                            </>}
                        </p>}
                        {challengeInteractiveSecurityLevel === 5 && <>
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
                        </>}
                    </BlockRightSide>

                    <HorizontalRule />
                    
                    <div>
                        <h1 className="text-2xl">
                            Custom content
                        </h1>
                        <p className="mt-2 text-gray-300">
                            Customize messages and images.
                        </p>
                    </div>

                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.challenge_interactive_custom_embed}>
                                <Button
                                    text="Save"
                                    onClick={() => {
                                        toast.success("hi")
                                    }}
                                />

                            </OptionalUpgrade>
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Custom challenge embed
                        </h2>
                        <p className="mb-2 text-gray-200">
                            Customize the text in the challenge embed.
                        </p>
                    </BlockRightSide>

                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.challenge_interactive_custom_webpage}>
                                <Button
                                    text="Save"
                                    onClick={() => {
                                        toast.success("hi")
                                    }}
                                />
                            </OptionalUpgrade>
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Custom interactive webpage
                        </h2>
                        <p className="mb-2 text-gray-200">
                            Customize the contents on the webpage of interactive challenges.
                        </p>
                    </BlockRightSide>
                </>}
            </div>
        </>
    )
}
