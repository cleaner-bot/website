
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Button, Upgrade, OptionalUpgrade, Unlocked, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Bot | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={BotDashboard} current="bot" />
        </>
    )
}


function BotDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Bot
            </h1>
            <p className="mt-2 text-gray-300">
                Manage bot settings.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<div>
                        {data.entitlements.bot_limit === 0 ? <Upgrade data={data} /> : <Unlocked />}
                    </div>}
                >
                    <h2 className="text-2xl font-medium">
                        Custom bot
                    </h2>
                    <p className="text-gray-200">
                        Let The Cleaner use your bot for kicking/banning and other actions.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <OptionalUpgrade data={data} required={data.entitlements.bot_dedicated}>
                            <Button text="Invite" onClick={() => {
                                const isMobile = "ontouchstart" in window;
                                const invite = "https://discord.com/oauth2/authorize?client_id=932265333916590160&scope=applications.commands%20bot&permissions=292527565878";
                                if(isMobile) {
                                    window.open(invite, "_blank");
                                } else {
                                    window.open(invite, "botinvitepopup", "width=500,height=776,left=100,top=100");
                                }
                            }} />
                        </OptionalUpgrade>
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Dedicated bot: The Cleaner+
                    </h2>
                    <p className="text-gray-200">
                        Separate hosting on dedicated hardware for optimal performance.
                    </p>
                    <p className="text-gray-200">
                        After inviting you must <b>kick</b> The Cleaner! If you don't, there will be issues.
                    </p>
                </BlockRightSide>
            </div>
        </>
    )
}
