
import { useRef, useState } from "react";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock, PlainBlock, BlockWithPanel } from "@/components/dash/block.jsx";
import { Upgrade, TextInput } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";
import { ExternalLink } from "@/components/buttons.jsx";
import { doChange, uploadGuildAsset } from "@/lib/api.js";

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


function BrandingDashboard({ config, setConfig, entitlements, setEntitlements, guildId }) {
    const [state, setState] = useState(0);
    const fileInputRef = useRef();
    const [vanity, setVanity] = useState(entitlements.branding_vanity_url);
    const [vanityDisabled, setVanityDisabled] = useState(false);
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
                        <ExternalLink href={`https://cdn.cleanerbot.xyz/splash/${guildId}`} className="w-full sm:w-80" style="--btn-3">
                            View current splash
                        </ExternalLink>
                        <button
                            className="w-full mt-6 --btn --btn-3 --btn-primary sm:w-80"
                            onClick={() => {
                                fileInputRef.current.click();
                            }}
                            disabled={state === 1}
                        >
                            {state === 0 ? "Upload new image" : state === 1 ? "Uploading..." : state === 2 ? "Uploaded!" : "Error :("}
                        </button>
                        <p className="mt-6 text-sm text-gray-300">
                            Max allowed filesize is 25mb.
                        </p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onInput={() => {
                                const file = fileInputRef.current.files[0];
                                if(!file) return;

                                const formData = new FormData();
                                formData.append(file.name, file);

                                setState(1);
                                (async () => {
                                    const success = await doChange(uploadGuildAsset("splash", guildId, formData));
                                    setState(success ? 2 : 3);
                                    fileInputRef.current.value = "";
                                })();
                            }}
                        />
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
                {entitlements.plan >= entitlements.branding_vanity ? (
                    <PlainBlock
                        name="Vanity"
                        description="Allows the use of a custom string in verification links instead of a guild id."
                    >
                        <TextInput value={vanity} setValue={setVanity} />
                        <button
                            className="w-full mt-6 --btn --btn-3 --btn-primary sm:w-80"
                            disabled={vanity === entitlements.branding_vanity_url || vanityDisabled}
                            onClick={async () => {
                                setVanityDisabled(true);
                                const success = await doChange(putGuildVanity(guildId, vanity));
                                setVanityDisabled(false);
                                if(!success) return;

                                setEntitlements({
                                    ...entitlements,
                                    branding_vanity_url: vanity
                                });
                            }}
                        >

                        </button>
                    </PlainBlock>
                ) : (
                    <BlockWithPanel
                        name="Vanity"
                        description="Allows the use of a custom string in verification links instead of a guild id."
                        panel={(
                            <Upgrade plan={entitlements.branding_vanity} guildId={guildId} />
                        )}
                    />
                )}
            </Section>
        </>
    )
}

