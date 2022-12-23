import React, { useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { TextInput, Button } from "@/components/dash/ui.jsx";
import { doChange, patchConfig, patchEntitlements } from "@/lib/api.js";

export default function DeveloperComponent({
    user,
    config,
    updateConfig,
    entitlements,
    updateEntitlements,
    route,
    updateRoute,
}) {
    if (!user.is_dev) {
        updateRoute({ component: "" });
        return null;
    }
    return (
        <>
            <Section name="Entitlements">
                {Object.keys(entitlements).map((key) => (
                    <Config
                        object={entitlements}
                        updateObject={updateEntitlements}
                        patch={patchEntitlements}
                        route={route}
                        key={key}
                        field={key}
                    />
                ))}
            </Section>

            <Section name="Config">
                {Object.keys(config).map((key) => (
                    <Config
                        object={config}
                        updateObject={updateConfig}
                        patch={patchConfig}
                        route={route}
                        key={key}
                        field={key}
                    />
                ))}
            </Section>
        </>
    );
}

function Config({ object, updateObject, patch, field, route }) {
    const [input, setInput] = useState(JSON.stringify(object[field]));
    return (
        <BlockWithPanel
            name={field}
            description={
                <span className="break-all">
                    Current value: {JSON.stringify(object[field])}
                </span>
            }
            panel={
                <>
                    <TextInput value={input} setValue={setInput} />
                    <Button
                        text="Save"
                        className="w-full mt-2"
                        onClick={async () => {
                            const new_value = JSON.parse(input);
                            const success = await doChange(
                                patch(route.guildId, {
                                    [field]: new_value,
                                })
                            );
                            if (!success) return;
                            updateObject({
                                [field]: new_value,
                            });
                        }}
                    />
                </>
            }
        />
    );
}
