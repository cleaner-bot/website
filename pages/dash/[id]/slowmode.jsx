
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Toggle, BlockRightSide, DropdownSearch, JustBlock } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Slowmode | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={SlowmodeDashboard} current="slowmode" />
        </>
    )
}


function SlowmodeDashboard({ data }) {
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
                    <div className="flex flex-wrap gap-2 my-8">
                        Channels: 
                        {data.config.slowmode_exceptions.length === 0 ? <span>
                            No channels.
                        </span> : data.config.slowmode_exceptions.map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                            {data.guild.channels.find(y => x === y.id)?.name || `Deleted channel: ${x}`}
                            <button className="w-4 h-4 ml-2 text-gray-400" onClick={async () => {
                                const modroles = [...data.config.slowmode_exceptions];
                                const index = modroles.indexOf(x);
                                if(index >= 0)
                                    modroles.splice(index, 1);
                                const success = await doChange(patchConfig(data.guild.id, {slowmode_exceptions: modroles}));
                                if(!success) return;
                                data.config.slowmode_exceptions = modroles;
                            }}>
                                <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>)}
                    </div>
                    <DropdownSearch
                        placeholder="Select a channel to add as exception."
                        values={data.guild.channels.filter(x => data.config.slowmode_exceptions.indexOf(x.id) === -1)}
                        current=""
                        setCurrent={async value => {
                            const modroles = [...data.config.slowmode_exceptions];
                            modroles.push(value);
                            const success = await doChange(patchConfig(data.guild.id, {slowmode_exceptions: modroles}));
                            if(!success) return;
                            data.config.slowmode_exceptions = modroles;
                        }}
                    />
                </JustBlock>
            </div>
        </>
    )
}

