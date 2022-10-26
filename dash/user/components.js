import {
    ArrowLeftOnRectangleIcon,
    HomeIcon,
    ShieldCheckIcon,
    ChartBarIcon,
} from "@heroicons/react/20/solid";

import GuildListComponent from "@/dash/user/components/guildlist.jsx";
import MFAComponent from "@/dash/user/components/mfa.jsx";
import LogoutComponent from "@/dash/user/components/logout.jsx";
import StatisticsComponent from "@/dash/user/components/statistics.jsx";

const registry = [
    {
        name: "Server List",
        id: "",
        icon: HomeIcon,
        component: {
            title: "Server List",
            description: "",
            component: GuildListComponent,
        },
    },
    {
        name: "Statistics",
        id: "statistics",
        icon: ChartBarIcon,
        component: {
            title: "Statistics (per-user)",
            description: "Statistics across all servers you have access to.",
            component: StatisticsComponent,
        },
    },
    {
        name: "MFA",
        id: "mfa",
        icon: ShieldCheckIcon,
        component: {
            title: "Multi Factor Authorization",
            description:
                "MFA can be used to secure the dashboard of servers that are really paranoid.",
            component: MFAComponent,
        },
    },
    {
        name: "Logout",
        id: "logout",
        icon: ArrowLeftOnRectangleIcon,
        restrictions: ["loggedin"],
        component: {
            title: "Logout",
            description: "",
            component: LogoutComponent,
        },
    },
];

export default registry;
