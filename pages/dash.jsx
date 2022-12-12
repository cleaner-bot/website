import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";

import UserRouter from "@/dash/user/userrouter.jsx";
import GuildRouter from "@/dash/guild/guildrouter.jsx";
import MetaTags from "@/components/metatags.jsx";
import { getUser } from "@/lib/api.js";
import { routeUrl } from "@/lib/route.js";

export default function Dashboard() {
    return (
        <>
            <MetaTags title="The Cleaner Dashboard" />
            <DashboardLogic />
        </>
    );
}

function DashboardLogic() {
    const [route, updateRoute] = useReducer((state, action) => {
        const newState = { ...state, ...action };
        window.location.hash = "#" + routeUrl(newState);
        return newState;
    }, {});
    const [user, setUser] = useState();
    const router = useRouter();
    useEffect(() => {
        const [guildId, component, ...other] = window.location.hash
            .substring(1)
            .split("/");
        updateRoute({
            guildId: guildId ?? "",
            component: component ?? "",
            other: other ?? [],
        });
        if (!user)
            getUser()
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
    }, [router, user]);
    console.log(route);
    if (route.guildId === undefined) return null;
    if (!/^\d{18,22}$/.test(route.guildId))
        return (
            <UserRouter
                route={route}
                updateRoute={updateRoute}
                user={user}
                setUser={setUser}
            />
        );
    return (
        <GuildRouter
            route={route}
            updateRoute={updateRoute}
            user={user}
            setUser={setUser}
        />
    );
}
