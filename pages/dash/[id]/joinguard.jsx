import Link from "next/link";

import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { ToggleBlock } from "@/components/dash/block.jsx";
import { Attention } from "@/components/dash/ui.jsx";
import MetaTags from "@/components/metatags.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Join Guard | The Cleaner Dashboard" />
            <Page page="joinguard" {...data}>
                <JoinguardDashboard {...data} />
            </Page>
        </>
    );
}

function JoinguardDashboard({
    config,
    setConfig,
    entitlements,
    guild,
    guildId,
}) {
    return (
        <>
            <Header name="Join Guard">
                <p>
                    Protect joins to your server and prevent bots from even entering
                    it.
                </p>
                <p>
                    Read the{" "}
                    <Link href="/docs/joinguard">
                        <a className="font-bold text-gray-300 hover:underline">
                            documentation
                        </a>
                    </Link>{" "}
                    for more information and a setup guide.
                </p>
            </Header>

            <Section>
                <ToggleBlock
                    name="Enable Join Guard"
                    description="Enable Join Guard. Make sure members can't create invites and all existing invites are deleted."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="joinguard_enabled"
                    entitlement={entitlements.joinguard}
                    entitlements={entitlements}
                >
                    <p>
                        Your url is:{" "}
                        <span className="font-bold text-gray-300 break-all">
                            https://join.cleanerbot.xyz/
                            {entitlements.plan >=
                                entitlements.branding_vanity &&
                            entitlements.branding_vanity_url !== ""
                                ? entitlements.branding_vanity_url
                                : guildId}
                        </span>
                    </p>
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.CREATE_INSTANT_INVITE
                        ) && (
                            <Attention>
                                Missing permission to invite members! This
                                feature will not work without it. Make sure I
                                have the `Create Instant Invite` permission!
                            </Attention>
                        )}
                </ToggleBlock>
                {config.joinguard_enabled && (
                    <>
                        <ToggleBlock
                            name="Force CAPTCHA"
                            description="Forces everyone to complete a CAPTCHA."
                            config={config}
                            setConfig={setConfig}
                            guildId={guildId}
                            field="joinguard_captcha"
                        />
                    </>
                )}
            </Section>
        </>
    );
}
