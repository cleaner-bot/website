import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock } from "@/components/dash/block.jsx";
import { Attention, DropdownSearch } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";
import { u64ToBytes } from "@/lib/u64.js";
import { b64encode } from "@/lib/base64.js";
import toast from "react-hot-toast";

export default function SuperVerificationComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
    updateRoute,
}) {
    const verifiedRole =
        guild.roles &&
        guild.roles.find((role) => role.id === config.super_verification_role);
    return (
        <>
            <Description>
                Read the{" "}
                <Link
                    href="https://docs.cleanerbot.xyz/verification/super-verification/"
                    className="font-bold text-gray-300 hover:underline"
                >
                    documentation
                </Link>{" "}
                for more information and a setup guide.
            </Description>
            <Section>
                <ToggleBlock
                    name="Enable Super Verification"
                    description="Enable super verification. Users will be able to verify using the link below."
                    field="super_verification_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                >
                    <p>
                        <Link
                            href="https://docs.cleanerbot.xyz/verification/super-verification/#setup"
                            className="font-bold text-gray-300 hover:underline"
                        >
                            Click for Setup guide.
                        </Link>
                    </p>
                    <p>
                        Your url is:{" "}
                        <ClickToCopy
                            unique={
                                entitlements.plan >=
                                    entitlements.branding_vanity &&
                                entitlements.branding_vanity_url !== ""
                                    ? entitlements.branding_vanity_url
                                    : route.guildId
                            }
                        />
                        {entitlements.branding_vanity_url === "" && (
                            <>
                                {" or "}
                                <ClickToCopy
                                    unique={b64encode(
                                        u64ToBytes(BigInt(route.guildId))
                                    ).replace(/=+$/, "")}
                                />
                            </>
                        )}
                    </p>
                    {guild.verification_level !== 3 && (
                        <Attention className="mt-6">
                            Your verification level is <b>NOT</b> on <code>High</code>!
                            Users will be able to DM while pending verification.
                        </Attention>
                    )}
                    {!config.verification_timelimit_enabled && (
                        <Attention className="mt-6">
                            You do not have{" "}
                            <button onClick={() => {
                                updateRoute({ component: "timelimit" })
                            }} className="font-bold text-gray-300 hover:underline">
                                Verification Timelimit
                            </button>
                            {" "}enabled!
                        </Attention>
                    )}
                    {config.verification_timelimit_enabled && config.verification_timelimit > 480 && (
                        <Attention className="mt-6">
                            Your{" "}
                            <button onClick={() => {
                                updateRoute({ component: "timelimit" })
                            }} className="font-bold text-gray-300 hover:underline">
                                Verification Timelimit
                            </button>
                            {" "}is over the recommended 8 minutes.
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
                                <Link
                                    href="https://docs.cleanerbot.xyz/misc/roles"
                                    className="font-bold text-gray-300 hover:underline"
                                >
                                    Find out why.
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
                                                  <Link
                                                      href="https://docs.cleanerbot.xyz/misc/roles"
                                                      className="font-bold text-gray-300 hover:underline"
                                                  >
                                                      Find out why.
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

function ClickToCopy({ unique }) {
    const url = `https://verify.cleanerbot.xyz/${unique}`;
    return (
        <button
            className="font-bold text-gray-300 contents"
            onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied link.");
            }}
        >
            {url}
        </button>
    );
}
