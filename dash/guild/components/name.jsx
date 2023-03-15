import { useState } from "react";

import { Description, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import { MultiSelect, TextInput, Attention } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api.js";

const defaultAdvancedWords = [
    "mod",
    "bot",
    "help",
    "*admin*",
    "*alert*",
    "*announcement*",
    "*binance*",
    "*captcha*",
    "*clonex*",
    "*coinbase*",
    "*collab*",
    "*customer*",
    "*desk*",
    "*giveaway*",
    "*guide*",
    "*helper*",
    "*metamask*",
    "*moderator*",
    "*mint*",
    "*news*",
    "*notification*",
    "*presale*",
    "*raffle*",
    "*release*",
    "*service*",
    "*ticket*",
    "*verification*",
    "*verify*",
];

function containsAll(array1, array2) {
    for (const item of array2) {
        if (array1.indexOf(item) === -1) return false;
    }
    return true;
}

export default function NameCheckerComponent({
    config,
    updateConfig,
    entitlements,
    guild,
    route,
}) {
    return (
        <>
            <Description>
                All names are normalized before checking. This includes
                font/unicode normalization.
            </Description>

            <Section>
                <ToggleBlock
                    name="Automatic dehoisting"
                    description="Automatically dehoists members that put special characters in front of their name to appear higher in the memberlist."
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                    field="name_dehoisting_enabled"
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
                    field="name_discord_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                >
                    {guild.myself &&
                        !(
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
                    name="Advanced name blacklisting"
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
                    field="name_advanced_enabled"
                    config={config}
                    updateConfig={updateConfig}
                    guildId={route.guildId}
                    entitlement={entitlements.name_advanced}
                    entitlements={entitlements}
                >
                    {guild.myself &&
                        !(
                            guild.myself.permissions.ADMINISTRATOR ||
                            guild.myself.permissions.KICK_MEMBERS
                        ) && (
                            <Attention>
                                Missing permission to kick members! This feature
                                will not work without it.
                            </Attention>
                        )}
                </ToggleBlock>
                {config.name_advanced_enabled && (
                    <>
                        <Blacklist
                            name="Blacklisted Words"
                            description="You can use *-Wildcards at the start and beginning for partial matches."
                            field="name_advanced_words"
                            config={config}
                            updateConfig={updateConfig}
                            guildId={route.guildId}
                        />
                    </>
                )}
                <PlainBlock
                    name="Whitelisted roles"
                    description={
                        <>
                            <p>
                                Moderators and people with one of the following 
                                roles are whitelisted and will not be checked
                                by Name Checker.
                            </p>
                        </>
                    }
                >
                    <MultiSelect
                        name="Roles:"
                        none="No roles."
                        singular="Role"
                        field="name_roles"
                        placeholder={
                            guild.roles
                                ? "Select a role to whitelist."
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
        </>
    );
}

function Blacklist({
    config,
    updateConfig,
    guildId,
    name,
    description,
    field,
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
                                    updateConfig({
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
                    updateConfig({ [field]: blacklistCopy });
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
                    disabled={containsAll(config[field], defaultAdvancedWords)}
                    onClick={() => {
                        const blacklistCopy = [...config[field]];
                        for (const word of defaultAdvancedWords) {
                            if (blacklistCopy.indexOf(word) === -1)
                                blacklistCopy.push(word);
                        }
                        updateConfig({ [field]: blacklistCopy });
                        setChanged(true);
                    }}
                >
                    Add default blacklist
                </button>
            </div>
        </PlainBlock>
    );
}
