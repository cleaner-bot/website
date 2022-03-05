
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Toggle, BlockRightSide, DropdownSearch, JustBlock } from "@/components/dash/ui.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <DataWrapper guildId={router.isReady && router.query.id} Inner={SlowmodeDashboard} current="slowmode" />
    )
}


function SlowmodeDashboard({ data }) {
    const [slowmodeExceptions, setSlowmodeExceptions] = useState(data.config.slowmode_exceptions);

    return (
        <>
            <h1 className="text-2xl">
                Slowmode
            </h1>
            <p className="mt-2 mb-16 text-gray-300">
                Manage slowmode settings & channels.
            </p>
            <BlockRightSide
                rightSide={<>
                    <Toggle data={data} field="slowmode_enabled" />
                </>}
            >
                <h2 className="text-2xl font-medium">
                    Slowmode master switch
                </h2>
                <p>
                    Enable slowmode automatic slowmode adjustments.
                    Channels with more than 10s slowmode will not be adjusted.
                </p>
            </BlockRightSide>
            <div className="my-12 space-y-12">
                <JustBlock>
                    <h2 className="text-2xl font-medium">
                        Exceptions
                    </h2>
                    <p>
                        Channels marked as exception will have a lot less slowmode.
                        This also affects Anti Spam and disables the emoji.mass Firewall rule.
                    </p>
                    <div className="flex gap-2 my-2">
                        Channels: 
                        {slowmodeExceptions.length === 0 ? <span>
                            No channels.
                        </span> : slowmodeExceptions.split(",").map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                            {data.guild.roles.find(y => x === y.id)?.name || `Deleted role: ${x}`}
                            <button className="w-4 h-4 ml-2 text-gray-400" onClick={() => {
                                const channels = slowmodeExceptions.length > 0 ? slowmodeExceptions.split(",") : [];
                                const index = channels.indexOf(x);
                                if(index >= 0)
                                channels.splice(index, 1);
                                setSlowmodeExceptions(channels.join(","));
                            }}>
                                <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>)}
                    </div>
                    <DropdownSearch
                        placeholder="Select a channel to add as exception."
                        values={data.guild.channels.filter(x => slowmodeExceptions.split(",").indexOf(x.id) === -1)}
                        current=""
                        setCurrent={(value) => {
                            const channels = slowmodeExceptions.length > 0 ? slowmodeExceptions.split(",") : [];
                            channels.push(value);
                            setSlowmodeExceptions(channels.join(","));
                        }}
                    />
                </JustBlock>
            </div>
        </>
    )
}

