import { useState } from "react";
import Link from "next/link";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import {
    PlainBlock,
    BlockWithPanel,
    ToggleBlock,
} from "@/components/dash/block.jsx";
import {
    Upgrade,
    Button,
    Dropdown,
    DropdownSearch,
    OptionalUpgrade,
    Slider,
    Attention,
} from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig, postChallengeEmbed } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Challenge | The Cleaner Dashboard" />
            <Page page="challenge" {...data}>
                <ChallengeDashboard {...data} />
            </Page>
        </>
    );
}

function ChallengeDashboard({
    config,
    setConfig,
    entitlements,
    guild,
    guildId,
}) {
    const [
        sendChallengeInteractiveEmbedChannel,
        setSendChallengeInteractiveEmbedChannel,
    ] = useState("");
    const interactiveRole =
        guild.roles &&
        guild.roles.find(
            (role) => role.id === config.challenge_interactive_role
        );

    return (
        <>
            <Header name="Challenges">
                <p>Control which challenges are issued.</p>
                <p>
                    <b>Note:</b> Ratelimits on timeouting or giving roles are
                    harsh. If the ratelimit is reached, The Cleaner will
                    fallback to kicking or banning.
                </p>
            </Header>
            <Section>
                <BlockWithPanel
                    name="Kick / Ban"
                    description={
                        <>
                            <p>
                                Disruptive users will be kicked or banned
                                whenever necessary.
                            </p>
                            <p>This cannot be disabled.</p>
                        </>
                    }
                    panel={
                        <div className="w-32 cursor-not-allowed --btn --btn-3 bg-gray-580">
                            Enabled
                        </div>
                    }
                >
                    <div className="space-y-2">
                        {guild.myself &&
                            !(
                                guild.myself.permissions.ADMINISTRATOR ||
                                guild.myself.permissions.BAN_MEMBERS
                            ) && (
                                <Attention>
                                    Missing permission to ban members! This will
                                    drastically negatively impact my performance
                                    during raids.
                                </Attention>
                            )}
                        {guild.myself &&
                            !(
                                guild.myself.permissions.ADMINISTRATOR ||
                                guild.myself.permissions.KICK_MEMBERS
                            ) && (
                                <Attention>
                                    Missing permission to kick members! This
                                    will drastically negatively impact my
                                    performance during raids.
                                </Attention>
                            )}
                    </div>
                </BlockWithPanel>
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
                    description={
                        <>
                            <p>
                                Disruptive users will have to complete an
                                interactive challenge to prove that they are
                                human.
                            </p>
                            <p>
                                This means they have to authenticate using
                                discord and under special circumstances solve a
                                CAPTCHA.
                            </p>
                        </>
                    }
                    field="challenge_interactive_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                >
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.MANAGE_ROLES
                        ) && (
                            <Attention>
                                Missing permission to manage roles! I cannot
                                give or take roles.
                            </Attention>
                        )}
                </ToggleBlock>
                {config.challenge_interactive_enabled && (
                    <>
                        <PlainBlock
                            name="Interactive role settings"
                        >
                            <p className="mb-2 text-gray-200">
                                The role that is{" "}
                                <b>
                                    {config.challenge_interactive_take_role
                                        ? "taken"
                                        : "given"}
                                </b>{" "}
                                after solving the challenge:
                            </p>
                            <DropdownSearch
                                placeholder={
                                    guild.roles
                                        ? "Select a role."
                                        : "Role list is unavailable. Refresh the page or contact support."
                                }
                                values={
                                    guild.roles
                                        ? guild.roles.filter(
                                              (role) => role.can_control
                                          )
                                        : []
                                }
                                current={config.challenge_interactive_role}
                                setCurrent={async (new_value) => {
                                    const success = await doChange(
                                        patchConfig(guildId, {
                                            challenge_interactive_role:
                                                new_value,
                                        })
                                    );
                                    if (!success) return;
                                    setConfig({
                                        ...config,
                                        challenge_interactive_role: new_value,
                                    });
                                }}
                            />
                            <Button
                                text={
                                    config.challenge_interactive_take_role
                                        ? "Take role"
                                        : "Give role"
                                }
                                className="mt-4"
                                onClick={async () => {
                                    const success = await doChange(
                                        patchConfig(guildId, {
                                            challenge_interactive_take_role:
                                                !config.challenge_interactive_take_role,
                                        })
                                    );
                                    if (!success) return;
                                    setConfig({
                                        ...config,
                                        challenge_interactive_take_role:
                                            !config.challenge_interactive_take_role,
                                    });
                                }}
                            />
                            <p className="my-6 text-sm text-gray-300">
                                Role not listed?{" "}
                                <Link href="/help/role-restrictions">
                                    <a className="font-bold text-gray-300 hover:underline">
                                        Find out why.
                                    </a>
                                </Link>
                            </p>
                            {config.challenge_interactive_role === "0" && (
                                <Attention>No role selected.</Attention>
                            )}
                            {guild.roles &&
                                (interactiveRole
                                    ? !interactiveRole.can_control && (
                                          <Attention>
                                              The Cleaner can not control the
                                              current role.{" "}
                                              <Link href="/help/role-restrictions">
                                                  <a className="font-bold text-gray-300 hover:underline">
                                                      Find out why.
                                                  </a>
                                              </Link>
                                          </Attention>
                                      )
                                    : config.challenge_interactive_role !==
                                          "0" && (
                                          <Attention>
                                              The role has been deleted. Please
                                              select a new one.
                                          </Attention>
                                      ))}
                        </PlainBlock>
                        <PlainBlock
                            name="Send challenge embed"
                            description="Sends the challenge embed in the selected channel. Challenged people need access to this embed to solve their challenge and (re-)gain access to the server."
                        >
                            <DropdownSearch
                                placeholder={
                                    guild.channels && guild.myself
                                        ? "Select a channel."
                                        : "Channel list is unavailable. Refresh the page or contact support."
                                }
                                values={
                                    guild.channels && guild.myself
                                        ? guild.channels.filter(
                                              (channel) =>
                                                  guild.myself.permissions
                                                      .ADMINISTRATOR ||
                                                  (channel.permissions
                                                      .VIEW_CHANNEL &&
                                                      channel.permissions
                                                          .SEND_MESSAGES &&
                                                      channel.permissions
                                                          .EMBED_LINKS)
                                          )
                                        : []
                                }
                                current={sendChallengeInteractiveEmbedChannel}
                                setCurrent={
                                    setSendChallengeInteractiveEmbedChannel
                                }
                            />
                            <Button
                                text={
                                    config.branding_embed_enabled
                                        ? "Send custom embed"
                                        : "Send embed"
                                }
                                disabled={!sendChallengeInteractiveEmbedChannel}
                                className="mt-4"
                                onClick={async () => {
                                    const success = await doChange(
                                        postChallengeEmbed(
                                            guildId,
                                            sendChallengeInteractiveEmbedChannel
                                        ),
                                        {
                                            loading: "Sending...",
                                            error: "Filed to send: ",
                                            success: "Embed sent",
                                        }
                                    );
                                    if (!success) return;
                                    setSendChallengeInteractiveEmbedChannel(0);
                                }}
                            />
                            <p className="mt-6 text-sm text-gray-300">
                                Channel not listed? Make sure The Cleaner can
                                send messages and embeds in it.
                            </p>
                        </PlainBlock>

                        {entitlements.plan >=
                        entitlements.challenge_interactive_join_risk ? (
                            <PlainBlock
                                name="Security Level"
                                description="Challenge people based on risk rating when joining."
                            >
                                <SecurityLevel
                                    config={config}
                                    setConfig={setConfig}
                                    guildId={guildId}
                                    unlocked={true}
                                />
                            </PlainBlock>
                        ) : (
                            <BlockWithPanel
                                name="Security Level"
                                description="Challenge people based on risk rating when joining."
                                panel={
                                    <Upgrade
                                        plan={
                                            entitlements.challenge_interactive_join_risk
                                        }
                                        guildId={guildId}
                                    />
                                }
                            >
                                <SecurityLevel
                                    config={config}
                                    setConfig={setConfig}
                                    guildId={guildId}
                                />
                            </BlockWithPanel>
                        )}
                    </>
                )}
            </Section>
        </>
    );
}

function SecurityLevel({ config, setConfig, guildId, unlocked }) {
    const [
        challengeInteractiveSecurityLevel,
        setChallengeInteractiveSecurityLevel,
    ] = useState(config.challenge_interactive_level);
    const [challengeInteractiveJoinRisk, setChallengeInteractiveJoinRisk] =
        useState(config.challenge_interactive_joinrisk_custom);
    const securityLevels = [
        { name: "Custom", id: 0, disabled: !unlocked && "(Not unlocked)" },
        { name: "Off", id: 1, disabled: !unlocked && "(Not unlocked)" },
        { name: "Low", id: 2, value: 100 },
        { name: "Medium", id: 3, value: 70 },
        { name: "High", id: 4, value: 30 },
        { name: "I'm Under Attack", id: 5, value: 0 },
    ];

    return (
        <>
            <Dropdown
                values={securityLevels}
                current={challengeInteractiveSecurityLevel}
                setCurrent={async (new_value) => {
                    const success = await doChange(
                        patchConfig(guildId, {
                            challenge_interactive_level: new_value,
                        })
                    );
                    if (!success) return;
                    setChallengeInteractiveSecurityLevel(new_value);
                }}
            />
            {challengeInteractiveSecurityLevel > 0 && (
                <p className="mt-2">
                    {challengeInteractiveSecurityLevel === 1 ? (
                        <>Currently nobody has to complete a challenge.</>
                    ) : challengeInteractiveSecurityLevel < 5 ? (
                        <>
                            Currently anyone with a risk rating above{" "}
                            <b>
                                {
                                    securityLevels[
                                        challengeInteractiveSecurityLevel
                                    ].value
                                }
                                %
                            </b>{" "}
                            has to complete a challenge.
                        </>
                    ) : (
                        challengeInteractiveSecurityLevel === 5 && (
                            <>Currently everyone has to complete a challenge.</>
                        )
                    )}
                </p>
            )}
            {challengeInteractiveSecurityLevel === 0 && (
                <>
                    <p className="my-2">
                        {challengeInteractiveJoinRisk === 0 ? (
                            <>Currently everyone has to complete a challenge.</>
                        ) : challengeInteractiveJoinRisk === 100 ? (
                            <>
                                Currently only the most disruptive users have to
                                complete a challenge.
                            </>
                        ) : (
                            <>
                                Currently anyone with a risk rating above{" "}
                                <b>{challengeInteractiveJoinRisk}%</b> has to
                                complete a challenge.
                            </>
                        )}
                    </p>
                    <Slider
                        value={challengeInteractiveJoinRisk}
                        setValue={setChallengeInteractiveJoinRisk}
                        minValue={0}
                        maxValue={100}
                        step={1}
                    />
                    <Button
                        text="Save"
                        disabled={
                            challengeInteractiveJoinRisk ===
                            config.challenge_interactive_joinrisk_custom
                        }
                        onClick={async () => {
                            const success = await doChange(
                                patchConfig(guildId, {
                                    challenge_interactive_joinrisk_custom:
                                        challengeInteractiveJoinRisk,
                                })
                            );
                            if (!success) return;
                            setConfig({
                                ...config,
                                challenge_interactive_joinrisk_custom:
                                    challengeInteractiveJoinRisk,
                            });
                        }}
                    />
                </>
            )}
        </>
    );
}
