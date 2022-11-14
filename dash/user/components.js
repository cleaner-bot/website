import {
    ArrowLeftOnRectangleIcon,
    HomeIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    DocumentTextIcon,
} from "@heroicons/react/20/solid";

import BanSyncComponent from "@/dash/user/components/bansync.jsx";
import GuildListComponent from "@/dash/user/components/guildlist.jsx";
import LogoutComponent from "@/dash/user/components/logout.jsx";
import MFAComponent from "@/dash/user/components/mfa.jsx";
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
        name: "Ban Lists",
        id: "bansync",
        icon: DocumentTextIcon,
        component: {
            title: "Your Ban Lists",
            description: "Create, edit and control your own ban lists!",
            component: BanSyncComponent,
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
