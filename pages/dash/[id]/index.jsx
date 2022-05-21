import { InternalLink } from "@/components/buttons.jsx";
import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { MultiSelect, Attention } from "@/components/dash/ui.jsx";
import Skeleton from "@/components/skeleton.jsx";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="The Cleaner Dashboard" />
            <Page page="" {...data}>
                <Dashboard {...data} />
            </Page>
        </>
    );
}

function Dashboard({ config, setConfig, guild, guildId }) {
    return (
        <>
            <Header name="General" />
            <Section>
                {(!config.logging_enabled ||
                    config.logging_channel === "0" ||
                    (guild.channels &&
                        !guild.channels.find(
                            (x) => x.id === config.logging_channel
                        ))) && (
                    <Attention>
                        {!config.logging_enabled
                            ? "You do not have logging enabled!"
                            : "You do not have a logging channel selected!"}
                        <InternalLink
                            href={`/dash/${guildId}/logging`}
                            className="mt-4 lg:w-96"
                        >
                            Go to Logging
                        </InternalLink>
                    </Attention>
                )}
                {config.challenge_interactive_enabled &&
                    config.challenge_interactive_role === "0" && (
                        <Attention>
                            You do not have a role for interactive challenges
                            selected.
                            <InternalLink
                                href={`/dash/${guildId}/challenge`}
                                className="mt-4 lg:w-96"
                            >
                                Go to Challenge
                            </InternalLink>
                        </Attention>
                    )}

                <PlainBlock
                    name="Moderator roles"
                    description={
                        <>
                            <p>
                                Moderators will be not affected by the security
                                solutions. (firewall, antispam, challenges, ...)
                            </p>
                            <p>
                                Members with <b>administrator</b> or{" "}
                                <b>manage server</b> permission, the{" "}
                                <b>server owner</b>, and <b>bots</b> will always
                                be ignored.
                            </p>
                        </>
                    }
                >
                    <MultiSelect
                        name="Roles:"
                        none="No roles."
                        singular="Role"
                        field="general_modroles"
                        placeholder={
                            guild.roles
                                ? "Select a role to add as moderator."
                                : "Role list is unavailable. Refresh the page or contact support."
                        }
                        selection={
                            guild.roles
                                ? guild.roles.filter((x) => !x.is_managed)
                                : []
                        }
                        guildId={guildId}
                        config={config}
                        setConfig={setConfig}
                    />
                </PlainBlock>
                <ToggleBlock
                    name="Automatic dehoisting"
                    description="Automatically dehoists members that put special characters in front of their name to appear higher in the memberlist."
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    field="general_dehoisting_enabled"
                >
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.MANAGE_NICKNAMES
                        ) && (
                            <Attention>
                                Missing permission to manage nicknames! This
                                feature will not work without it.
                            </Attention>
                        )}
                </ToggleBlock>
            </Section>
        </>
    );
}
