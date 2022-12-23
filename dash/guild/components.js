// component registry

import {
    Archive,
    House,
    BarChart,
    ShieldCheck,
    ClipboardCheck,
    PersonPlus,
    People,
    Funnel,
    Hammer,
    Lock,
    Award,
    ListCheck,
    Clock,
    CreditCard,
    PersonVcard,
    Envelope,
    Robot,
    ExclamationTriangle,
    X,
    SlashLg,
    Globe,
    Clipboard,
    CheckLg,
    Alarm,
} from "react-bootstrap-icons";

import AccessComponent from "@/dash/guild/components/access.jsx";
import AntiNukeComponent from "@/dash/guild/components/antinuke.jsx";
import AntiRaidComponent from "@/dash/guild/components/antiraid.jsx";
import AntiSpamComponent from "@/dash/guild/components/antispam.jsx";
import AuthComponent from "@/dash/guild/components/auth.jsx";
import AutoModComponent from "@/dash/guild/components/automod.jsx";
import BanSyncComponent from "@/dash/guild/components/bansync.jsx";
import BrandingComponent from "@/dash/guild/components/branding.jsx";
import ContactComponent from "@/dash/guild/components/contact.jsx";
import DeveloperComponent from "@/dash/guild/components/dev.jsx";
import GeneralComponent from "@/dash/guild/components/general.jsx";
import JoinGuardComponent from "@/dash/guild/components/joinguard.jsx";
import LoggingComponent from "@/dash/guild/components/logging.jsx";
import NameCheckerComponent from "@/dash/guild/components/name.jsx";
import PlanComponent from "@/dash/guild/components/plan.jsx";
import PunishmentsComponent from "@/dash/guild/components/punishments.jsx";
import ReportComponent from "@/dash/guild/components/report.jsx";
import SlowmodeComponent from "@/dash/guild/components/slowmode.jsx";
import StatisticsComponent from "@/dash/guild/components/statistics.jsx";
import TimeLimitComponent from "@/dash/guild/components/timelimit.jsx";
import SuperVerificationComponent from "@/dash/guild/components/super-verification.jsx";
import VerificationComponent from "@/dash/guild/components/verification.jsx";
import LinkFilterComponent from "@/dash/guild/components/linkfilter.jsx";

const registry = [
    {
        name: "General",
        components: [
            {
                name: "General",
                id: "",
                icon: House,
                component: {
                    title: "General",
                    description: "",
                    component: GeneralComponent,
                },
            },
            {
                name: "Statistics",
                id: "statistics",
                icon: BarChart,
                component: {
                    title: "Statistics",
                    description:
                        "Look at the statistics of your server. Statistics may take up to 5 minutes to update.",
                    component: StatisticsComponent,
                },
            },
            {
                name: "Logging",
                id: "logging",
                icon: Archive,
                component: {
                    title: "Logging",
                    description:
                        "Logging allows you to get notified about actions The Cleaner is performing.",
                    component: LoggingComponent,
                },
            },
        ],
    },
    {
        name: "Security",
        components: [
            {
                name: "Auto Moderator",
                id: "automod",
                icon: Funnel,
                component: {
                    title: "Auto Moderator",
                    description:
                        "Auto Moderator, the strongest assistance automatic assistance to your moderators in day to day life.",
                    component: AutoModComponent,
                },
            },
            {
                name: "Anti Spam",
                id: "antispam",
                icon: ShieldCheck,
                component: {
                    title: "Anti Spam",
                    description:
                        "Anti Spam, automatically mitigate all kinds of spam.",
                    component: AntiSpamComponent,
                },
            },
            {
                name: "Anti Raid",
                id: "antiraid",
                icon: People,
                restrictions: ["antiraid"],
                component: {
                    title: "Anti Raid",
                    description: "Anti Raid, let your mods sleep.",
                    component: AntiRaidComponent,
                },
            },
            {
                name: "Link Filter",
                id: "linkfilter",
                icon: ClipboardCheck,
                restrictions: ["linkfilter"],
                badges: ["beta"],
                component: {
                    title: "Link Filter",
                    description:
                        "Control what links can be sent in your server.",
                    component: LinkFilterComponent,
                },
            },
            {
                name: "Punishments",
                id: "punishments",
                icon: Hammer,
                component: {
                    title: "Punishments",
                    description: "Control how users are punished.",
                    component: PunishmentsComponent,
                },
            },
            {
                name: "Name Checker",
                id: "name",
                icon: PersonVcard,
                component: {
                    title: "Name Checker",
                    description: "Moderate the names of all users.",
                    component: NameCheckerComponent,
                },
            },
            {
                name: "Slowmode",
                id: "slowmode",
                icon: Clock,
                component: {
                    title: "Slowmode",
                    description: "Automatically adjust slowmode",
                    component: SlowmodeComponent,
                },
            },
            {
                name: "Report",
                id: "report",
                icon: Clipboard,
                restrictions: ["report"],
                badges: ["beta"],
                component: {
                    title: "Report",
                    description:
                        "Let your users report messages to your moderators.",
                    component: ReportComponent,
                },
            },
            {
                name: "Ban Sync",
                id: "bansync",
                icon: ListCheck,
                badges: ["beta"],
                component: {
                    title: "Ban Synchronization",
                    description: "Synchronize bans across servers.",
                    component: BanSyncComponent,
                },
            },
        ],
    },
    {
        name: "Verification",
        components: [
            {
                name: "Verification",
                id: "verification",
                icon: Lock,
                restrictions: ["verification"],
                component: {
                    title: "Verification",
                    description:
                        "Control verification before people can chat in your Discord.",
                    component: VerificationComponent,
                },
            },
            {
                name: "Super Verification",
                id: "super-verification",
                icon: ShieldCheck,
                restrictions: ["super_verification"],
                badges: ["beta"],
                component: {
                    title: "Super Verification",
                    description:
                        "Control verification before people can participate in your Discord.",
                    component: SuperVerificationComponent,
                },
            },
            {
                name: "Join Guard",
                id: "joinguard",
                icon: PersonPlus,
                restrictions: ["joinguard"],
                badges: ["beta"],
                component: {
                    title: "Join Guard",
                    description:
                        "Control verification before people can join your Discord.",
                    component: JoinGuardComponent,
                },
            },
            {
                name: "Timelimit",
                id: "timelimit",
                icon: Alarm,
                restrictions: ["verification_timelimit"],
                badges: ["beta"],
                component: {
                    title: "Timelimit",
                    description:
                        "Verification timelimit after which users will be kicked.",
                    component: TimeLimitComponent,
                },
            },
        ],
    },
    {
        name: "Zero Trust",
        components: [
            {
                name: "Overview",
                id: "overview",
                icon: Globe,
                restrictions: ["dev"],
                badges: ["beta"],
                component: {
                    title: "Zero Trust - Overview",
                    description: "Overview over Zero Trust.",
                },
            },
            {
                name: "Access",
                id: "access",
                icon: People,
                restrictions: ["access"],
                badges: ["beta"],
                component: {
                    title: "Zero Trust - Access",
                    description: "Control who can access your dashboard.",
                    component: AccessComponent,
                },
            },
            {
                name: "Commands",
                id: "commands",
                icon: SlashLg,
                restrictions: ["dev"],
                badges: ["beta"],
                component: {
                    title: "Zero Trust - Commands",
                    description: "Zero Trust Commands.",
                },
            },
            {
                name: "Anti Nuke",
                id: "antinuke",
                icon: X,
                restrictions: ["dev"],
                badges: ["beta"],
                component: {
                    title: "Zero Trust - Anti Nuke",
                    description:
                        "Prevent attackers from using certain features.",
                    component: AntiNukeComponent,
                },
            },
            {
                name: "Authy",
                id: "auth",
                icon: CheckLg,
                restrictions: ["auth"],
                badges: ["beta"],
                component: {
                    title: "Zero Trust - Authy",
                    description:
                        "Restrict roles with permissions behind MFA and only allow temporary access.",
                    component: AuthComponent,
                },
            },
        ],
    },
    {
        name: "Professional",
        components: [
            {
                name: "Bot",
                id: "bot",
                icon: Robot,
                restrictions: [],
                badges: ["beta"],
                component: {
                    title: "Bot",
                    description: "Lock features of your server down.",
                },
            },
            {
                name: "Branding",
                id: "branding",
                icon: Award,
                restrictions: [
                    "branding_splash",
                    "branding_embed",
                    "branding_vanity",
                ],
                badges: ["beta"],
                component: {
                    title: "Branding",
                    description: "Control your brand.",
                    component: BrandingComponent,
                },
            },
            {
                name: "Plan",
                id: "plan",
                icon: CreditCard,
                restrictions: ["dev"],
                badges: ["beta"],
                component: {
                    title: "Plan",
                    description: "Control your plan.",
                    component: PlanComponent,
                },
            },
            {
                name: "Contact",
                id: "contact",
                icon: Envelope,
                restrictions: ["dev"],
                badges: ["beta"],
                component: {
                    title: "Contact",
                    description: "How to contact us.",
                    component: ContactComponent,
                },
            },
        ],
    },
    {
        name: "Dev tools",
        defaultHidden: true,
        components: [
            {
                name: "Developer panel",
                id: "dev",
                icon: ExclamationTriangle,
                restrictions: ["dev"],
                component: {
                    title: "Developer panel",
                    description:
                        "The developer panel. There are no secrets hidden here.",
                    component: DeveloperComponent,
                },
            },
        ],
    },
];

export default registry;
