
import React, { useState } from "react";
import { useRouter } from "next/router";

import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { TextInput, Button } from "@/components/dash/ui.jsx";
import { doChange, patchConfig, patchEntitlement } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <Page page="dev" {...data}>
            <DevDashboard {...data} />
        </Page>
    )
}


function DevDashboard({ user, config, setConfig, entitlements, setEntitlements, guildId }) {
    const router = useRouter();
    if(!user.is_dev) {
        router.push(`/dash/${guildId}`);
        return null;
    }
    const reactHooksEntitlements = Object.keys(entitlements).map(key => useState(entitlements[key]));
    const reactHooksConfig = Object.keys(config).map(key => useState(config[key]));
    return (
        <>
            <MetaTags
                title="Developer panel | The Cleaner Dashboard"
            />
            <Header name="Developer panel">
                The developer panel. There are no secrets hidden here.
            </Header>

            <Section name="Entitlements">
                {Object.keys(entitlements).map((key, index) => (
                    <BlockWithPanel
                        name={key}
                        description={`Current value: ${entitlements[key].toString()}`}
                        panel={<div>
                            <TextInput value={reactHooksEntitlements[index][0]} setValue={reactHooksEntitlements[index][1]} />
                            <Button text="Save" className="w-full mt-2" onClick={async () => {
                                const new_value = reactHooksEntitlements[index][0];
                                const success = await doChange(patchEntitlement(guildId, {[key]: new_value}));
                                if(!success) return;
                                setEntitlements({...entitlements, [key]: new_value});
                            }} />
                        </div>}
                        key={key}
                    />
                ))}
            </Section>

            <Section name="Config">
                {Object.keys(config).map((key, index) => (
                    <BlockWithPanel
                        name={key}
                        description={`Current value: ${config[key].toString()}`}
                        panel={<div>
                            <TextInput value={reactHooksConfig[index][0]} setValue={reactHooksConfig[index][1]} />
                            <Button text="Save" className="w-full mt-2" onClick={async () => {
                                const new_value = reactHooksConfig[index][0];
                                const success = await doChange(patchConfig(guildId, {[key]: new_value}));
                                if(!success) return;
                                setConfig({...config, [key]: new_value});
                            }} />
                        </div>}
                        key={key}
                    />
                ))}
            </Section>
        </>
    )
}
