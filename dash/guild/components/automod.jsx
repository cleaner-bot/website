import { useState } from "react";
import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Dropdown, MultiSelect } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

const categories = [
    {
        name: "Phishing",
        rules: [
            {
                name: "phishing.content",
                description:
                    "Phishing detection using heuristics trained on previous phishing messages.",
            },
            {
                name: "phishing.domain.blacklisted",
                description: "Phishing detection using a domain blacklist.",
            },
            {
                name: "phishing.domain.heuristic",
                description:
                    "Phishing detection using domain heuristics. Sometimes produces false positives.",
            },
            {
                name: "phishing.embed",
                description: "Phishing detection using preview embeds.",
            },
        ],
    },
    {
        name: "Ping",
        rules: [
            {
                name: "ping.users.many",
                description: "Catches people pinging more than 15 users.",
            },
            {
                name: "ping.users.few",
                description: "Catches people pinging more than 5 users.",
            },
            {
                name: "ping.roles",
                description: "Catches people pinging more than 5 roles.",
            },
            {
                name: "ping.broad",
                description:
                    "Catches people pinging the @everyone or @here role without actually have the permissions to do so.",
            },
            {
                name: "ping.hidden",
                description: "Catches people hiding pings using client bugs.",
            },
        ],
    },
    {
        name: "Advertisement",
        rules: [
            {
                name: "advertisement.discord.invite",
                description: "Catches Discord invites.",
            },
            {
                name: "advertisement.discord.unsafeinvite",
                description:
                    "Catches unsafe Discord invites. This only targets a subset of invites that are related to ongoing scam waves.",
            },
        ],
    },
    {
        name: "Miscellaneous",
        rules: [
            {
                name: "selfbot.embed",
                description: "Self bot detection using embeds.",
            },
            {
                name: "emoji.mass",
                description:
                    "Catches messages with more than 7 emojis. This rule is always disabled in exception channels (see Slowmode settings).",
            },
        ],
    },
];

const challengeTextes = {
    "": "User is immediately kicked or banned.",
    T: "User is put in timeout.",
    V: "User has to re-verify.",
    TV: "User is put in timeout or has to verify again.",
};

const automodActions = [
    { name: "Disabled", id: 0 },
    { name: "Block", id: 1 },
    { name: "Challenge", id: 2 },
];

export default function AutoModComponent({
    config,
    updateConfig,
    guild,
    route,
}) {
    return (
        <>
            <Description>
                <p className="mb-2 font-semibold">Actions glossary:</p>
                <p>
                    <b>Challenge:</b>{" "}
                    {
                        challengeTextes[
                            (config.challenge_timeout_enabled ? "T" : "") +
                                (config.challenge_interactive_enabled
                                    ? "V"
                                    : "")
                        ]
                    }
                </p>
                {(config.challenge_timeout_enabled ||
                    config.challenge_interactive_enabled) && (
                    <p>
                        When the bot is ratelimited or under raid conditions,
                        this might turn into a kick or ban.
                    </p>
                )}
                <p className="mt-2">
                    <b>Block:</b> Message is deleted. After 3 blocks in an hour,
                    the user is challenged. Under raid conditions a block might
                    immediately issue a challenge.
                </p>
                <p className="mt-6">
                    <Link
                        href="https://docs.cleanerbot.xyz/features/automod/"
                        className="font-bold text-gray-300 hover:underline"
                    >
                        Read the docs for more information.
                    </Link>
                </p>
            </Description>

            {categories.map((category) => (
                <Section name={category.name} key={category.name}>
                    {category.rules.map((rule) => (
                        <AutoModRule
                            {...rule}
                            key={rule.name}
                            config={config}
                            updateConfig={updateConfig}
                            guildId={route.guildId}
                            guild={guild}
                        />
                    ))}
                </Section>
            ))}
        </>
    );
}

function AutoModRule({
    name,
    description,
    config,
    updateConfig,
    guildId,
    guild,
}) {
    const field = `rules_${name.replaceAll(".", "_")}`;
    const value = config[field];
    const [updating, setUpdating] = useState(false);

    return (
        <BlockWithPanel
            name={name}
            description={description}
            panel={
                <>
                    Action:
                    <Dropdown
                        values={automodActions}
                        current={value}
                        setCurrent={async (new_value) => {
                            setUpdating(true);
                            const success = await doChange(
                                patchConfig(guildId, { [field]: new_value })
                            );
                            setUpdating(false);
                            if (!success) return;
                            updateConfig({ [field]: new_value });
                        }}
                        className="w-40"
                        disabled={updating}
                    />
                </>
            }
        >
            <MultiSelect
                name="Whitelisted channels:"
                none="No channels."
                singular="Channel"
                field={`${field}_channels`}
                placeholder={
                    guild.channels
                        ? "Select a channel to whitelist."
                        : "Channel list is unavailable. Refresh the page or contact support."
                }
                selection={guild.channels ? guild.channels : []}
                guildId={guildId}
                config={config}
                updateConfig={updateConfig}
            />
        </BlockWithPanel>
    );
}
