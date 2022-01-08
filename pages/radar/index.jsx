
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";

import MetaTags from "@/components/metatags.jsx";


export default function Radar() {
    const data = {'trends': {'categories': {'Antispam': 97, 'Phishing': 75, 'Advertisement': 54, 'Other': 112}}, 'rules': {'phishing': {'instant': 100, 'not_instant': 0}, 'categories': {'Antispam': 35, 'Phishing': 34, 'Advertisement': 28, 'Other': 3}}, 'challenges': {'action': {'captchas': 6, 'bans': 94}, 'categories': {'Phishing': 63, 'Advertisement': 4, 'Antispam': 32, 'Other': 1}}, 'raid': {'total': {'count': 11, 'total_participants': 285, 'average_participants': 26, 'average_duration': 298, 'average_participants_percent': 35, 'average_duration_percent': 72}, 'biggest': {'participants': 75, 'duration': 414}}, 'last_data': '2022-01-08T16:18:15'}
    const sorted_trend_rules_categories = Object.keys(data.trends.categories).map(x => ({name: x, value: data.trends.categories[x]})).sort((a, b) => b.value - a.value);
    const sorted_rules_categories = Object.keys(data.rules.categories).map(x => ({name: x, value: data.rules.categories[x]})).sort((a, b) => b.value - a.value);
    const sorted_challenge_categories = Object.keys(data.challenges.categories).map(x => ({name: x, value: data.challenges.categories[x]})).sort((a, b) => b.value - a.value);
    const [lastUpdated, setLastUpdated] = useState("unknown");
    useEffect(() => {
        setLastUpdated(new Date(data.last_data).toLocaleString());
    }, [data])
    return (
        <div className="-container py-6">
            <MetaTags
                title="The Cleaner Radar"
                description="Some statistics about The Cleaner."
            />

            <h1 className="text-5xl font-bold mb-4">
                The Cleaner Radar
            </h1>
            <p>
                Last update: {lastUpdated}
            </p>
            <p className="mt-8">
                The Cleaner is a Discord bot for keeping your servers clean.
                The Cleaner Radar is powered by real data we collect anonymously to provide you (and us) with statistics.
                This will stay relatively simple for now, because we do not have much data to show off.
            </p>
            <h2 className="text-2xl font-bold mt-20 mb-4">
                Trends
            </h2>
            <div>
                <h3 className="text-xl font-semibold mb-2">
                    Triggered rules trends
            </h3>
                <p className="text-gray-200 text-sm mb-4">
                    Trends comparing the total number of rules triggered in the last 7 days to the 7 days before.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    {sorted_trend_rules_categories.map(d => <div key={d.name}>
                            <p className="text-gray-100">
                                {d.name}
                            </p>
                            <p className="flex items-baseline">
                                {d.value == 100 && <>
                                    No change - <span className="font-bold text-2xl mx-2">0%</span>
                                    <ChevronRightIcon className="w-6 h-6 text-gray-400 inline self-center" />
                                </>}
                                {d.value > 100 && <>
                                    Increased by <span className="font-bold text-2xl mx-2">{d.value - 100}%</span>
                                    <ChevronUpIcon className="w-6 h-6 text-red-400 inline self-center" />
                                </>}
                                {d.value < 100 && <>
                                    Decreased by <span className="font-bold text-2xl mx-2">{100 - d.value}%</span>
                                    <ChevronDownIcon className="w-6 h-6 text-green-400 inline self-center" />
                                </>}
                            </p>
                    </div>)}
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-20 mb-4">
                Rules
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Phishing detection
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        Instant detection means the author was challenged after the first message.
                        Not instant detection means the detection occurred after 3 messages.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-right">
                            <p className="text-gray-100">
                                Instant
                            </p>
                            <p className="text-2xl font-bold">
                                {data.rules.phishing.instant}%
                            </p>
                            <div className="border-b-4 rounded border-emerald-500 ml-auto" style={{width: `${data.rules.phishing.instant}%`}} />
                        </div>
                        <div>
                            <p className="text-gray-100">
                                Not Instant
                            </p>
                            <p className="text-2xl font-bold">
                                {data.rules.phishing.not_instant}%
                            </p>
                            <div className="border-b-4 rounded border-red-500" style={{width: `${data.rules.phishing.not_instant}%`}} />
                        </div>
                    </div>
                    <p className="text-gray-200 text-sm mt-4">
                        Timespan: Last 2 weeks.
                    </p>
                    <Link href="/quickstart">
                        <a className="-anim -btn bg-coolGray-750 hover:bg-blue-630 mt-12">
                            Detect phishing with The Cleaner!
                        </a>
                    </Link>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Categories
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        Triggered rules categorized. 
                        Antispam are all dynamic and mitigation rules.
                    </p>
                    <div>
                        {sorted_rules_categories.map(d => <div key={d.name}>
                            <p className="text-gray-100">
                                {d.name}
                            </p>
                            <p className="text-2xl font-bold">
                                {d.value}%
                            </p>
                            <div className="border-b-4 rounded border-amber-600 ml-auto" style={{width: `${d.value}%`}} />
                        </div>)}
                    </div>
                    <p className="text-gray-200 text-sm mt-4">
                        Timespan: Last 2 weeks.
                    </p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-20 mb-4">
                Challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        CAPTCHAs vs bans
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        CAPTCHAs and bans issued after a rule has been violated.
                        We recommend CAPTCHA verification, so that violators have a second chance while also stopping raids and bots.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-right">
                            <p className="text-gray-100">
                                Ban
                            </p>
                            <p className="text-2xl font-bold">
                                {data.challenges.action.bans}%
                            </p>
                            <div className="border-b-4 rounded border-amber-600 ml-auto" style={{width: `${data.challenges.action.bans}%`}} />
                        </div>
                        <div>
                            <p className="text-gray-100">
                                CAPTCHA
                            </p>
                            <p className="text-2xl font-bold">
                                {data.challenges.action.captchas}%
                            </p>
                            <div className="border-b-4 rounded border-amber-600" style={{width: `${data.challenges.action.captchas}%`}} />
                        </div>
                    </div>
                    <p className="text-gray-200 text-sm mt-4">
                        Timespan: All time.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Categories
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        Rules that triggered the challenge categorized.
                        Antispam are all dynamic and mitigation rules.
                    </p>
                    <div>
                        {sorted_challenge_categories.map(d => <div key={d.name}>
                            <p className="text-gray-100">
                                {d.name}
                            </p>
                            <p className="text-2xl font-bold">
                                {d.value}%
                            </p>
                            <div className="border-b-4 rounded border-amber-600 ml-auto" style={{width: `${d.value}%`}} />
                        </div>)}
                    </div>
                    <p className="text-gray-200 text-sm mt-4">
                        Timespan: Last 2 weeks.
                    </p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-20 mb-4">
                Raids
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Biggest raid
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        Biggest raid we have encountered to this date.
                    </p>
                    <div>
                        <div>
                            <p className="text-gray-100">
                                Participants
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.biggest.participants} accounts
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-100">
                                Duration
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.biggest.duration > 60 && <>
                                    {Math.floor(data.raid.biggest.duration / 60)} minutes and{" "}
                                </>}
                                {data.raid.biggest.duration % 60} seconds
                            </p>
                        </div>
                    </div>
                    <Link href="/quickstart">
                        <a className="-anim -btn bg-coolGray-750 hover:bg-blue-630 mt-12">
                            Protect your server with The Cleaner!
                        </a>
                    </Link>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Total Raids
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                        Very small raids have been excluded.
                    </p>
                    <div>
                        <div>
                            <p className="text-gray-100">
                                Total raids
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.total.count} raids
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-100">
                                Total participants
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.total.total_participants} accounts
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-100">
                                Average participants
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.total.average_participants} accounts
                            </p>
                            <div className="border-b-4 rounded border-amber-600 ml-auto" style={{width: `${data.raid.total.average_participants_percent}%`}} />
                        </div>
                        <div>
                            <p className="text-gray-100">
                                Average duration
                            </p>
                            <p className="text-2xl font-bold">
                                {data.raid.total.average_duration > 60 && <>
                                    {Math.floor(data.raid.total.average_duration / 60)} minutes and{" "}
                                </>}
                                {data.raid.total.average_duration % 60} seconds
                            </p>
                            <div className="border-b-4 rounded border-amber-600 ml-auto" style={{width: `${data.raid.total.average_duration_percent}%`}} />
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/">
                <a className="-anim -btn bg-blue-580 hover:bg-blue-630 mt-12 mx-auto max-w-[35rem]">
                    <span className="hidden md:block">
                        Discover how you can protect your Discord server with The Cleaner!
                    </span>
                    <span className="md:hidden">
                        Features of The Cleaner
                    </span>
                </a>
            </Link>
        </div>
    )
}

/*

                    <p className="h-6">
                        {barState >= 10 && barState < 10 + sorted_challenge_categories.length && <>
                            Selected: {sorted_challenge_categories[barState - 10].name}  ({sorted_challenge_categories[barState - 10].value}%)
                        </>}
                    </p>
                    <BarChart layout="vertical" width={600} height={50} data={[data.challenges.categories]} className="w-full">
                        <XAxis hide type="number" />
                        <YAxis hide dataKey="name" type="category" />
                        <Tooltip />
                        {sorted_challenge_categories.map((x, i) => <Bar
                            dataKey={x.name}
                            stackId="a"
                            fill={categoryColors[x.name]}
                            onMouseOver={() => setBarState(10 + i)}
                            className={barState === 10 + i && "scale-y-110 origin-center"}
                            radius={i === 0 ? [10, 0, 0, 10] : i === sorted_challenge_categories.length - 1 ? [0, 10, 10, 0] : undefined}
                            key={x.name}
                        />)}
                    </BarChart>
*/
