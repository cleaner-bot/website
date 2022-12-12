import {
    BoxArrowInLeft,
    House,
    ShieldCheck,
    BarChart,
    ListCheck,
} from "react-bootstrap-icons";

import BanSyncComponent from "@/dash/user/components/bansync.jsx";
import GuildListComponent from "@/dash/user/components/guildlist.jsx";
import LogoutComponent from "@/dash/user/components/logout.jsx";
import MFAComponent from "@/dash/user/components/mfa.jsx";
import StatisticsComponent from "@/dash/user/components/statistics.jsx";

const registry = [
    {
        name: "Server List",
        id: "",
        icon: House,
        component: {
            title: "Server List",
            description: "",
            component: GuildListComponent,
        },
    },
    {
        name: "Statistics",
        id: "statistics",
        icon: BarChart,
        component: {
            title: "Statistics (per-user)",
            description: "Statistics across all servers you have access to.",
            component: StatisticsComponent,
        },
    },
    {
        name: "Ban Lists",
        id: "bansync",
        icon: ListCheck,
        component: {
            title: "Your Ban Lists",
            description: "Create, edit and control your own ban lists!",
            component: BanSyncComponent,
        },
    },
    {
        name: "MFA",
        id: "mfa",
        icon: ShieldCheck,
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
        icon: BoxArrowInLeft,
        restrictions: ["loggedin"],
        component: {
            title: "Logout",
            description: "",
            component: LogoutComponent,
        },
    },
];

export default registry;
