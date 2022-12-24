import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock } from "@/components/dash/block.jsx";
import {
    Button,
    DropdownSearch,
    Attention,
    TextInput,
} from "@/components/dash/ui.jsx";
import { doChange, patchConfig, postVerificationMessage } from "@/lib/api.js";
import { durationToText, textToDuration } from "@/lib/duration.js";

export default function VerificationComponent({
    config,
    updateConfig,
    guild,
    route,
}) {
    const [messageChannel, setMessageChannel] = useState("");
    const [minAge, setMinAge] = useState(
        durationToText(config.verification_age)
    );
    const verificationRole =
        guild.roles &&
        guild.roles.find((role) => role.id === config.verification_role);

    return (
        <Section>
            <ToggleBlock
                name="Verification"
                description="Users are forced to verify they are human by solving a CAPTCHA."
                field="verification_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
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
            {config.verification_enabled && (
                <>
                    <PlainBlock name="Verification role">
                        <p className="mb-2 text-gray-200">
                            The role that is{" "}
                            <b>
                                {config.verification_take_role
                                    ? "taken"
                                    : "given"}
                            </b>{" "}
                            after verifying:
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
                            current={config.verification_role}
                            setCurrent={async (new_value) => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        verification_role: new_value,
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    verification_role: new_value,
                                });
                            }}
                        />
                        <Button
                            text={
                                config.verification_take_role
                                    ? "Take role"
                                    : "Give role"
                            }
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        verification_take_role:
                                            !config.verification_take_role,
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    verification_take_role:
                                        !config.verification_take_role,
                                });
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Role not listed?{" "}
                            <Link
                                href="https://docs.cleanerbot.xyz/misc/roles"
                                className="font-bold text-gray-300 hover:underline"
                            >
                                Find out why.
                            </Link>
                        </p>
                        {config.verification_role === "0" && (
                            <Attention>No role selected.</Attention>
                        )}
                        {guild.roles &&
                            (verificationRole
                                ? !verificationRole.can_control && (
                                        <Attention>
                                            The Cleaner can not control the
                                            current role.{" "}
                                            <Link
                                                href="https://docs.cleanerbot.xyz/misc/roles"
                                                className="font-bold text-gray-300 hover:underline"
                                            >
                                                Find out why.
                                            </Link>
                                        </Attention>
                                    )
                                : config.verification_role !== "0" && (
                                        <Attention>
                                            The role has been deleted. Please
                                            select a new one.
                                        </Attention>
                                    ))}
                    </PlainBlock>
                    <PlainBlock
                        name="Send verification message"
                        description="Sends the verification message in the selected channel. Unverified users need access to this message to verify and gain access to the server."
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
                            current={messageChannel}
                            setCurrent={setMessageChannel}
                        />
                        <Button
                            text={
                                config.branding_embed_enabled
                                    ? "Send custom message"
                                    : "Send message"
                            }
                            disabled={!messageChannel}
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(
                                    postVerificationMessage(
                                        route.guildId,
                                        messageChannel
                                    ),
                                    {
                                        loading: "Sending...",
                                        error: "Failed to send: ",
                                        success: "Message sent",
                                    }
                                );
                                if (!success) return;
                                setMessageChannel(0);
                            }}
                        />
                        <p className="mt-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can
                            send messages and embeds in it.
                        </p>
                    </PlainBlock>

                    <PlainBlock
                        name="Verification passthrough"
                        description={
                            <>
                                <p>
                                    Users older than the set age won't have
                                    to solve a CAPTCHA the first time and
                                    are instead passed through immediately.
                                </p>
                                <p className="text-sm font-light text-gray-300">
                                    This replaces the old risk rating
                                    system.
                                </p>
                            </>
                        }
                    >
                        <TextInput
                            placeholder="Minimum age to passthrough (eg 30d)"
                            value={minAge}
                            setValue={(value) => {
                                if (textToDuration(value) === undefined)
                                    return null;
                                setMinAge(value);
                            }}
                            maxLength={10}
                        />

                        <Button
                            text="Save minimum age for passthrough"
                            disabled={
                                textToDuration(minAge) ===
                                config.verification_age
                            }
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        verification_age:
                                            textToDuration(minAge),
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    verification_age:
                                        textToDuration(minAge),
                                });
                            }}
                        />
                    </PlainBlock>
                </>
            )}
        </Section>
    );
}
