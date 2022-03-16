
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { InternalLink } from "@/components/buttons.jsx";
import { Toggle, DropdownSearch, JustBlock, Attention, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig } from "@/lib/api";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={Dashboard} current="" />
        </>
    )
}


function Dashboard({ data }) {
    const [overviewModroles, setOverviewModroles] = useState(data.config.overview_modroles);
    return (
        <>
            <h1 className="text-2xl">
                Overview
            </h1>

            <div className="my-12 space-y-12">
                {(data.config.logging_enabled === "no" || data.config.logging_channel === "0") && <Attention>
                    {data.config.logging_enabled === "no" ? "You do not have logging enabled!" : "You do not have a logging channel selected!"}
                    <InternalLink href={`/dash/${data.guild.id}/logging`} className="mt-4 lg:w-96">
                        Go to Logging
                    </InternalLink>
                </Attention>}
                {data.config.challenge_interactive_enabled === "yes" && data.config.challenge_interactive_role === "0" && <Attention>
                    You do not have a role for interactive challenges selected.
                    <InternalLink href={`/dash/${data.guild.id}/challenge`} className="mt-4 lg:w-96">
                        Go to Challenge
                    </InternalLink>
                </Attention>}
                <JustBlock>
                    <h2 className="text-2xl font-medium">
                        Moderator roles
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Moderators will be not affected by the security solutions. (firewall, antispam, challenges, ...)
                    </p>
                    <p className="text-gray-300">
                        Members with <b>administrator</b> or <b>manage server</b> permission, the <b>server owner</b>, and <b>bots</b> will always be ignored.
                    </p>
                    <div className="flex gap-2 my-2">
                        Roles: 
                        {overviewModroles.length === 0 ? <span>
                            No roles.
                        </span> : overviewModroles.split(",").map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                            {data.guild.roles.find(y => x === y.id)?.name || `Deleted role: ${x}`}
                            <button className="w-4 h-4 ml-2 text-gray-400" onClick={async () => {
                                const modroles = overviewModroles.length > 0 ? overviewModroles.split(",") : [];
                                const index = modroles.indexOf(x);
                                if(index >= 0)
                                    modroles.splice(index, 1);
                                const success = await doChange(patchConfig(data.guild.id, {overview_modroles: modroles.join(",")}));
                                if(!success) return;
                                setOverviewModroles(modroles.join(","));
                            }}>
                                <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>)}
                    </div>
                    <DropdownSearch
                        placeholder="Select a role to add as moderator."
                        values={data.guild.roles.filter(x => !x.is_managed && overviewModroles.split(",").indexOf(x.id) === -1)}
                        current=""
                        setCurrent={async (value) => {
                            const modroles = overviewModroles.length > 0 ? overviewModroles.split(",") : [];
                            modroles.push(value);
                            const success = await doChange(patchConfig(data.guild.id, {overview_modroles: modroles.join(",")}));
                            if(!success) return;
                            setOverviewModroles(modroles.join(","));
                        }}
                    />
                </JustBlock>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="overview_dehoisting_enabled" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Automatic dehoisting
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Automatically dehoists members that put special characters in front of their name to appear higher in the memberlist.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="overview_discordimpersonation_enabled" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Discord impersonation
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Automatically kicks people trying to impersonate Discord staff.
                    </p>
                </BlockRightSide>
            </div>
        </>
    )
}
