
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


function VerificationDashboard({ config, setConfig, guild, guildId }) {
    return (
        <>
            <Header name="Verification">
                Manage your worker.
            </Header>
            <Section>
                <Attention>
                    Read the <Link href="/help/verification"><a className="hover:underline">help article</a></Link> for more information.
                </Attention>
                <ToggleBlock
                    name="Enable verification"
                    description="Enable verification."
                    field="verification_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                />
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
                        <p className="mt-6 text-sm text-gray-300">
                            Role not listed? Make sure The Cleaner is above it in the role hierarchy.
                        </p>
                    </PlainBlock>
                </>}
            </Section>
        </>
    )
}

