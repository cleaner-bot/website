import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import { MultiSelect } from "@/components/dash/ui.jsx";

const rules = [
    {
        name: "traffic.similar",
        description:
            "Most basic spam detection by comparing the similarity of messages.",
    },
    {
        name: "traffic.token",
        description:
            "Detects repeating elements of messages. This antispam rule is harder to trigger but will catch more sophisticated spam.",
    },
    {
        name: "traffic.exact",
        description:
            "Detects identical messages sent in multiple channels. Intended as last resort against phishing.",
    },
    { name: "traffic.sticker", description: "Detects sticker spam." },
    {
        name: "traffic.attachment",
        description:
            "Detects attachment spam. For performance reasons this only checks filesize.",
    },
];

export default function AntiSpamComponent({
    config,
    updateConfig,
    route,
    updateRoute,
    guild,
}) {
    return (
        <>
            <Description>
                <p>
                    If you have spam channels, make sure to add them as
                    exception channels in the{" "}
                    <button
                        onClick={() => {
                            updateRoute({ component: "slowmode" });
                        }}
                        className="font-bold hover:underline"
                    >
                        Slowmode
                    </button>{" "}
                    settings instead of fully disabling them.
                </p>
                <p className="mt-6">
                    <Link
                        href="https://docs.cleanerbot.xyz/features/antispam/"
                        className="font-bold text-gray-300 hover:underline"
                    >
                        Read the docs for more information.
                    </Link>
                </p>
            </Description>
            <Section>
                {rules.map((traffic) => (
                    <ToggleBlock
                        {...traffic}
                        config={config}
                        updateConfig={updateConfig}
                        guildId={route.guildId}
                        field={`antispam_${traffic.name.substring(8)}`}
                        key={traffic.name}
                    >
                        <MultiSelect
                            name="Whitelisted channels:"
                            none="No channels."
                            singular="Channel"
                            field={`antispam_${traffic.name.substring(
                                8
                            )}_channels`}
                            placeholder={
                                guild.channels
                                    ? "Select a channel to whitelist."
                                    : "Channel list is unavailable. Refresh the page or contact support."
                            }
                            selection={guild.channels ? guild.channels : []}
                            guildId={route.guildId}
                            config={config}
                            updateConfig={updateConfig}
                        />
                    </ToggleBlock>
                ))}
            </Section>
        </>
    );
}
