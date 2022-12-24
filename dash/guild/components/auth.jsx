import { useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { DropdownSearch, TextInput } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function AuthComponent({
    route,
    config,
    updateConfig,
    entitlements,
    guild,
}) {
    return (
        <Section>
            <ToggleBlock
                name="Enable authentication"
                description={
                    <>
                        <p>
                            Authentication allows staff to temporarily pick
                            up roles after verifying themselves using MFA.
                            The role will be taken after a few minutes or
                            once they send or edit a message.
                        </p>
                        <p>
                            Make sure the <b>/auth</b> command is usable, it
                            defaults to only be usable by admins.
                        </p>
                    </>
                }
                field="auth_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
                entitlement={entitlements.auth}
                entitlements={entitlements}
            />
            {config.auth_enabled && (
                <>
                    <PlainBlock
                        name="Setup a role"
                        description="Add a role that staff can pick up."
                    >
                        <DropdownSearch
                            placeholder="Select a role."
                            values={
                                guild.roles
                                    ? guild.roles.filter(
                                            (role) =>
                                                role.can_control &&
                                                !config.auth_roles[role.id]
                                        )
                                    : []
                            }
                            current={""}
                            dontSetQuery={true}
                            setCurrent={async (new_value) => {
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        auth_roles: {
                                            ...config.auth_roles,
                                            [new_value]: [],
                                        },
                                    })
                                );
                                if (!success) return;
                                updateConfig({
                                    auth_roles: {
                                        ...config.auth_roles,
                                        [new_value]: [],
                                    },
                                });
                            }}
                        />
                    </PlainBlock>
                    {Object.keys(config.auth_roles)
                        .sort()
                        .map((roleId) => (
                            <AuthRole
                                route={route}
                                config={config}
                                updateConfig={updateConfig}
                                guild={guild}
                                roleId={roleId}
                            />
                        ))}
                </>
            )}
        </Section>
    );
}

function AuthRole({ route, config, updateConfig, guild, roleId }) {
    const role = guild.roles.find((x) => x.id === roleId);
    return (
        <PlainBlock
            name={role ? role.name : "deleted role"}
            description="Users with dashboard access can always get this role. Add additional users who can get this role below:"
        >
            <IDSelector
                guildId={route.guildId}
                config={config}
                updateConfig={updateConfig}
                roleId={roleId}
            />
        </PlainBlock>
    );
}

export function IDSelector({ guildId, config, updateConfig, roleId }) {
    const [value, setValue] = useState("");
    return (
        <>
            <div className="flex flex-wrap gap-2 mb-2">
                Users:
                {config.auth_roles[roleId].length === 0 ? (
                    <span>No users added.</span>
                ) : (
                    config.auth_roles[roleId].map((x) => (
                        <span
                            key={x}
                            className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800"
                        >
                            {x}
                            <button
                                className="w-4 h-4 ml-2 text-gray-400"
                                onClick={async () => {
                                    const copy = [...config.auth_roles[roleId]];
                                    const index = copy.indexOf(x);
                                    if (index < 0) return;
                                    copy.splice(index, 1);
                                    const success = await doChange(
                                        patchConfig(guildId, {
                                            auth_roles: {
                                                ...config.auth_roles,
                                                [roleId]: copy,
                                            },
                                        })
                                    );
                                    if (!success) return;
                                    updateConfig({
                                        auth_roles: {
                                            ...config.auth_roles,
                                            [roleId]: copy,
                                        },
                                    });
                                }}
                            >
                                <svg
                                    className="w-2 h-2 stroke-current"
                                    fill="none"
                                    viewBox="0 0 8 8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                        d="M1 1l6 6m0-6L1 7"
                                    />
                                </svg>
                            </button>
                        </span>
                    ))
                )}
            </div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(value);
                    if (!/^[0-9]{18,22}$/.test(value))
                        return toast.error("Not an id!");

                    const copy = [...config.auth_roles[roleId]];
                    if (copy.indexOf(value) >= 0)
                        return toast.error("Duplicate id");
                    copy.push(value);
                    const success = await doChange(
                        patchConfig(guildId, {
                            auth_roles: {
                                ...config.auth_roles,
                                [roleId]: copy,
                            },
                        })
                    );
                    if (!success) return;
                    updateConfig({
                        auth_roles: { ...config.auth_roles, [roleId]: copy },
                    });
                    setValue("");
                }}
            >
                <TextInput
                    value={value}
                    setValue={setValue}
                    maxLength={22}
                    placeholder="Type the user's id to also get this role."
                />
            </form>
        </>
    );
}
