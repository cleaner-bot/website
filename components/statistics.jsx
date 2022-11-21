import { useState } from "react";
import {
    ArrowUpShort,
    ArrowRightShort,
    ArrowDownShort,
} from "react-bootstrap-icons";
import clsx from "clsx";

import Skeleton from "@/components/skeleton.jsx";
import { range } from "@/lib/helper.js";
import { Dropdown } from "@/components/dash/ui.jsx";

const timespans = [
    { name: "Last day", id: "day" },
    { name: "Last week", id: "week" },
    { name: "Last month", id: "month" },
    { name: "Last half a year", id: "half_year" },
    { name: "All time", id: "all_time" },
];

const baseRules = [
    "phishing.content",
    "phishing.domain.blacklisted",
    "phishing.domain.heuristic",
    "phishing.embed",
    "ping.users.many",
    "ping.users.few",
    "ping.roles",
    "ping.broad",
    "ping.hidden",
    "advertisement.discord.invite",
    "advertisement.discord.unsafeinvite",
    "selfbot.embed",
    "emoji.mass",
];
const baseTraffic = [
    "traffic.similar",
    "traffic.exact",
    "traffic.token",
    "traffic.sticker",
    "traffic.attachment",
];

export function Stats({ stats }) {
    return (
        <dl className="grid grid-cols-1 gap-px mt-5 overflow-hidden bg-gray-800 rounded-lg shadow md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
                <StatItem item={item} key={item.name} />
            ))}
        </dl>
    );
}

function StatItem({ item }) {
    if (!item) return <div />;
    if (item.stat === undefined)
        return (
            <Skeleton
                key={item.name}
                className="h-28 md:h-[10.25rem] lg:h-[8.25rem]"
            />
        );
    return (
        <div className="px-4 py-5 sm:p-6 bg-gray-750">
            <dt className="flex text-base font-normal text-gray-100">
                {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                {item.name}
            </dt>
            <dd>
                <div className="flex justify-between">
                    <div>
                        <p className="flex items-baseline text-sm font-medium text-gray-400">
                            <span className="mr-2 text-2xl font-semibold text-indigo-400">
                                {(typeof item.stat === "number"
                                    ? item.stat
                                    : item.stat?.current ?? 0
                                ).toLocaleString()}
                            </span>
                            {typeof item.stat !== "number" && (
                                <>
                                    from{" "}
                                    {(
                                        item.stat?.previous ?? 0
                                    ).toLocaleString()}
                                </>
                            )}
                        </p>
                    </div>
                    {typeof item.stat !== "number" && (
                        <div className="flex flex-col gap-1">
                            <IncreaseDecreaseBadge
                                value={
                                    item.stat
                                        ? item.stat.previous - item.stat.current
                                        : 0
                                }
                            />
                            {item.stat && item.stat.previous > 0 && (
                                <IncreaseDecreaseBadge
                                    value={
                                        -(
                                            item.stat.current /
                                            item.stat.previous
                                        ) + 1
                                    }
                                    style="percent"
                                />
                            )}
                        </div>
                    )}
                </div>
            </dd>
        </div>
    );
}

function IncreaseDecreaseBadge({ value, style }) {
    return (
        <div
            className={clsx(
                value === 0
                    ? "bg-gray-100 text-gray-800"
                    : value > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
            )}
        >
            {value === 0 ? (
                <ArrowRightShort className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-gray-600" />
            ) : value > 0 ? (
                <ArrowDownShort className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-600" />
            ) : (
                <ArrowUpShort className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-600" />
            )}

            <span className="sr-only">
                {value >= 0 ? "Increased" : "Decreased"} by
            </span>
            {value.toLocaleString(undefined, { signDisplay: "never", style })}
        </div>
    );
}

function formatNumber(number) {
    if (!isFinite(number)) return number;
    let [whole, fraction] = number.toString().split(".");
    whole = whole
        .split("")
        .reverse()
        .map((char, i) => (i % 3 === 2 ? `,${char}` : char))
        .reverse()
        .join("")
        .replace(/^,/g, "");
    return fraction && fraction.length > 0 ? `${whole}.${fraction}` : whole;
}

export function CommonRadar({ data }) {
    const [timespan, setTimespan] = useState("week");

    const optionals = (data, names) =>
        names.map(({ name, id }) => ({
            name,
            stat: data && (data[id] ?? null),
        }));

    return (
        <>
            <div className="flex justify-between mt-20 mb-4">
                <h2 className="text-2xl font-bold">Services</h2>
                <Dropdown
                    values={timespans}
                    current={timespan}
                    setCurrent={setTimespan}
                    className="w-40"
                />
            </div>
            <p className="mb-4 text-sm text-gray-200">Triggered services.</p>
            <Stats
                stats={optionals(data && data[timespan].services, [
                    { name: "Slowmode changes", id: "slowmode" },
                    { name: "Antiraid actions", id: "antiraid" },
                    { name: "Join Guard action", id: "joinguard" },
                    {
                        name: "Super Verification actions",
                        id: "super_verification",
                    },
                    { name: "Name Checker actions", id: "name" },
                    { name: "Dehoists", id: "dehoist" },
                    { name: "Ban Synchronizations", id: "bansync" },
                    { name: "Total raids", id: "raid" },
                    { name: "Link Filter actions", id: "linkfilter" },
                ])}
            />

            <h2 className="mt-20 mb-4 text-2xl font-bold">Spam categories</h2>
            <p className="mb-4 text-sm text-gray-200">
                Categories of messages caught by auto moderator and antispam.
            </p>
            <Stats
                stats={optionals(data && data[timespan].categories, [
                    { name: "Phishing", id: "phishing" },
                    { name: "Advertisement", id: "advertisement" },
                    { name: "Anti Spam", id: "antispam" },
                    { name: "Other", id: "other" },
                ])}
            />

            <h2 className="mt-20 mb-4 text-2xl font-bold">Punishments</h2>
            <p className="mb-4 text-sm text-gray-200">
                Punishments issued as a response to stop bad actors.
            </p>
            <Stats
                stats={optionals(data && data[timespan].punishments, [
                    { name: "Ban", id: "ban" },
                    { name: "Kick", id: "kick" },
                    { name: "Re-verification", id: "role" },
                    { name: "Timeout", id: "timeout" },
                ])}
            />

            <h2 className="mt-20 mb-4 text-2xl font-bold">
                Triggered auto moderator rules
            </h2>
            <p className="mb-4 text-sm text-gray-200">
                All auto moderator rules that were triggered.
            </p>

            {data ? (
                <Stats
                    stats={baseRules
                        .sort(
                            (a, b) =>
                                (data[timespan].rules[b]?.current ?? 0) -
                                (data[timespan].rules[a]?.current ?? 0)
                        )
                        .map((key) => ({
                            name: key,
                            stat: data[timespan].rules[key] ?? null,
                        }))}
                />
            ) : (
                <Stats stats={range(12, (index) => ({ name: index }))} />
            )}

            <h2 className="mt-20 mb-4 text-2xl font-bold">
                Triggered antispam
            </h2>
            <p className="mb-4 text-sm text-gray-200">
                All antispam traffic rules that were triggered.
            </p>

            {data ? (
                <Stats
                    stats={baseTraffic
                        .sort(
                            (a, b) =>
                                (data[timespan].traffic[b]?.current ?? 0) -
                                (data[timespan].traffic[a]?.current ?? 0)
                        )
                        .map((key) => ({
                            name: key,
                            stat: data[timespan].traffic[key] ?? null,
                        }))}
                />
            ) : (
                <Stats stats={range(6, (index) => ({ name: index }))} />
            )}
        </>
    );
}
