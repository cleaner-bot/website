import toast from "react-hot-toast";
import { useState } from "react";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import MetaTags from "@/components/metatags.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Dropdown, TextInput, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";
import { PlainBlock } from "@/components/dash/block.jsx";
import { MultiSelect } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Access | The Cleaner Dashboard" />
            <Page page="access" {...data}>
                <AccessDashboard {...data} />
            </Page>
        </>
    );
}

function AccessDashboard({ guild, guildId, config, setConfig }) {
    return (
        <>
            <Header name="Access">
                Control who can access your dashboard.
            </Header>
            <Section>
                <BlockWithPanel
                    name="Permissions"
                    description="Manages what permissions people need to access the dashboard."
                    panel={
                        <>
                            <Dropdown
                                values={[
                                    { id: 0, name: "Server owner only" },
                                    { id: 1, name: "Admins" },
                                    { id: 2, name: "Admins, Managers" },
                                ]}
                                current={config.access_permissions}
                                setCurrent={async (value) => {
                                    const success = await doChange(
                                        patchConfig(guildId, {
                                            access_permissions: value,
                                        })
                                    );
                                    if (success)
                                        setConfig({
                                            ...config,
                                            access_permissions: value,
                                        });
                                }}
                                className="w-40"
                            />
                        </>
                    }
                />
                <PlainBlock
                    name="Whitelisted roles"
                    description="Roles which give access to the dashboard. This has priority over permissions checks."
                >
                    <Attention className="mb-6">
                        This does not work currently.
                    </Attention>
                    <MultiSelect
                        name="Roles:"
                        none="No roles."
                        singular="Role"
                        field="access_roles"
                        placeholder={
                            guild.roles
                                ? "Select a role to add to the whitelist."
                                : "Role list is unavailable. Refresh the page or contact support."
                        }
                        selection={
                            guild.roles
                                ? guild.roles.filter((x) => !x.is_managed)
                                : []
                        }
                        guildId={guildId}
                        config={config}
                        setConfig={setConfig}
                    />
                </PlainBlock>

                <PlainBlock
                    name="Whitelisted users"
                    description="Users who have access to the dashboard. This has priority over permissions checks."
                >
                    <IDSelector
                        name="Users: "
                        none="No users added."
                        placeholder="Type the user's id to add to the whitelist."
                        field="access_members"
                        guildId={guildId}
                        config={config}
                        setConfig={setConfig}
                    />
                </PlainBlock>
            </Section>
        </>
    );
}

function IDSelector({
    name,
    none,
    placeholder,
    field,
    guildId,
    config,
    setConfig,
}) {
    const [value, setValue] = useState("");
    return (
        <>
            <div className="flex flex-wrap gap-2 mb-2">
                {name}
                {config[field].length === 0 ? (
                    <span>{none}</span>
                ) : (
                    config[field].map((x) => (
                        <span
                            key={x}
                            className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800"
                        >
                            {x}
                            <button
                                className="w-4 h-4 ml-2 text-gray-400"
                                onClick={async () => {
                                    const copy = [...config[field]];
                                    const index = copy.indexOf(x);
                                    if (index < 0) return;
                                    copy.splice(index, 1);
                                    const success = await doChange(
                                        patchConfig(guildId, { [field]: copy })
                                    );
                                    if (!success) return;
                                    setConfig({ ...config, [field]: copy });
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

                    const copy = [...config[field]];
                    if (copy.indexOf(value) >= 0)
                        return toast.error("Duplicate id");
                    copy.push(value);
                    const success = await doChange(
                        patchConfig(guildId, { [field]: copy })
                    );
                    if (!success) return;
                    setConfig({ ...config, [field]: copy });
                    setValue("");
                }}
            >
                <TextInput
                    value={value}
                    setValue={setValue}
                    maxLength={22}
                    placeholder={placeholder}
                />
            </form>
        </>
    );
}
