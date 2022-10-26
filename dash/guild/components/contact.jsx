import Link from "next/link";

import { Section } from "@/components/dash/dash.jsx";
import { BlockWithPanel } from "@/components/dash/block.jsx";
import { Unlocked, OptionalUpgrade } from "@/components/dash/ui.jsx";

export default function ContactComponent({ user, entitlements, route }) {
    return (
        <>
            <Section>
                <BlockWithPanel
                    name="Community Support"
                    description="Join the official Discord and receive help by the community. (staff may also respond, but no guarantees)"
                    panel={
                        <Link href="/discord">
                            <a className="--btn --btn-3 --btn-primary">
                                Join Discord
                            </a>
                        </Link>
                    }
                />
                {user.is_dev && (
                    <>
                        <BlockWithPanel
                            name="Standard Support"
                            description="Join the official Discord and receive help by the staff team. Check the #unlock channel for more information."
                            panel={
                                <OptionalUpgrade
                                    entitlements={entitlements}
                                    guildId={route.guildId}
                                    required={entitlements.contact_standard}
                                >
                                    <Link href="/discord">
                                        <a className="--btn --btn-3 --btn-primary">
                                            Join Discord
                                        </a>
                                    </Link>
                                </OptionalUpgrade>
                            }
                        />
                        <BlockWithPanel
                            name="E-Mail Support"
                            description="Contact the staff team directly via E-Mail."
                            panel={
                                <OptionalUpgrade
                                    entitlements={entitlements}
                                    guildId={route.guildId}
                                    required={entitlements.contact_email}
                                >
                                    <Unlocked />
                                </OptionalUpgrade>
                            }
                        >
                            {entitlements.plan >=
                                entitlements.contact_email && (
                                <>
                                    <span className="mt-6 text-gray-300">
                                        Your contact email:{" "}
                                    </span>
                                    <span className="break-all hover:underline">
                                        {entitlements.partnered
                                            ? "partners"
                                            : "support"}
                                        @cleanerbot.xyz
                                    </span>
                                </>
                            )}
                        </BlockWithPanel>
                    </>
                )}
            </Section>
        </>
    );
}
