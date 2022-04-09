
import Link from "next/link";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Anti Spam | The Cleaner Dashboard"
            />
            <Page page="antispam" {...data}>
                <AntispamDashboard {...data} />
            </Page>
        </>
    )
}

const rules = [
    { name: "traffic.similar", description: "Most basic spam detection by comparing the similarity of messages." },
    { name: "traffic.token", description: "Detects repeating elements of messages. This antispam rule is harder to trigger but will catch more sophisticated spam." },
    { name: "traffic.exact", description: "Detects identical messages sent in multiple channels. Intended as last resort against phishing." },
    { name: "traffic.sticker", description: "Detects sticker spam." },
    { name: "traffic.attachment", description: "Detects attachment spam. For performance reasons this only checks filesize." },
]


function AntispamDashboard({ config, setConfig, guildId }) {
    return (
        <>
            <Header name="Anti Spam">
                <p>Spam mitigation solutions.</p>
                <p>
                    If you have spam channels, make sure to add them as exception channels in the <Link href={`/dash/${guildId}/slowmode`}>
                        <a className="hover:underline">Slowmode</a>
                    </Link> settings.
                </p>
            </Header>
            <Section>
                {rules.map(traffic => <ToggleBlock
                    {...traffic}
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field={`antispam_${traffic.name.substring(8)}`}
                    key={traffic.name}
                />)}
            </Section>
        </>
    )
}
