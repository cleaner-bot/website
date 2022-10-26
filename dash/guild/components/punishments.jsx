import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel, ToggleBlock } from "@/components/dash/block.jsx";
import { Attention } from "@/components/dash/ui.jsx";

export default function PunishmentsComponent({
    config,
    updateConfig,
    guild,
    route,
    updateRoute,
}) {
    return (
        <>
            <Description>
                <p>
                    <b>Note:</b> Ratelimits on timeouting or giving roles are
                    rather harsh at around 10 per 10 seconds. If the ratelimit
                    is reached, The Cleaner will fallback to kicking or banning
                    to protect your server.
                </p>
                <p className="mt-2">
                    Please see{" "}
                    <Link href="https://docs.cleanerbot.xyz/misc/punishments/">
                        <a className="font-bold font-gray-300 hover:underline">
                            the docs
                        </a>
                    </Link>{" "}
                    for more information.
                </p>
            </Description>
            <Section>
                <ToggleBlock
                    name="Timeout punishments"
                    description="Disruptive users will be put in timeout whenever possible."
                    field="punishments_timeout_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                />
                <ToggleBlock
                    name="Re-verify punishment"
                    description={
                        <>
                            Disruptive users will be forced to re-verify
                            whenever possible. This setting has no effect if{" "}
                            <button
                                className="font-bold hover:underline"
                                onClick={() => {
                                    updateRoute({
                                        component: "verification",
                                    });
                                }}
                            >
                                Verification
                            </button>{" "}
                            is not enabled.
                        </>
                    }
                    field="punishments_verification_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                    disabled={!config.verification_enabled}
                />
                <BlockWithPanel
                    name="Kick / Ban"
                    description={
                        <>
                            <p>
                                Disruptive users will be kicked or banned
                                whenever necessary.
                            </p>
                            <p>
                                This cannot be disabled to guarantee the
                                security of your server and stability of The
                                Cleaner.
                            </p>
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
            </Section>
        </>
    );
}
