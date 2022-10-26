import { useEffect, useState } from "react";

import ErrorHandler from "@/components/dash/error.jsx";
import { Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { MultilineTextInput, DropdownSearch } from "@/components/dash/ui.jsx";
import { doChange, getLinkFilterList, patchLinkFilterList } from "@/lib/api.js";

export default function LinkFilterComponent({
    route,
    guild,
    config,
    updateConfig,
    entitlements,
}) {
    const [whitelistLinks, setWhitelistLinks] = useState();
    const [blacklistLinks, setBlacklistLinks] = useState();
    useEffect(() => {
        getLinkFilterList(route.guildId)
            .then((response) => {
                setWhitelistLinks(response.data.whitelist);
                setBlacklistLinks(response.data.blacklist);
            })
            .catch((error) => {
                setWhitelistLinks(error);
                setBlacklistLinks(error);
            });
    }, []);

    const linkFilterChannel =
        guild.channels &&
        guild.channels.find(
            (channel) => channel.id === config.linkfilter_channel
        );

    return (
        <Section>
            <ToggleBlock
                name="Enable Link Filter"
                description="Link Filter will go brrr and delete all links."
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
                field="linkfilter_enabled"
                entitlement={entitlements.linkfilter}
                entitlements={entitlements}
            />
            {config.linkfilter_enabled && (
                <>
                    <PlainBlock
                        name="Link verification channel"
                        description="Select the channel where unknown links will be sent to for verification. You can manually white-/blacklist links as they come in without going to the dashboard."
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
                            current={config.linkfilter_channel}
                            setCurrent={async (new_value) => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        linkfilter_channel: new_value,
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    linkfilter_channel: new_value,
                                });
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Channel not listed? Make sure The Cleaner can send
                            messages and embeds in it.
                        </p>
                        {config.linkfilter_channel === "0" && (
                            <Attention>No logging channel selected.</Attention>
                        )}
                        {guild.channels &&
                            (linkFilterChannel
                                ? !(
                                      linkFilterChannel.permissions
                                          .ADMINISTRATOR ||
                                      (linkFilterChannel.permissions
                                          .VIEW_CHANNEL &&
                                          linkFilterChannel.permissions
                                              .SEND_MESSAGES &&
                                          linkFilterChannel.permissions
                                              .EMBED_LINKS)
                                  ) && (
                                      <Attention>
                                          The Cleaner can not send messages and
                                          embeds in the current logging channel.
                                          Please select a new one or give me the
                                          missing permissions.
                                      </Attention>
                                  )
                                : config.linkfilter_channel !== "0" && (
                                      <Attention>
                                          The logging channel has been deleted.
                                          Please select a new one.
                                      </Attention>
                                  ))}
                    </PlainBlock>
                    <ToggleBlock
                        name="Block all unknown links"
                        description="All links that are not whitelisted will be deleted until a moderator whiteslists them."
                        config={config}
                        updateConfig={updateConfig}
                        guildId={route.guildId}
                        field="linkfilter_blockunknown"
                        entitlement={entitlements.linkfilter}
                        entitlements={entitlements}
                    />
                    <LinkBlock
                        name="Whitelisted links"
                        description="Links that will be ignored."
                        field="whitelist"
                        links={whitelistLinks}
                        setLinks={setWhitelistLinks}
                        route={route}
                    />
                    <LinkBlock
                        name="Blacklisted links"
                        description="Links that will be removed."
                        field="blacklist"
                        links={blacklistLinks}
                        setLinks={setBlacklistLinks}
                        route={route}
                    />
                </>
            )}
        </Section>
    );
}

function LinkBlock({ name, description, field, links, setLinks, route }) {
    return (
        <PlainBlock name={name} description={description}>
            {links === undefined ? (
                <p>Loading links</p>
            ) : links.message ? (
                <ErrorHandler error={links} />
            ) : (
                <LinkSelectorBox
                    route={route}
                    field={field}
                    links={links}
                    setLinks={setLinks}
                />
            )}
        </PlainBlock>
    );
}

function LinkSelectorBox({ route, field, links, setLinks }) {
    const [input, setInput] = useState(links.join("\n"));
    const [saving, setSaving] = useState(false);
    return (
        <>
            <MultilineTextInput
                placeholder="Links in here."
                value={input}
                setValue={setInput}
            />
            <button
                className="--btn --btn-primary --btn-0 w-60"
                disabled={
                    saving || input.split(/\s+/).join(" ") === links.join(" ")
                }
                onClick={() => {
                    setSaving(true);
                    doChange(
                        patchLinkFilterList(route.guildId, {
                            [field]: input.split(/\s+/),
                        })
                    ).then((response) => {
                        setSaving(false);
                        if (!response) return;
                        setLinks(input.split(/\s+/));
                    });
                }}
            >
                Save
            </button>
        </>
    );
}
