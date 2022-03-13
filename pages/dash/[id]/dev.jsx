
import React, { useState } from "react";
import { useRouter } from "next/router";

import { doChange, patchConfig, patchEntitlement } from "@/lib/api.js";
import { DataWrapper } from "@/components/dash/data.jsx";
import { TextInput, NumberInput, Button, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <DataWrapper guildId={router.isReady && router.query.id} Inner={DevDashboard} current="dev" />
    )
}


function DevDashboard({ data }) {
    const router = useRouter();
    if(!data.user.is_dev) {
        router.push(`/dash/${data.guild.id}`);
        return null;
    }
    const reactHooksEntitlements = Object.keys(data.entitlements).map(key => useState(data.entitlements[key]));
    const reactHooksConfig = Object.keys(data.config).map(key => useState(data.config[key]));
    return (
        <>
            <MetaTags
                title="Developer panel | The Cleaner Dashboard"
            />
            <h1 className="text-2xl">
                Developer panel
            </h1>
            <p className="mt-2 text-gray-300">
                The developer panel.
            </p>

            <h2 className="mt-20 text-2xl">
                Entitlements
            </h2>
            <div className="my-12 space-y-12">
                {Object.keys(data.entitlements).map((key, index) => <BlockRightSide
                    key={key}
                    rightSide={<div>
                        <NumberInput value={reactHooksEntitlements[index][0]} setValue={reactHooksEntitlements[index][1]} />
                        <Button text="Save" className="w-full mt-2" onClick={async () => {
                            const new_value = reactHooksEntitlements[index][0];
                            const success = await doChange(patchEntitlement(data.guild.id, {[key]: new_value}));
                            if(!success) return;
                            data.entitlements[key] = new_value;
                            reactHooksEntitlements[index][1](new_value);
                        }} />
                    </div>}
                >
                    <h2 className="text-2xl font-medium break-all">
                        {key}
                    </h2>
                    <p className="text-gray-200">
                        Current value: {data.entitlements[key]}
                    </p>
                </BlockRightSide>)}
            </div>

            <h2 className="mt-20 text-2xl">
                Config
            </h2>
            <div className="my-12 space-y-12">
                {Object.keys(data.config).map((key, index) => <BlockRightSide
                    key={key}
                    rightSide={<div>
                        <TextInput value={reactHooksConfig[index][0]} setValue={reactHooksConfig[index][1]} />
                        <Button text="Save" className="w-full mt-2" onClick={async () => {
                            const new_value = reactHooksConfig[index][0];

                            const success = await doChange(patchConfig(data.guild.id, {[key]: new_value}));
                            if(!success) return;
                            data.config[key] = new_value;
                            reactHooksConfig[index][1](new_value);
                        }} />
                    </div>}
                >
                    <h2 className="text-2xl font-medium break-all">
                        {key}
                    </h2>
                    <p className="text-gray-200">
                        Current value: {data.config[key]}
                    </p>
                </BlockRightSide>)}
            </div>
        </>
    )
}
