import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock } from "@/components/dash/block.jsx";
import { Attention, DropdownSearch } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";
import { u64ToBytes } from "@/lib/u64.js";
import { b64encode } from "@/lib/base64.js";

export default function SuperVerificationComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
}) {
    const verifiedRole =
        guild.roles &&
        guild.roles.find((role) => role.id === config.super_verification_role);
    return (
        <>
            <Description>
                Read the{" "}
                <Link href="/docs/verification">
                    <a className="font-bold text-gray-300 hover:underline">
                        documentation
                    </a>
                </Link>{" "}
                for more information and a setup guide.
            </Description>
            <Section>
                <ToggleBlock
                    name="Enable Super Verification"
                    description="Enable verification. This will automatically kick members after 8 minutes if they have not verified."
                    field="super_verification_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                >
                    <p>
                        <Link href="/docs/verification#setup">
                            <a className="font-bold text-gray-300 hover:underline">
                                Click for Setup guide
                            </a>
                        </Link>
                        .
                    </p>
                    <p>
                        Your url is:{" "}
                        <span className="font-bold text-gray-300 break-all">
                            https://verify.cleanerbot.xyz/
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
                                    https://verify.cleanerbot.xyz/
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
                            guild.myself.permissions.KICK_MEMBERS
                        ) && (
                            <Attention className="mt-6">
                                Missing permission to kick members! This feature
                                will not work without it.
                            </Attention>
                        )}
                </ToggleBlock>
                {config.super_verification_enabled && (
                    <>
                        <PlainBlock
                            name="Verified role"
                            description="The role that is given after verifying:"
                        >
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
                                current={config.super_verification_role}
                                setCurrent={async (new_value) => {
                                    const success = await doChange(
                                        patchConfig(route.guildId, {
                                            super_verification_role: new_value,
                                        })
                                    );
                                    if (!success) return;
                                    updateConfig({
                                        super_verification_role: new_value,
                                    });
                                }}
                            />
                            <p className="my-6 text-sm text-gray-300">
                                Role not listed?{" "}
                                <Link href="https://docs.cleanerbot.xyz/misc/roles">
                                    <a className="font-bold text-gray-300 hover:underline">
                                        Find out why.
                                    </a>
                                </Link>
                            </p>
                            <div className="space-y-2">
                                {guild.myself &&
                                    !(
                                        guild.myself.permissions
                                            .ADMINISTRATOR ||
                                        guild.myself.permissions.MANAGE_ROLES
                                    ) && (
                                        <Attention>
                                            Missing permission to manage roles!
                                            This feature will not work without
                                            it.
                                        </Attention>
                                    )}
                                {config.super_verification_role === "0" && (
                                    <Attention>No role selected.</Attention>
                                )}
                                {guild.roles &&
                                    (verifiedRole
                                        ? !verifiedRole.can_control && (
                                              <Attention>
                                                  The Cleaner can not control
                                                  the current role.{" "}
                                                  <Link href="https://docs.cleanerbot.xyz/misc/roles">
                                                      <a className="font-bold text-gray-300 hover:underline">
                                                          Find out why.
                                                      </a>
                                                  </Link>
                                              </Attention>
                                          )
                                        : config.super_verification_role !==
                                              "0" && (
                                              <Attention>
                                                  The role has been deleted.
                                                  Please select a new one.
                                              </Attention>
                                          ))}
                            </div>
                        </PlainBlock>
                        <ToggleBlock
                            name="Force CAPTCHA"
                            description="Forces everyone to complete a CAPTCHA. CAPTCHAs will be forced during raids regardless of this setting."
                            field="super_verification_captcha"
                            config={config}
                            updateConfig={updateConfig}
                            guildId={route.guildId}
                        />
                    </>
                )}
            </Section>
        </>
    );
}
