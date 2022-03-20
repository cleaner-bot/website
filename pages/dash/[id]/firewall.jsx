
import { useState } from "react";
import { useRouter } from "next/router";

import { doChange, patchConfig } from "@/lib/api.js";
import { DataWrapper } from "@/components/dash/data.jsx";
import { Dropdown, BlockRightSide } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Firewall | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={FirewallDashboard} current="firewall" />
        </>
    )
}

function FirewallRule({ rule, description, field, data }) {
    const [value, setValue] = useState(+data.config[field]);
    const [updating, setUpdating] = useState(false);

    const options = [
        { name: "Disabled", id: 0 },
        { name: "Block", id: 1 },
        { name: "Challenge", id: 2 }
    ];

    return (
        <BlockRightSide
            rightSide={<>
                <div>
                    Action:
                    <Dropdown
                        values={options}
                        current={value}
                        setCurrent={async new_value => {
                            setUpdating(true);
                            const success = await doChange(patchConfig(data.guild.id, {[field]: new_value}));
                            setUpdating(false);
                            if(!success) return;
                            setValue(new_value);
                            data.config[field] = new_value;
                        }}
                        className="w-40 mt-2"
                        disabled={updating}
                    />
                </div>
            </>}
        >
            <h2 className="text-2xl font-medium break-all">
                {rule}
            </h2>
            <p className="text-gray-200">
                {description}
            </p>
        </BlockRightSide>
    )
}


function FirewallDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Firewall
            </h1>
            <p className="mt-2 text-gray-300">
                Firewall rules.
            </p>
            <p className="mt-8 text-gray-100">
                <b>Challenge:</b>{" "}
                {data.config.challenge_timeout_enabled && data.config.challenge_interactive_enabled && "User is put in timeout or has to solve an interactive challenge."}
                {data.config.challenge_timeout_enabled && !data.config.challenge_interactive_enabled && "User is put in timeout."}
                {!data.config.challenge_timeout_enabled && data.config.challenge_interactive_enabled && "User has to solve an interactive challenge."}
                {!data.config.challenge_timeout_enabled && !data.config.challenge_interactive_enabled && "User is immediately banned."}
                {(data.config.challenge_timeout_enabled || data.config.challenge_interactive_enabled) && " (under certain conditions this might turn into an immediate kick or ban)"}
            </p>
            <p className="mt-2 text-gray-100">
                <b>Block:</b> Message is deleted. After 3 blocks in an hour, the user is challenged.
                Under raid conditions a block might immediately issue a challenge.
            </p>

            <h2 className="mt-20 text-2xl">
                Phishing rules
            </h2>
            <div className="my-12 space-y-12">
                <FirewallRule
                    rule="phishing.content"
                    description="Phishing detection using heuristics trained on previous phishing messages."
                    data={data}
                    field="rules_phishing_content"
                />
                <FirewallRule
                    rule="phishing.domain.blacklisted"
                    description="Phishing detection using a domain blacklist."
                    data={data}
                    field="rules_phishing_domain_blacklisted"
                />
                <FirewallRule
                    rule="phishing.domain.heuristic"
                    description="Phishing detection using domain heuristics. Sometimes produces false positives."
                    data={data}
                    field="rules_phishing_domain_heuristic"
                />
                <FirewallRule
                    rule="phishing.embed"
                    description="Phishing detection using preview embeds."
                    data={data}
                    field="rules_phishing_embed"
                />
            </div>

            <h2 className="mt-20 text-2xl">
                Ping
            </h2>
            <div className="my-12 space-y-12">
                <FirewallRule
                    rule="ping.users.many"
                    description="Catches people pinging more than 15 users."
                    data={data}
                    field="rules_ping_users_many"
                />
                <FirewallRule
                    rule="ping.users.few"
                    description="Catches people pinging more than 5 users."
                    data={data}
                    field="rules_ping_users_few"
                />
                <FirewallRule
                    rule="ping.roles"
                    description="Catches people pinging more than 5 roles."
                    data={data}
                    field="rules_ping_roles"
                />
                <FirewallRule
                    rule="ping.broad"
                    description="Catches people pinging the @everyone or @here role without actually have the permissions to do so."
                    data={data}
                    field="rules_ping_broad"
                />
                <FirewallRule
                    rule="ping.hidden"
                    description="Catches people hiding pings using client bugs."
                    data={data}
                    field="rules_ping_hidden"
                />
            </div>

            <h2 className="mt-20 text-2xl">
                Advertisements
            </h2>
            <div className="my-12 space-y-12">
                <FirewallRule
                    rule="advertisement.discord.server"
                    description="Catches any invites to discord servers."
                    data={data}
                    field="rules_advertisement_discord_server"
                />
            </div>

            <h2 className="mt-20 text-2xl">
                Miscellaneous
            </h2>
            <div className="my-12 space-y-12">
                <FirewallRule
                    rule="selfbot.embed"
                    description="Self bot detection using embeds."
                    data={data}
                    field="rules_selfbot_embed"
                />
                <FirewallRule
                    rule="emoji.mass"
                    description="Catches messages with more than 7 emojis. This rule is always disabled in exception channels (see Slowmode settings)."
                    data={data}
                    field="rules_emoji_mass"
                />
            </div>
        </>
    )
}
 