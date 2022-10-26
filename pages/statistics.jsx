// import { HomeIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import { getGlobalStatistics } from "@/lib/api.js";
import MetaTags from "@/components/metatags.jsx";
import Footer from "@/components/footer.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { Stats, CommonRadar } from "@/components/statistics.jsx";

export default function Radar() {
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getGlobalStatistics().then(setResponse).catch(setError);
    }, []);

    return (
        <div className="py-6 --container">
            <MetaTags
                title="The Cleaner - Global Statistics"
                description="Some statistics collected by The Cleaner."
            />

            <h1 className="mb-4 text-5xl font-bold">
                The Cleaner - Global Statistics
            </h1>
            <p className="mt-8">
                The Cleaner is a Discord bot for keeping your servers clean.
                Shown here are statistics powered by real data we collect
                anonymously to provide insight into current trends.
            </p>
            {error ? (
                <>
                    <ErrorHandler error={error} />
                </>
            ) : response?.data === null ? (
                <div className="mt-10 text-center">No data available.</div>
            ) : (
                <>
                    {/* <h2 className="mt-20 mb-4 text-2xl font-bold">
                        General statistics
                    </h2>
                    <Stats
                        stats={[
                            null,
                            {
                                name: "Guilds",
                                icon: HomeIcon,
                                stat:
                                    response && response.data.stats.guild_count,
                            },
                            {
                                name: "Users (approximate)",
                                icon: UsersIcon,
                                stat:
                                    response && response.data.stats.user_count,
                            },
                        ]}
                    /> */}
                    <CommonRadar data={response?.data} />
                </>
            )}

            <div className="pt-8 mt-40 border-t border-gray-550" />
            <Footer />
        </div>
    );
}
