
import Link from "next/link";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";
import { Attention, DropdownSearch } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Verification | The Cleaner Dashboard"
            />
            <Page page="verification" {...data}>
                <VerificationDashboard {...data} />
            </Page>
        </>
    )
}


function VerificationDashboard({ config, setConfig, entitlements, guild, guildId }) {
    const verifiedRole = guild.roles.find(role => role.id === config.verification_role);
    return (
        <>
            <Header name="Super Verification">
                Manage verification settings.
            </Header>
            <Section>
                <Attention>
                    Read the <Link href="/docs/verification"><a className="font-bold text-gray-300 hover:underline">documentation</a></Link> for more information.
                </Attention>
                <ToggleBlock
                    name="Enable verification"
                    description="Enable verification. This will automatically kick members after 8 minutes if they have not verified."
                    field="verification_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                >
                    <p>
                        Your url is:
                        <span className="font-bold text-gray-300">
                            https://verify.cleanerbot.xyz/
                            {entitlements.plan >= entitlements.branding_vanity && entitlements.branding_vanity_url !== "" ? entitlements.branding_vanity_url : guildId}
                        </span>
                    </p>
                    {!(guild.myself.permissions.ADMINISTRATOR || guild.myself.permissions.KICK_MEMBERS) && <Attention>
                        Missing permission to kick members!
                        This feature will not work without it.
                    </Attention>}
                </ToggleBlock>
                {config.verification_enabled && <>
                    <PlainBlock
                        name="Verified role"
                        description="The role that is given after verifying:"
                    >
                        <DropdownSearch
                            placeholder="Select a role."
                            values={guild.roles.filter(role => role.can_control)}
                            current={config.verification_role}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(guildId, {verification_role: new_value}));
                                if(!success) return;
                                setConfig({...config, verification_role: new_value});
                            }}
                        />
                        <p className="my-6 text-sm text-gray-300">
                            Role not listed?{" "}
                            <Link href="/help/role-restrictions"><a className="font-bold text-gray-300 hover:underline">Find out why.</a></Link>
                        </p>
                        <div className="space-y-2">
                            {!(guild.myself.permissions.ADMINISTRATOR || guild.myself.permissions.MANAGE_ROLES) && <Attention>
                                Missing permission to manage roles!
                                This feature will not work without it.
                            </Attention>}
                            {config.verification_role === "0" && <Attention>
                                No role selected.
                            </Attention>}
                            {!verifiedRole && config.verification_role !== "0" && <Attention>
                                The role has been deleted. Please select a new one.
                            </Attention>}
                            {verifiedRole && !verifiedRole.can_control && <Attention>
                                The Cleaner can not control the current role.{" "}
                                <Link href="/help/role-restrictions"><a className="font-bold text-gray-300 hover:underline">Find out why.</a></Link>
                            </Attention>}
                        </div>
                    </PlainBlock>
                </>}
            </Section>
        </>
    )
}

