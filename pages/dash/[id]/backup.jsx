import { useState } from "react";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, BlockWithPanel } from "@/components/dash/block.jsx";
import { Button, Attention } from "@/components/dash/ui.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import MetaTags from "@/components/metatags.jsx";
import {
    doChange,
    postTakeSnapshot,
    postApplySnapshot,
    useSnapshots,
} from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Backup | The Cleaner Dashboard" />
            <Page page="backup" {...data}>
                <BackupDashboard {...data} />
            </Page>
        </>
    );
}

function BackupDashboard({ entitlements, guild, guildId }) {
    const [takingSnapshot, setTakingSnapshot] = useState(false);
    const [applyingSnapshot, setApplyingSnapshot] = useState(false);
    const { data: response, error: isError } = useSnapshots(guildId);
    const canApply =
        guild.myself.permissions.ADMINISTRATOR ||
        (guild.myself.permissions.MANAGE_ROLES &&
            guild.myself.permissions.MANAGE_CHANNELS &&
            guild.myself.permissions.MANAGE_GUILD);
    return (
        <>
            <Header name="Backup" />
            <Section>
                <BlockWithPanel
                    name="Take a snapshot"
                    description="Take a snapshot of your current server name, roles and channels."
                    panel={
                        <Button
                            text="Take snapshot"
                            disabled={takingSnapshot}
                            onClick={async () => {
                                setTakingSnapshot(true);
                                await doChange(postTakeSnapshot(guildId), {
                                    loading: "Taking...",
                                    error: "Failed to take snapshot: ",
                                    success: "Taken!",
                                });
                                setTakingSnapshot(false);
                            }}
                        />
                    }
                >
                    <p className="text-xs text-right text-gray-300">
                        {response && !isError ? response.data.length : "?"} /{" "}
                        {entitlements.backup_snapshot_limit} snapshots used
                    </p>
                </BlockWithPanel>
                <PlainBlock
                    name="Apply a snapshot"
                    description="Apply an old snapshot and create/rename/delete channels or roles..."
                >
                    <div className="space-y-2">
                        {!canApply && (
                            <Attention>
                                Missing required permissions!
                                <div className="flex flex-col mt-2">
                                    {!guild.myself.permissions.MANAGE_ROLES && (
                                        <code>MANAGE ROLES</code>
                                    )}
                                    {!guild.myself.permissions
                                        .MANAGE_CHANNELS && (
                                        <code>MANAGE CHANNELS</code>
                                    )}
                                    {!guild.myself.permissions.MANAGE_GUILD && (
                                        <code>MANAGE SERVER</code>
                                    )}
                                </div>
                            </Attention>
                        )}
                        <Attention>
                            Reminder: Make sure my position is as high as
                            possible in role hierarchy. I may not be able to
                            properly apply a snapshot&apos;s roles.
                        </Attention>
                        <p className="pt-2 text-xl font-medium">Snapshots:</p>
                        {isError ? (
                            <ErrorHandler error={isError} />
                        ) : response ? (
                            <>
                                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                                    {response.data
                                        .sort(
                                            (a, b) =>
                                                new Date(a.timestamp) -
                                                new Date(b.timestamp)
                                        )
                                        .map((x) => (
                                            <div
                                                className="p-2 border rounded-lg border-gray-550"
                                                key={x.id}
                                            >
                                                <p>
                                                    {new Date(
                                                        x.timestamp
                                                    ).toLocaleString()}
                                                </p>
                                                <p className="font-mono text-xs font-thin text-gray-400">
                                                    {x.id}
                                                </p>
                                                <button
                                                    className="float-right w-full mt-4 sm:w-1/2 md:w-full lg:w-1/2 --btn --btn-primary"
                                                    disabled={
                                                        !canApply ||
                                                        applyingSnapshot
                                                    }
                                                    onClick={async () => {
                                                        setApplyingSnapshot(
                                                            true
                                                        );
                                                        await doChange(
                                                            postApplySnapshot(
                                                                guildId,
                                                                x.id
                                                            ),
                                                            {
                                                                loading:
                                                                    "Applying...",
                                                                error: "Failed to apply snapshot: ",
                                                                success:
                                                                    "Applying started, this might take a while to complete!",
                                                            }
                                                        );
                                                        setApplyingSnapshot(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        ))}
                                </div>
                                <p className="text-xs text-right text-gray-300">
                                    {response.data.length} /{" "}
                                    {entitlements.backup_snapshot_limit}{" "}
                                    snapshots used
                                </p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </PlainBlock>
            </Section>
        </>
    );
}
