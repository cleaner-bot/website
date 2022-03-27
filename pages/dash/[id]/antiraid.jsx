
import { useState } from "react";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";
import { PlainBlock } from "@/components/dash/block";
import { TextInput } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Anti Raid | The Cleaner Dashboard"
            />
            <Page page="antiraid" {...data}>
                <AntiRaidDashboard {...data} />
            </Page>
        </>
    )
}

function AntiRaidDashboard({ config, setConfig, guildId }) {
    const [antiRaidLimit, setAntiRaidLimit] = useState(config.antiraid_limit);

    return (
        <>
            <Header name="Anti Raid">
                Anti Raid settings.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable Anti Raid"
                    description="Enable raid protection."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="antiraid_enabled"
                />
                {config.antiraid_enabled && <>
                    <PlainBlock
                        name="Join limit"
                        description={<>
                            <p>Format is `limit/seconds`. For example `5/10` means "max 5 joins in 10 seconds"</p>
                            <p>You cannot chose more than 99,999 joins and the timeframe cannot be over 999 seconds.</p>
                        </>}
                    >
                        <p>
                            Max {antiRaidLimit.split("/")[0]} joins in {antiRaidLimit.split("/")[1]} seconds.
                        </p>
                        <TextInput
                            placeholder="10/10"
                            value={antiRaidLimit}
                            setValue={setAntiRaidLimit}
                            className="mt-2 mb-4"
                        />
                        <button
                            className="w-32 --btn --btn-3 --btn-primary"
                            disabled={antiRaidLimit === config.antiraid_limit}
                            onClick={async () => {
                                const new_value = antiRaidLimit;
                                setAntiRaidLimit(config.antiraid_limit);
                                const success = await doChange(patchConfig(guildId, {antiraid_limit: new_value}));
                                if(!success) return;
                                setAntiRaidLimit(new_value);
                                setConfig({...config, antiraid_limit: new_value});
                            }}
                        >
                            Save
                        </button>
                    </PlainBlock>
                </>}
            </Section>
        </>
    )
}
