import Link from "next/link";

import { Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import { Dropdown } from "@/components/dash/ui.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function AntiNukeComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
}) {
    return (
        <Section>
            <BlockWithPanel
                name="Prevent bot invitations"
                description="Automatically kick all joining bots."
                panel={
                    <Dropdown
                        values={[
                            { name: "Kick nobody", id: 0 },
                            { name: "Kick non-verified", id: 1 },
                            { name: "Kick all", id: 2 },
                        ]}
                        current={config.antinuke_bots}
                        setCurrent={async (new_value) => {
                            const success = await doChange(
                                patchConfig(route.guildId, {
                                    antinuke_bots: new_value,
                                })
                            );
                            if (!success) return;
                            updateConfig({ antinuke_bots: new_value });
                        }}
                        className="w-40"
                    />
                }
            />
            <ToggleBlock
                name="Prevent webhook creations"
                description="Automatically delete all webhooks created."
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
                field="antinuke_webhooks"
                entitlement={entitlements.joinguard}
                entitlements={entitlements}
            />
        </Section>
    );
}
