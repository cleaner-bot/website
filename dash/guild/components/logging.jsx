import Link from "next/link";

import { Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { DropdownSearch, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function LoggingComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
}) {
    const loggingChannel =
        guild.channels &&
        guild.channels.find((channel) => channel.id === config.logging_channel);
    return (
        <Section>
            <ToggleBlock
                name="Enable logging"
                description="Logging allows you to get notified about actions The Cleaner is performing."
                field="logging_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
            />
            {config.logging_enabled && (
                <>
                    <PlainBlock
                        name="Logging channel"
                        description="Select the channel where logs will be sent to."
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
                            current={config.logging_channel}
                            setCurrent={async (new_value) => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        logging_channel: new_value,
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    logging_channel: new_value,
                                });
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send
                            messages and embeds in it.
                        </p>
                        {config.logging_channel === "0" && (
                            <Attention>No logging channel selected.</Attention>
                        )}
                        {guild.channels &&
                            (loggingChannel
                                ? !(
                                      loggingChannel.permissions
                                          .ADMINISTRATOR ||
                                      (loggingChannel.permissions
                                          .VIEW_CHANNEL &&
                                          loggingChannel.permissions
                                              .SEND_MESSAGES &&
                                          loggingChannel.permissions
                                              .EMBED_LINKS)
                                  ) && (
                                      <Attention>
                                          The Cleaner can not send messages and
                                          embeds in the current logging channel.
                                          Please select a new one or give me the
                                          missing permissions.
                                      </Attention>
                                  )
                                : config.logging_channel !== "0" && (
                                      <Attention>
                                          The logging channel has been deleted.
                                          Please select a new one.
                                      </Attention>
                                  ))}
                    </PlainBlock>
                    <ToggleBlock
                        name="Join log"
                        description="Logs member joins."
                        field="logging_option_join"
                        config={config}
                        updateConfig={updateConfig}
                        guildId={route.guildId}
                    />
                    <ToggleBlock
                        name="Leave log"
                        description="Logs member leaves."
                        field="logging_option_leave"
                        config={config}
                        updateConfig={updateConfig}
                        guildId={route.guildId}
                    />
                    <ToggleBlock
                        name="Downloads"
                        description={
                            <>
                                <p>
                                    We&apos;ll save all your logs, so they can
                                    be inspected even if the Discord log becomes
                                    unavailable.
                                </p>
                                <p>
                                    We guarantee your logs to be available for{" "}
                                    <b>{entitlements.logging_retention}</b>{" "}
                                    month
                                    {entitlements.logging_retention !== 1 &&
                                        "s"}
                                    , after that they may be removed to save
                                    storage.
                                </p>
                            </>
                        }
                        field="logging_downloads_enabled"
                        config={config}
                        updateConfig={updateConfig}
                        guildId={route.guildId}
                        entitlement={entitlements.logging_downloads}
                        entitlements={entitlements}
                    >
                        {entitlements.plan >= entitlements.logging_downloads &&
                            config.logging_downloads_enabled && (
                                <>
                                    <p>We are collecting your logs now!</p>
                                    <p>
                                        Due to architectural constraints, we
                                        can&apos;t provide a direct download.{" "}
                                        <Link
                                            href={`/dash/${guildId}/contact`}
                                            className="hover:underline"
                                        >
                                            Contact us
                                        </Link>{" "}
                                        for downloads.
                                    </p>
                                </>
                            )}
                    </ToggleBlock>
                </>
            )}
        </Section>
    );
}
