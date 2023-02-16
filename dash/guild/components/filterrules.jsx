import { useEffect, useState } from "react";
import Link from "next/link";

import { Description, Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel, PlainBlock } from "@/components/dash/block.jsx";
import { Button, Dropdown } from "@/components/dash/ui.jsx";
import {
    doChange,
    getFilterRules,
    patchFilterRule,
    postFilterRule,
} from "@/lib/api";
import ErrorHandler from "@/components/dash/error";

const MEMBER_ACTIONS = [
    { name: "Disabled", id: "disabled" },
    { name: "Allow", id: "allow" },
    { name: "Only Kick", id: "kickonly" },
    { name: "Only Ban", id: "banonly" },
    { name: "Kick/Ban (auto)", id: "auto" },
];
const MESSAGE_ACTIONS = [
    { name: "Disabled", id: "disabled" },
    { name: "Allow", id: "allow" },
    { name: "Delete", id: "delete" },
    { name: "Challenge", id: "challenge" },
    // { name: "Kick", id: "kickonly" },
    // { name: "Ban", id: "banonly" },
    { name: "Kick/Ban (auto)", id: "auto" },
];
const LIMIT = 5;
const events = [
    {
        name: "Member join",
        description: "This filter rule will run when a member joins.",
        id: "member_create",
        actions: MEMBER_ACTIONS,
        scopes: ["user", "member"],
    },
    {
        name: "Member edit",
        description:
            "This filter rule will run when a member is edited. This includes events like name/avatar/discriminator change.",
        id: "member_update",
        actions: MEMBER_ACTIONS,
        scopes: ["user", "member"],
    },
    {
        name: "Message send",
        description: "This filter rul will run when a message is sent.",
        id: "message_create",
        actions: MESSAGE_ACTIONS,
        scopes: ["user", "member", "message"],
    },
    {
        name: "Message edit",
        description:
            "This filter rul will run when a message is edited. Some fields may be empty because Discord doesn't send unchanged fields.",
        id: "message_update",
        actions: MESSAGE_ACTIONS,
        scopes: ["user", "member", "message"],
    },
];

export default function FilterRulesComponent({
    config,
    updateConfig,
    guild,
    route,
    updateRoute,
}) {
    const [rules, setRules] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getFilterRules(route.guildId)
            .then((res) => setRules(res.data))
            .catch(setError);
    }, []);

    if (error) return <ErrorHandler error={error} />;

    return (
        <>
            <Description>
                Read the{" "}
                <Link
                    href="https://docs.cleanerbot.xyz/filterrules/"
                    className="font-bold text-gray-400 hover:underline"
                >
                    documentation
                </Link>{" "}
                for more information.
            </Description>
            {events.map((event) => (
                <Event
                    event={event}
                    route={route}
                    key={event.id}
                    rules={rules && rules[event.id]}
                    updateRules={(newRules) => {
                        setRules({ ...rules, [event.id]: newRules });
                    }}
                />
            ))}
        </>
    );
}

function Event({ route, event, rules, updateRules }) {
    const [creating, setCreating] = useState(false);
    return (
        <Section name={event.name}>
            <BlockWithPanel
                name={`Create a new ${event.name.toLowerCase()} rule`}
                description={event.description}
                panel={
                    <Button
                        text="Create rule"
                        disabled={
                            rules === undefined ||
                            rules.length >= LIMIT ||
                            creating
                        }
                        onClick={async () => {
                            setCreating(true);
                            const response = await doChange(
                                postFilterRule(route.guildId, event.id)
                            );
                            setCreating(false);
                            if (!response) return;
                            updateRules([...rules, response.data]);
                        }}
                    />
                }
            >
                <p className="text-xs text-right text-gray-300">
                    {rules !== undefined ? rules.length : "?"} / {LIMIT}
                </p>
            </BlockWithPanel>
            {rules === undefined ? (
                <p>Loading rules…</p>
            ) : (
                rules.map((rule, idx) => (
                    <Rule
                        rule={rule}
                        key={idx}
                        updateRule={(newRule) => {
                            updateRules(
                                rules.map((x, idx2) =>
                                    idx === idx2 ? newRule : x
                                )
                            );
                        }}
                        event={event}
                        route={route}
                        index={idx}
                    />
                ))
            )}
        </Section>
    );
}

function Rule({ rule, updateRule, event, route, index }) {
    const [canSave, setCanSave] = useState(false);
    const [saving, setSaving] = useState(false);
    return (
        <PlainBlock>
            <div className="flex w-full gap-4 text-2xl font-medium">
                Name:
                <input
                    type="text"
                    value={rule.name}
                    className="min-w-0 bg-gray-700"
                    onChange={(event) => {
                        updateRule({ ...rule, name: event.target.value });
                        setCanSave(true);
                    }}
                />
            </div>
            <div className="flex gap-4 mt-2">
                Action:
                <Dropdown
                    values={event.actions}
                    current={rule.action}
                    setCurrent={(action) => {
                        updateRule({ ...rule, action });
                        setCanSave(true);
                    }}
                    className="w-40"
                />
            </div>
            <textarea
                value={rule.code}
                onChange={(event) => {
                    updateRule({ ...rule, code: event.target.value });
                    setCanSave(true);
                }}
                className="w-full px-3 py-1 mt-6 bg-gray-800 rounded-lg"
                placeholder="(current.time - user.created_at) < 300"
            />
            <p className="text-xs text-gray-300">
                Available scopes: {event.scopes.join(", ")}.{" "}
                <Link
                    href={`https://docs.cleanerbot.xyz/filterrules/#event-${event.id}`}
                    className="font-bold text-gray-400 hover:underline"
                >
                    Documentation.
                </Link>
            </p>
            <button
                className="w-full mt-6 --btn --btn-3 --btn-primary sm:w-80"
                disabled={!canSave || saving}
                onClick={async () => {
                    setSaving(true);
                    const response = await doChange(
                        patchFilterRule(route.guildId, event.id, index, rule)
                    );
                    setSaving(false);
                    if (!response) return;
                    setCanSave(false);
                }}
            >
                Save rule
            </button>
        </PlainBlock>
    );
}
