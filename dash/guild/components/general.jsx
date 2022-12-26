import { Section } from "@/components/dash/dash.jsx";
import { PlainBlock } from "@/components/dash/block.jsx";
import { MultiSelect, Attention } from "@/components/dash/ui.jsx";

export default function GeneralComponent({
    config,
    updateConfig,
    guild,
    route,
    updateRoute,
}) {
    return (
        <Section>
            {(!config.logging_enabled ||
                config.logging_channel === "0" ||
                (guild.channels &&
                    !guild.channels.find(
                        (x) => x.id === config.logging_channel
                    ))) && (
                <Attention>
                    <button
                        onClick={() => {
                            updateRoute({ component: "logging" });
                        }}
                        className="font-bold hover:underline"
                    >
                        {!config.logging_enabled
                            ? "You do not have logging enabled!"
                            : "You do not have a logging channel selected!"}
                    </button>
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
                            <b>server owner</b>, and <b>bots</b> will always be
                            ignored.
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
                    guildId={route.guildId}
                    config={config}
                    updateConfig={updateConfig}
                />
            </PlainBlock>
        </Section>
    );
}
