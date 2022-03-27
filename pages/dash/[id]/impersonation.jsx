
import { useState } from "react";
import { useRouter } from "next/router";

import { DataWrapper } from "@/components/dash/data.jsx";
import MetaTags from "@/components/metatags.jsx";
import { JustBlock, BlockRightSide, Toggle, OptionalUpgrade, TextInput } from "@/components/dash/ui.jsx";
import { doChange, patchConfig } from "@/lib/api";

export default function DashboardWrapper() {
    const router = useRouter();
    return (
        <>
            <MetaTags
                title="Impersonation | The Cleaner Dashboard"
            />
            <DataWrapper guildId={router.isReady && router.query.id} Inner={ImpersonationDashboard} current="impersonation" />
        </>
    )
}

const defaultAdvancedWords = ["mod", "bot", "help"];
const defaultAdvancedSubwords = ["admin", "alert", "announcement", "binance", "captcha", "clonex", "coinbase", "collab", "customer", "desk", "giveaway", "guide", "helper", "metamask", "moderator", "mint", "news", "notification", "presale", "raffle", "release", "service", "ticket", "verification", "verify"];


function containsAll(array1, array2) {
    for(const item of array2) {
        if(array1.indexOf(item) === -1) return false;
    }
    return true;
}


function ImpersonationDashboard({ data }) {
    return (
        <>
            <h1 className="text-2xl">
                Impersonation
            </h1>
            <p className="mt-2 text-gray-300">
                Impersonation prevention settings.
            </p>
            <p className="text-gray-300">
                All names are normalized before checking. This includes font/unicode normalization.
            </p>
            <div className="my-12 space-y-12">
                <BlockRightSide
                    rightSide={<>
                        <Toggle data={data} field="impersonation_discord" />
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Discord impersonation
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Automatically kicks people trying to impersonate Discord staff.
                    </p>
                    <p className="text-gray-300">
                        This is a managed blocklist (automatically updated). Contains words like `discord`, `hypesquad`, `moderator` etc.
                    </p>
                    <p className="text-gray-300">
                        This will only act on a 100% match.
                    </p>
                </BlockRightSide>
                <BlockRightSide
                    rightSide={<>
                        <OptionalUpgrade data={data} required={data.entitlements.impersonation_advanced}>
                            <Toggle data={data} field="impersonation_advanced_enabled" />
                        </OptionalUpgrade>
                    </>}
                >
                    <h2 className="text-2xl font-medium">
                        Advanced impersonation settings
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Fine tune your own blacklist to prevent bot attacks.
                    </p>
                    <p className="text-gray-300">
                        You can add, your own server name, parts of it or anything that is related to your project and could be exploited to gain trust, to the blacklist.
                    </p>
                </BlockRightSide>
                {data.config.impersonation_advanced_enabled && <>
                    <Blacklist
                        data={data}
                        name="Blacklist: Partial words"
                        description={<>
                            <p className="mt-2 text-gray-300">
                                Partial words matches partial words (aka substrings).
                            </p>
                            <p className="text-gray-300">
                                Example: `mod` blocks `moderator`, `moderation`, `automod`.
                            </p>
                        </>}
                        field="impersonation_advanced_subwords"
                        defaultBlacklist={defaultAdvancedSubwords}
                    />
                    <Blacklist
                        data={data}
                        name="Blacklist: Full words"
                        description={<>
                            <p className="mt-2 text-gray-300">
                                Fill words matches full words.
                            </p>
                            <p className="text-gray-300">
                                Example: `mod` blocks `mod`, but not `moderator`.
                            </p>
                        </>}
                        field="impersonation_advanced_words"
                        defaultBlacklist={defaultAdvancedWords}
                    />
                </>}
            </div>
        </>
    )
}

function Blacklist({ data, name, description, field, defaultBlacklist }) {
    const [blacklist, setBlacklist] = useState(data.config[field]);
    const [hasChanged, setChanged] = useState(false);
    const [value, setValue] = useState("");

    return (
        <JustBlock>
            <h2 className="text-2xl font-medium">
                {name}
            </h2>
            {description}

            <div className="flex flex-wrap gap-2 my-8">
                Blacklist:
                {blacklist.length === 0 ? <span>
                    Nothing blacklisted currently.
                </span> : blacklist.map(x => <span key={x} className="inline-flex items-center justify-center pl-3 pr-1 rounded-full bg-coolGray-800">
                    {x}
                    <button 
                        className="w-4 h-4 ml-2 text-gray-400"
                        onClick={() => {
                            const blacklistCopy = [...blacklist];
                            const index = blacklistCopy.indexOf(x);
                            if(index >= 0)
                                blacklistCopy.splice(index, 1);
                            setBlacklist(blacklistCopy);
                            setChanged(true);
                        }}>
                        <svg className="w-2 h-2 stroke-current" fill="none" viewBox="0 0 8 8">
                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                    </button>
                </span>)}
            </div>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault();
                    const blacklistCopy = [...blacklist];
                    if(blacklistCopy.indexOf(value) === -1) {
                        blacklistCopy.push(value);
                        setValue("");
                    }
                    setBlacklist(blacklistCopy);
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
                        const success = await doChange(patchConfig(data.guild.id, {[field]: blacklist}));
                        if(!success) return setChanged(true);
                        data.config[field] = blacklist;
                    }}
                >
                    Save
                </button>
                <button
                    className="--btn --btn-3 --btn-primary"
                    disabled={containsAll(blacklist, defaultBlacklist)}
                    onClick={() => {
                        const blacklistCopy = [...blacklist];
                        for(const word of defaultBlacklist) {
                            if(blacklistCopy.indexOf(word) === -1)
                                blacklistCopy.push(word);
                        }
                        setBlacklist(blacklistCopy);
                        setChanged(true);
                    }}
                >
                    Add default blacklist
                </button>
            </div>
        </JustBlock>
    )
}
