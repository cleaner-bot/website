
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Toggle, OptionalUpgrade, DropdownSearch, JustBlock, BlockRightSide } from "@/components/dash/ui.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, patchConfig, useLoggingDownloads } from "@/lib/api.js";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Logging | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={LoggingDashboard} current="logging" />
        </>
    )
}


function LoggingDashboard({ data }) {
    const [loggingChannel, setLoggingChannel] = useState(data.config.logging_channel);
    return (
        <>
            <h1 className="text-2xl">
                Logging
            </h1>
            <p className="mt-2 mb-16 text-gray-300">
                Logging settings.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="logging_enabled" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Logging master switch
                    </h2>
                    <p className="text-gray-200">
                        Logging allows you to get notified in your discord about actions The Cleaner took.
                    </p>
                </BlockRightSide>
                {data.config.logging_enabled && <>
                    <JustBlock>
                        <h2 className="text-2xl font-medium">
                            Logging channel
                        </h2>
                        <p className="mb-2 text-gray-200">
                            Select the channel where logs will be sent to.
                        </p>
                        <DropdownSearch
                            placeholder="Select channel."
                            values={data.guild.channels.filter(channel => data.guild.myself.permissions.ADMINISTRATOR || (channel.permissions.VIEW_CHANNEL && channel.permissions.SEND_MESSAGES && channel.permissions.EMBED_LINKS))}
                            current={loggingChannel}
                            setCurrent={async new_value => {
                                const success = await doChange(patchConfig(data.guild.id, {logging_channel: new_value}));
                                if(!success) return;
                                setLoggingChannel(new_value);
                            }}
                        />
                    </JustBlock>
                    <BlockRightSide
                        rightSide={<>
                            <Toggle data={data} field="logging_option_join" />
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Join log
                        </h2>
                        <p className="text-gray-200">
                            Logs member join with account age and risk rating information.
                        </p>
                    </BlockRightSide>
                    <BlockRightSide
                        rightSide={<>
                            <OptionalUpgrade data={data} required={data.entitlements.logging_downloads}>
                                <Toggle data={data} field="logging_downloads_enabled" />
                            </OptionalUpgrade>
                        </>}
                    >
                        <h2 className="text-2xl font-medium">
                            Downloads
                        </h2>
                        <p className="text-gray-200">
                            We'll save all your logs and you can download it here anytime.
                        </p>
                        <p className="text-gray-200">
                            Your logs expire after <b>{data.entitlements.logging_retention}</b> month{data.entitlements.logging_retention !== 1 && "s"}.
                        </p>
                        {(data.entitlements.plan >= data.entitlements.logging_downloads && data.config.logging_downloads_enabled) && <>
                            <h2 className="mt-12 mb-6 text-2xl">
                                Files
                            </h2>
                            <DownloadFiles data={data} />
                        </>}
                    </BlockRightSide>
                </>}
            </div>
        </>
    )
}

function DownloadFiles({ data }) {
    const { data: response, error: isError } = useLoggingDownloads(data.guild.id);
    if(isError) {
        return (
            <ErrorHandler error={isError} />
        )
    }
    if(!response) {
        return (
            <>
                Loading....
            </>
        )
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <table className="divide-y divide-gray-550">
            <thead>
                <tr>
                    <th className="px-2 text-xs font-medium tracking-wider text-left uppercase">
                        Year
                    </th>
                    <th className="text-xs font-medium tracking-wider text-left uppercase">
                        Month
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-550">
                {response.data.map(x => <tr key={`${x.year}-${x.month}`}>
                    <td className="w-32 px-2 py-2">
                        {x.year}
                    </td>
                    <td className="w-32 py-2">
                        {months[x.month - 1]}
                    </td>
                    <td className="w-64 py-2">
                        <button
                            className="--btn --btn-2 --btn-primary w-60"
                            disabled={x.expired}
                        >
                            {x.expired ? "Download expired" : "Download"}
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}
