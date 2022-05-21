import { useState } from "react";

import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Dropdown, MultiSelect } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Firewall | The Cleaner Dashboard" />
            <Page page="firewall" {...data}>
                <FirewallDashboard {...data} />
            </Page>
        </>
    );
}

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
    I: "User has to solve an interactive challenge.",
    TI: "User is put in timeout or has to solve an interactive challenge.",
};

function FirewallRule({
    name,
    description,
    config,
    setConfig,
    guildId,
    guild,
}) {
    const field = `rules_${name.replaceAll(".", "_")}`;
    const value = config[field];
    const [updating, setUpdating] = useState(false);

    const options = [
        { name: "Disabled", id: 0 },
        { name: "Block", id: 1 },
        { name: "Challenge", id: 2 },
    ];

    return (
        <BlockWithPanel
            name={name}
            description={description}
            panel={
                <div>
                    Action:
                    <Dropdown
                        values={options}
                        current={value}
                        setCurrent={async (new_value) => {
                            setUpdating(true);
                            const success = await doChange(
                                patchConfig(guildId, { [field]: new_value })
                            );
                            setUpdating(false);
                            if (!success) return;
                            setConfig({ ...config, [field]: new_value });
                        }}
                        className="w-40 mt-2"
                        disabled={updating}
                    />
                </div>
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
                setConfig={setConfig}
            />
        </BlockWithPanel>
    );
}

function FirewallDashboard({ config, setConfig, guildId, guild }) {
    return (
        <>
            <Header name="Firewall rules">
                <p>
                    <b>Challenge:</b>{" "}
                    {
                        challengeTextes[
                            (config.challenge_timeout_enabled ? "T" : "") +
                                (config.challenge_interactive_enabled
                                    ? "I"
                                    : "")
                        ]
                    }
                </p>
                {(config.challenge_timeout_enabled ||
                    config.challenge_interactive_enabled) && (
                    <p>
                        When the bot is ratelimited, this might turn into a kick
                        or ban.
                    </p>
                )}
                <p className="mt-2">
                    <b>Block:</b> Message is deleted. After 3 blocks in an hour,
                    the user is challenged. Under raid conditions a block might
                    immediately issue a challenge.
                </p>
            </Header>

            {categories.map((category) => (
                <Section name={category.name} key={category.name}>
                    {category.rules.map((rule) => (
                        <FirewallRule
                            {...rule}
                            key={rule.name}
                            config={config}
                            setConfig={setConfig}
                            guildId={guildId}
                            guild={guild}
                        />
                    ))}
                </Section>
            ))}
        </>
    );
}
