import { useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import {
    ToggleBlock,
    PlainBlock,
    BlockWithPanel,
} from "@/components/dash/block.jsx";
import { TextInput, Dropdown, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function AntiRaidComponent({
    config,
    updateConfig,
    route,
    guild,
}) {
    const [antiRaidLimit, setAntiRaidLimit] = useState(config.antiraid_limit);
    const [updating, setUpdating] = useState(false);

    return (
        <>
            <Section>
                <ToggleBlock
                    name="Enable Anti Raid"
                    description="Enable raid protection. Kicks new members after a threshold has been reached."
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                    field="antiraid_enabled"
                >
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.KICK_MEMBERS
                        ) && (
                            <Attention>
                                Missing permission to kick members! This feature
                                will not work without it.
                            </Attention>
                        )}
                </ToggleBlock>
                {config.antiraid_enabled && (
                    <>
                        <PlainBlock
                            name="Join limit"
                            description={
                                <>
                                    <p>
                                        Format is `limit/seconds`. For example
                                        `5/10` means &quot;max 5 joins in 10
                                        seconds&quot;.
                                    </p>
                                    <p>
                                        You cannot chose more than 99,999 joins
                                        and the timeframe cannot be over 999
                                        seconds.
                                    </p>
                                </>
                            }
                        >
                            <p>
                                Max {antiRaidLimit.split("/")[0]} joins in{" "}
                                {antiRaidLimit.split("/")[1]} seconds.
                            </p>
                            <TextInput
                                placeholder="10/10"
                                value={antiRaidLimit}
                                setValue={setAntiRaidLimit}
                                className="mt-2 mb-4"
                            />
                            <button
                                className="w-32 --btn --btn-3 --btn-primary"
                                disabled={
                                    antiRaidLimit === config.antiraid_limit
                                }
                                onClick={async () => {
                                    const new_value = antiRaidLimit;
                                    setAntiRaidLimit(config.antiraid_limit);
                                    const success = await doChange(
                                        patchConfig(route.guildId, {
                                            antiraid_limit: new_value,
                                        })
                                    );
                                    if (!success) return;
                                    setAntiRaidLimit(new_value);
                                    updateConfig({
                                        antiraid_limit: new_value,
                                    });
                                }}
                            >
                                Save
                            </button>
                        </PlainBlock>
                        <BlockWithPanel
                            name="Anti Raid mode"
                            description={
                                <>
                                    <p>
                                        Restrict the join limit to a group of
                                        people who created their Discord in a
                                        certain timespan.
                                    </p>
                                    <p>
                                        For example, setting the limit to 5/5
                                        and the mode to &quot;Within one
                                        day&quot; will kick when 5 people who
                                        created their account on the same day
                                        join within 5 seconds.
                                    </p>
                                </>
                            }
                            panel={
                                <Dropdown
                                    values={[
                                        { name: "All time", id: 0 },
                                        { name: "Within one day", id: 1 },
                                        { name: "Within 3 days", id: 2 },
                                        { name: "Within one week", id: 3 },
                                    ]}
                                    current={config.antiraid_mode}
                                    setCurrent={async (new_value) => {
                                        setUpdating(true);
                                        const success = await doChange(
                                            patchConfig(route.guildId, {
                                                antiraid_mode: new_value,
                                            })
                                        );
                                        setUpdating(false);
                                        if (!success) return;
                                        updateConfig({
                                            antiraid_mode: new_value,
                                        });
                                    }}
                                    disabled={updating}
                                    className="w-40"
                                />
                            }
                        />
                    </>
                )}
            </Section>
        </>
    );
}
