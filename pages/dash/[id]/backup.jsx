
import { useState } from "react";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, BlockWithPanel } from "@/components/dash/block.jsx";
import { Button, Attention } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, postTakeSnapshot, postApplySnapshot, useSnapshots } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Backup | The Cleaner Dashboard"
            />
            <Page page="backup" {...data}>
                <BackupDashboard {...data} />
            </Page>
        </>
    )
}


function BackupDashboard({ guild, guildId }) {
    const [takingSnapshot, setTakingSnapshot] = useState(false);
    const { data: response, error } = useSnapshots(guildId);
    return (
        <>
            <Header name="Backup" />
            <Section>
                <BlockWithPanel
                    name="Take a snapshot"
                    description="Take a snapshot of your current server name, roles and channels."
                    panel={(
                        <Button
                            text="Take snapshot"
                            disabled={takingSnapshot}
                            onClick={async () => {
                                setTakingSnapshot(true);
                                const success = await doChange(postTakeSnapshot(guildId), {
                                    loading: "Taking...",
                                    error: "Failed to take snapshot: ",
                                    success: "Taken!"
                                })
                                setTakingSnapshot(false);
                            }}
                        />
                    )}
                />
                <PlainBlock
                    name="Apply a snapshot"
                    description="Apply an old snapshot and create/rename/delete channels or roles..."
                >
                    <div className="space-y-2">
                        {!guild.myself.permissions.ADMINISTRATOR && (!guild.myself.permissions.MANAGE_ROLES || !guild.myself.permissions.MANAGE_CHANNELS || !guild.myself.permissions.MANAGE_GUILD) && <Attention>
                            Missing required permissions!
                            <div className="flex flex-col mt-2">
                                {!guild.myself.permissions.MANAGE_ROLES && <code>MANAGE ROLES</code>}
                                {!guild.myself.permissions.MANAGE_CHANNELS && <code>MANAGE CHANNELS</code>}
                                {!guild.myself.permissions.MANAGE_GUILD && <code>MANAGE SERVER</code>}
                            </div>
                        </Attention>}
                        <Attention>
                            Reminder: Make sure my position is as high as possible in role hierarchy.
                        </Attention>
                    </div>
                </PlainBlock>
            </Section>
        </>
    )
}
