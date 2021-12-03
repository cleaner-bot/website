
import MetaTags from "@/components/metatags.jsx";


export default function Radar() {
    const data = {'rules': {'phishing': {'instant': 89, 'not_instant': 11}, 'categories': {'Advertisements': 6, 'Phishing': 35, 'Other': 2, 'Antispam': 56}}, 'challenges': {'action': {'captchas': 11, 'bans': 89}, 'categories': {'Phishing': 40, 'Antispam': 58, 'Advertisements': 1, 'Other': 0}}, 'last_data': '2021-12-03T02:17:09'}
    const sorted_rules_categories = Object.keys(data.rules.categories).map(x => ({name: x, value: data.rules.categories[x]})).sort((a, b) => b.value - a.value);
    const sorted_challenge_categories = Object.keys(data.challenges.categories).map(x => ({name: x, value: data.challenges.categories[x]})).sort((a, b) => b.value - a.value);
    return (
        <div className="-container">
            <MetaTags
                title="The Cleaner Radar"
                description="Some statistics about The Cleaner."
            />

            <h1 className="text-5xl font-bold mt-6 mb-4">
                The Cleaner Radar
            </h1>
            <p>
                Last update: {new Date(data.last_data).toLocaleString()}
            </p>
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
                </div>
            </div>
        </div>
    )
}
