import { useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock } from "@/components/dash/block.jsx";
import { Button, Attention, TextInput } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";
import { durationToText, textToDuration } from "@/lib/duration.js";

export default function TimeLimitComponent({
    config,
    updateConfig,
    guild,
    route,
}) {
    const [timeLimit, setTimeLimit] = useState(
        durationToText(config.verification_timelimit)
    );

    return (
        <Section>
            <ToggleBlock
                name="Verification Timelimit"
                description="Users will kicked if they don't gain a role within the timelimit."
                field="verification_timelimit_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
            >
                {guild.myself &&
                    !(
                        guild.myself.permissions.ADMINISTRATOR ||
                        guild.myself.permissions.KICK_MEMBERS
                    ) && (
                        <Attention className="mt-6">
                            Missing permission to kick members! This feature
                            will not work without it.
                        </Attention>
                    )}
            </ToggleBlock>
            {config.verification_timelimit_enabled && (
                <>
                    <PlainBlock
                        name="Timelimit"
                        description="Users that don't verify (or gain a role) within the timelimit will be kicked."
                    >
                        <TextInput
                            placeholder="Timelimit to kick after"
                            value={timeLimit}
                            setValue={(value) => {
                                if (textToDuration(value) === undefined)
                                    return null;
                                setTimeLimit(value);
                            }}
                            maxLength={10}
                        />

                        <Button
                            text="Save timelimit"
                            disabled={
                                textToDuration(timeLimit) ===
                                    config.verification_timelimit ||
                                textToDuration(timeLimit) < 60 ||
                                textToDuration(timeLimit) > 60 * 60 * 24 * 7
                            }
                            className="mt-4"
                            onClick={async () => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        verification_timelimit:
                                            textToDuration(timeLimit),
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    verification_timelimit:
                                        textToDuration(timeLimit),
                                });
                            }}
                        />
                        {textToDuration(timeLimit) < 60 && (
                            <p className="mt-6 text-red-400">
                                Must not be shorter than 60 seconds.
                            </p>
                        )}
                        {textToDuration(timeLimit) > 60 * 60 * 24 * 7 && (
                            <p className="mt-6 text-red-400">
                                Must not be longer than 7 days.
                            </p>
                        )}
                    </PlainBlock>
                </>
            )}
        </Section>
    );
}
