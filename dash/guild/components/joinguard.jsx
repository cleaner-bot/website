import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import { Attention } from "@/components/dash/ui.jsx";
import { u64ToBytes } from "@/lib/u64.js";
import { b64encode } from "@/lib/base64.js";

export default function JoinGuardComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
}) {
    return (
        <>
            <Description>
                <p>
                    Protect joins to your server and prevent bots before they
                    even enter.
                </p>
                <p>
                    Read the{" "}
                    <Link
                        href="/docs/joinguard"
                        className="font-bold text-gray-300 hover:underline"
                    >
                        documentation
                    </Link>{" "}
                    for more information and a setup guide.
                </p>
            </Description>

            <Section>
                <ToggleBlock
                    name="Enable Join Guard"
                    description="Enable Join Guard. Make sure members can't create invites and all existing invites are deleted."
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                    field="joinguard_enabled"
                    entitlement={entitlements.joinguard}
                    entitlements={entitlements}
                >
                    <p>
                        Your url is:{" "}
                        <span className="font-bold text-gray-300 break-all">
                            https://join.cleanerbot.xyz/
                            {entitlements.plan >=
                                entitlements.branding_vanity &&
                            entitlements.branding_vanity_url !== ""
                                ? entitlements.branding_vanity_url
                                : route.guildId}
                        </span>
                        {entitlements.branding_vanity_url === "" && (
                            <>
                                {" "}
                                or{" "}
                                <span className="font-bold text-gray-300 break-all">
                                    https://join.cleanerbot.xyz/
                                    {b64encode(
                                        u64ToBytes(BigInt(route.guildId))
                                    ).replace(/=+$/, "")}
                                </span>
                            </>
                        )}
                    </p>
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.CREATE_INSTANT_INVITE
                        ) && (
                            <Attention>
                                Missing permission to invite members! This
                                feature will not work without it. Make sure I
                                have the `Create Instant Invite` permission!
                            </Attention>
                        )}
                </ToggleBlock>
                {config.joinguard_enabled && (
                    <>
                        <ToggleBlock
                            name="Force CAPTCHA"
                            description="Forces everyone to complete a CAPTCHA. CAPTCHAs will be forced during raids regardless of this setting."
                            config={config}
                            updateConfig={updateConfig}
                            guildId={route.guildId}
                            field="joinguard_captcha"
                        />
                    </>
                )}
            </Section>
        </>
    );
}
