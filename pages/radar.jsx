import { HomeIcon, UsersIcon } from "@heroicons/react/solid";

import { useRadar } from "@/lib/api.js";
import MetaTags from "@/components/metatags.jsx";
import Footer from "@/components/footer.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import { Stats, CommonRadar } from "@/components/radar.jsx";

export default function Radar() {
    const { data: response, error: isError } = useRadar();

    return (
        <div className="py-6 --container">
            <MetaTags
                title="The Cleaner Radar"
                description="Some statistics about The Cleaner."
            />

            <h1 className="mb-4 text-5xl font-bold">The Cleaner Radar</h1>
            <p className="mt-8">
                The Cleaner is a Discord bot for keeping your servers clean. The
                Cleaner Radar is powered by real data we collect anonymously to
                provide statistics.
            </p>
            {isError ? (
                <>
                    <ErrorHandler error={isError} />
                </>
            ) : (
                <>
                    <h2 className="mt-20 mb-4 text-2xl font-bold">
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
                    />
                    <CommonRadar data={response?.data} />
                </>
            )}

            <div className="pt-8 mt-40 border-t border-gray-550" />
            <Footer />
        </div>
    );
}
