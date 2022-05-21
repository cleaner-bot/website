import { useState } from "react";

import MetaTags from "@/components/metatags.jsx";
import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { TextInput, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags title="Impersonation | The Cleaner Dashboard" />
            <Page page="impersonation" {...data}>
                <ImpersonationDashboard {...data} />
            </Page>
        </>
    );
}

const defaultAdvancedWords = ["mod", "bot", "help"];
const defaultAdvancedSubwords = [
    "admin",
    "alert",
    "announcement",
    "binance",
    "captcha",
    "clonex",
    "coinbase",
    "collab",
    "customer",
    "desk",
    "giveaway",
    "guide",
    "helper",
    "metamask",
    "moderator",
    "mint",
    "news",
    "notification",
    "presale",
    "raffle",
    "release",
    "service",
    "ticket",
    "verification",
    "verify",
];

function containsAll(array1, array2) {
    for (const item of array2) {
        if (array1.indexOf(item) === -1) return false;
    }
    return true;
}

function ImpersonationDashboard({
    config,
    setConfig,
    entitlements,
    guild,
    guildId,
}) {
    return (
        <>
            <Header name="Impersonation">
                <p>Impersonation prevention settings.</p>
                <p>
                    All names are normalized before checking. This includes
                    font/unicode normalization.
                </p>
            </Header>

            <Section>
                <ToggleBlock
                    name="Discord impersonation"
                    description={
                        <>
                            <p>
                                Automatically kicks people trying to impersonate
                                Discord staff.
                            </p>
                            <p>
                                This is a managed blocklist (automatically
                                updated). Contains words like `discord`,
                                `hypesquad`, `moderator` etc.
                            </p>
                            <p>This will only act on a 100% match.</p>
                        </>
                    }
                    field="impersonation_discord_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                >
                    {!(
                        guild.myself.permissions.ADMINISTRATOR ||
                        guild.myself.permissions.KICK_MEMBERS
                    ) && (
                        <Attention>
                            Missing permission to kick members! This feature
                            will not work without it.
                        </Attention>
                    )}
                </ToggleBlock>
                <ToggleBlock
                    name="Advanced impersonation settings"
                    description={
                        <>
                            <p>
                                Fine tune your own blacklist to prevent bot
                                attacks.
                            </p>
                            <p>
                                You can add, your own server name, parts of it
                                or anything that is related to your project and
                                could be exploited to gain trust, to the
                                blacklist.
                            </p>
                        </>
                    }
                    field="impersonation_advanced_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.impersonation_advanced}
                    entitlements={entitlements}
                >
                    {!(
                        guild.myself.permissions.ADMINISTRATOR ||
                        guild.myself.permissions.KICK_MEMBERS
                    ) && (
                        <Attention>
                            Missing permission to kick members! This feature
                            will not work without it.
                        </Attention>
                    )}
                </ToggleBlock>
                {config.impersonation_advanced_enabled && (
                    <>
                        <Blacklist
                            name="Blacklist: Partial words"
                            description={
                                <>
                                    <p>
                                        Partial words matches partial words (aka
                                        substrings).
                                    </p>
                                    <p>
                                        Example: `mod` blocks `moderator`,
                                        `moderation`, `automod`.
                                    </p>
                                </>
                            }
                            field="impersonation_advanced_subwords"
                            defaultBlacklist={defaultAdvancedSubwords}
                            config={config}
                            setConfig={setConfig}
                            guildId={guildId}
                        />
                        <Blacklist
                            name="Blacklist: Full words"
                            description={
                                <>
                                    <p>Fill words matches full words.</p>
                                    <p>
                                        Example: `mod` blocks `mod`, but not
                                        `moderator`.
                                    </p>
                                </>
                            }
                            field="impersonation_advanced_words"
                            defaultBlacklist={defaultAdvancedWords}
                            config={config}
                            setConfig={setConfig}
                            guildId={guildId}
                        />
                    </>
                )}
            </Section>
        </>
    );
}

function Blacklist({
    config,
    setConfig,
    guildId,
    name,
    description,
    field,
    defaultBlacklist,
}) {
    const [hasChanged, setChanged] = useState(false);
    const [value, setValue] = useState("");

    return (
        <PlainBlock name={name} description={description}>
            <div className="flex flex-wrap gap-2 my-8">
                Blacklist:
                {config[field].length === 0 ? (
                    <span>Nothing blacklisted currently.</span>
                ) : (
                    config[field].map((x) => (
                        <span
                            key={x}
                            className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800"
                        >
                            {x}
                            <button
                                className="w-4 h-4 ml-2 text-gray-400"
                                onClick={() => {
                                    const blacklistCopy = [...config[field]];
                                    const index = blacklistCopy.indexOf(x);
                                    if (index >= 0)
                                        blacklistCopy.splice(index, 1);
                                    setConfig({
                                        ...config,
                                        [field]: blacklistCopy,
                                    });
                                    setChanged(true);
                                }}
                            >
                                <svg
                                    className="w-2 h-2 stroke-current"
                                    fill="none"
                                    viewBox="0 0 8 8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                        d="M1 1l6 6m0-6L1 7"
                                    />
                                </svg>
                            </button>
                        </span>
                    ))
                )}
            </div>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    const blacklistCopy = [...config[field]];
                    if (blacklistCopy.indexOf(value) === -1) {
                        blacklistCopy.push(value);
                        setValue("");
                    }
                    setConfig({ ...config, [field]: blacklistCopy });
                    setChanged(true);
                }}
            >
                <TextInput
                    placeholder="Type to add to the blacklist."
                    value={value}
                    setValue={setValue}
                />
            </form>
            <div className="flex gap-4 mt-6">
                <button
                    className="--btn --btn-3 --btn-primary"
                    disabled={!hasChanged}
                    onClick={async () => {
                        setChanged(false);
                        const success = await doChange(
                            patchConfig(guildId, { [field]: config[field] })
                        );
                        if (!success) return setChanged(true);
                    }}
                >
                    Save
                </button>
                <button
                    className="--btn --btn-3 --btn-primary"
                    disabled={containsAll(config[field], defaultBlacklist)}
                    onClick={() => {
                        const blacklistCopy = [...config[field]];
                        for (const word of defaultBlacklist) {
                            if (blacklistCopy.indexOf(word) === -1)
                                blacklistCopy.push(word);
                        }
                        setConfig({ ...config, [field]: blacklistCopy });
                        setChanged(true);
                    }}
                >
                    Add default blacklist
                </button>
            </div>
        </PlainBlock>
    );
}
