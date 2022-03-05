
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import { Checkbox, Toggle, BlockRightSide } from "@/components/dash/ui.jsx";
import Link from "next/link";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <DataWrapper guildId={router.isReady && router.query.id} Inner={AntispamDashboard} current="antispam" />
    )
}


function AntispamDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Anti Spam
            </h1>
            <p className="mt-2 text-gray-300">
                Spam mitigation solutions.
            </p>
            <p className="mt-2 text-gray-200">
                If you have spam channels, make sure to add them as exception channels in the <Link href={`/dash/${data.guild.id}/slowmode`}>
                <a className="hover:underline">Slowmode</a>
                </Link> settings.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="antispam_similar" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        traffic.similar
                    </h2>
                    <p className="text-gray-200">
                        Most basic spam detection by comparing the similarity of messages.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="antispam_exact" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        traffic.exact
                    </h2>
                    <p className="text-gray-200">
                        Detects identical messages sent in multiple channels.
                        Intended as last resort against phishing.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="antispam_token" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        traffic.token
                    </h2>
                    <p className="text-gray-200">
                        Detects repeating elements of messages. This antispam rule is harder to trigger but will catch more sophisticated spam.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="antispam_sticker" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        traffic.sticker
                    </h2>
                    <p className="text-gray-200">
                        Detects sticker spam.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="antispam_attachment" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        traffic.attachment
                    </h2>
                    <p className="text-gray-200">
                        Detects attachment spam. For performance reasons this only checks filesize and filename.
                    </p>
                </BlockRightSide>
            </div>
        </>
    )
}
