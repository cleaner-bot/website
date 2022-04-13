
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";
import { ExternalLink } from "@/components/buttons.jsx";
import { useRef } from "react";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Branding | The Cleaner Dashboard"
            />
            <Page page="branding" {...data}>
                <BrandingDashboard {...data} />
            </Page>
        </>
    )
}


function BrandingDashboard({ config, setConfig, entitlements, guildId }) {
    const fileInputRef = useRef();
    return (
        <>
            <Header name="Branding">
                Control your brand.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable splash"
                    description="Enable splash for webpages."
                    field="branding_splash_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.branding_splash}
                    entitlements={entitlements}
                >
                    {entitlements.plan >= entitlements.branding_splash && <>
                        <ExternalLink href={`https://cleaner-cdn.leodev.xyz/splash/${guildId}`}>
                            View current splash
                        </ExternalLink>
                        <button
                            className="--btn --btn-3 --btn-primary"
                            onClick={() => {
                                fileInputRef.current.trigger("click");
                            }}
                        >
                            Upload new image
                        </button>
                        <input type="file" ref={fileInputRef} />
                    </>}
                </ToggleBlock>
                <ToggleBlock
                    name="Enable embed"
                    description="Enable custom embed for challenges."
                    field="branding_embed_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.branding_splash}
                    entitlements={entitlements}
                />
            </Section>
        </>
    )
}

