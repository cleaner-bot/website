import { useRef, useState } from "react";

import { Section } from "@/components/dash/dash.jsx";
import {
    ToggleBlock,
    PlainBlock,
    BlockWithPanel,
} from "@/components/dash/block.jsx";
import {
    Upgrade,
    TextInput,
    MultilineTextInput,
} from "@/components/dash/ui.jsx";
import { ExternalLink } from "@/components/buttons.jsx";
import { doChange, uploadGuildAsset, putGuildVanity } from "@/lib/api.js";

export default function BrandingComponent({
    config,
    updateConfig,
    entitlements,
    updateEntitlements,
    route,
}) {
    const [state, setState] = useState(0);
    const fileInputRef = useRef();
    const [vanity, setVanity] = useState(entitlements.branding_vanity_url);
    const [vanityUpdating, setVanityUpdating] = useState(false);
    const [embedTitle, setEmbedTitle] = useState(config.branding_embed_title);
    const [embedDescription, setEmbedDescription] = useState(
        config.branding_embed_description
    );
    const [embedUpdating, setEmbedUpdating] = useState(false);
    return (
        <Section>
            <ToggleBlock
                name="Enable splash"
                description="Enable splash for webpages."
                field="branding_splash_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
                entitlement={entitlements.branding_splash}
                entitlements={entitlements}
            >
                {entitlements.plan >= entitlements.branding_splash && (
                    <>
                        <ExternalLink
                            href={`https://cdn.cleanerbot.xyz/splash/${route.guildId}`}
                            className="w-full sm:w-80"
                            style="--btn-3"
                        >
                            View current splash
                        </ExternalLink>
                        <button
                            className="w-full mt-2 --btn --btn-3 --btn-primary sm:w-80 lg:mx-0"
                            onClick={() => {
                                fileInputRef.current.click();
                            }}
                            disabled={state === 1}
                        >
                            {state === 0
                                ? "Upload new image"
                                : state === 1
                                ? "Uploading..."
                                : state === 2
                                ? "Uploaded!"
                                : "Error :("}
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
                                if (!file) return;

                                const formData = new FormData();
                                formData.append(file.name, file);

                                setState(1);
                                (async () => {
                                    const success = await doChange(
                                        uploadGuildAsset(
                                            "splash",
                                            route.guildId,
                                            formData
                                        )
                                    );
                                    setState(success ? 2 : 3);
                                    fileInputRef.current.value = "";
                                })();
                            }}
                        />
                    </>
                )}
            </ToggleBlock>
            <ToggleBlock
                name="Enable custom embed"
                description="Enable custom embed for challenges. (only applies to new embeds sent)"
                field="branding_embed_enabled"
                config={config}
                updateConfig={updateConfig}
                guildId={route.guildId}
                entitlement={entitlements.branding_splash}
                entitlements={entitlements}
            >
                {config.branding_embed_enabled && (
                    <>
                        <p className="mb-2">Embed title:</p>
                        <TextInput
                            value={embedTitle}
                            setValue={setEmbedTitle}
                            maxLength={200}
                            placeholder="Verification required"
                        />
                        <p className="mt-1 text-xs text-gray-300">
                            Limit is 200 characters. Cannot contain links and
                            markdown does not work.
                        </p>
                        <p className="mt-4 mb-2">Embed description:</p>
                        <MultilineTextInput
                            value={embedDescription}
                            setValue={setEmbedDescription}
                            maxLength={2048}
                            placeholder="Please verify that you are not a robot. Start by clicking on the button below."
                        />
                        <p className="text-xs text-gray-300">
                            Limit is 2048 characters. Cannot contain links.
                        </p>
                        <button
                            className="w-full mt-6 --btn --btn-3 --btn-primary sm:w-80 lg:mx-0"
                            disabled={
                                (embedTitle === config.branding_embed_title &&
                                    embedDescription ===
                                        config.branding_embed_description) ||
                                embedUpdating
                            }
                            onClick={async () => {
                                setEmbedUpdating(true);
                                const success = await doChange(
                                    patchConfig(route.guildId, {
                                        branding_embed_title: embedTitle,
                                        branding_embed_description:
                                            embedDescription,
                                    })
                                );
                                setEmbedUpdating(false);
                                if (!success) return;

                                updateConfig({
                                    branding_embed_title: embedTitle,
                                    branding_embed_description:
                                        embedDescription,
                                });
                            }}
                        >
                            Save
                        </button>
                    </>
                )}
            </ToggleBlock>
            {entitlements.plan >= entitlements.branding_vanity ? (
                <PlainBlock
                    name="Vanity"
                    description="Allows the use of a custom string in verification links instead of a guild id."
                >
                    <TextInput value={vanity} setValue={setVanity} />
                    <button
                        className="w-full mt-6 --btn --btn-3 --btn-primary sm:w-80 lg:mx-0"
                        disabled={
                            vanity === entitlements.branding_vanity_url ||
                            vanityUpdating
                        }
                        onClick={async () => {
                            setVanityUpdating(true);
                            const success = await doChange(
                                putGuildVanity(route.guildId, vanity)
                            );
                            setVanityUpdating(false);
                            if (!success) return;

                            updateEntitlements({
                                branding_vanity_url: vanity,
                            });
                        }}
                    >
                        Save
                    </button>
                </PlainBlock>
            ) : (
                <BlockWithPanel
                    name="Vanity"
                    description="Allows the use of a custom string in verification links instead of a guild id."
                    panel={
                        <Upgrade
                            plan={entitlements.branding_vanity}
                            guildId={route.guildId}
                        />
                    }
                />
            )}
        </Section>
    );
}
