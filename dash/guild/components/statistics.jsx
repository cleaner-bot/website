import { useEffect, useState } from "react";

import ErrorHandler from "@/components/dash/error.jsx";
import { CommonRadar } from "@/components/statistics.jsx";
import { getGuildStatistics } from "@/lib/api.js";

export default function StatisticsComponent({ route }) {
    const [response, setResponse] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getGuildStatistics(route.guildId).then(setResponse).catch(setError);
    }, []);

    return (
        error ? (
            <ErrorHandler error={error} />
        ) : response?.data === null ? (
            <div className="mt-10 text-center">No data available.</div>
        ) : (
            <CommonRadar data={response?.data} />
        )
    );
}
