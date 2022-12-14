import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import clsx from "clsx";

import { BlockWithPanel, PlainBlock } from "@/components/dash/block.jsx";
import { Description, Section } from "@/components/dash/dash.jsx";
import { MultilineTextInput, TextInput } from "@/components/dash/ui.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import {
    doChange,
    getGuildSyncLists,
    getGuildSyncList,
    patchGuildBanSyncList,
    patchConfig,
    getGuildBanListUsers,
    addGuildBanListUsers,
    deleteGuildBanListUsers,
    postGuildBanListImport,
} from "@/lib/api.js";

export default function BanSyncComponent({
    config,
    updateConfig,
    entitlements,
    route,
}) {
    const [ownBanList, setOwnBanList] = useState();
    const [performingOperation, setPerformingOperation] = useState(false);
    const [listId, setListId] = useState("");

    useEffect(() => {
        getGuildSyncLists(route.guildId)
            .then(setOwnBanList)
            .catch(setOwnBanList);
    }, []);

    return (
        <>
            <Description>
                Subscribe to ban lists and synchronize your bans with them. If
                someone on a ban list you are synchronizing with is banned, they
                get banned from your server as well.
            </Description>
            <Section>
                <BlockWithPanel
                    name="Subscribe to a ban list"
                    panel={
                        <>
                            <TextInput
                                value={listId}
                                setValue={setListId}
                                maxLength={22}
                                placeholder="Enter ID of the list"
                                disabled={
                                    config.bansync_subscribed.length >=
                                    entitlements.bansync_subscription_limit
                                }
                            />
                            <button
                                className="w-full --btn --btn-3 --btn-primary"
                                disabled={
                                    performingOperation ||
                                    config.bansync_subscribed.length >=
                                        entitlements.bansync_subscription_limit
                                }
                                onClick={() => {
                                    if (
                                        config.bansync_subscribed.includes(
                                            listId
                                        )
                                    )
                                        return toast.error(
                                            "Already subscribed to list!"
                                        );
                                    setPerformingOperation(true);
                                    doChange(
                                        getGuildSyncList(route.guildId, listId),
                                        {
                                            loading: "Performing pre-checks...",
                                            error: "Failed: ",
                                            success: null,
                                        }
                                    ).then((response) => {
                                        if (!response)
                                            return setPerformingOperation(
                                                false
                                            );
                                        if (response.status === 404) {
                                            setPerformingOperation(false);
                                            return toast.error(
                                                "List not found."
                                            );
                                        }
                                        doChange(
                                            patchConfig(route.guildId, {
                                                bansync_subscribed: [
                                                    ...config.bansync_subscribed,
                                                    listId,
                                                ],
                                            })
                                        ).then((r) => {
                                            setPerformingOperation(false);
                                            if (!r) return;
                                            setOwnBanList({
                                                data: [
                                                    ...ownBanList.data,
                                                    response.data,
                                                ],
                                            });
                                            updateConfig({
                                                bansync_subscribed: [
                                                    ...config.bansync_subscribed,
                                                    listId,
                                                ],
                                            });
                                        });
                                    });
                                }}
                            >
                                Subscribe
                            </button>
                        </>
                    }
                    description={
                        <>
                            <p>
                                If a person who joins is on any subscribed ban
                                list, they will be immediately banned from your
                                server too.
                            </p>
                            <p>
                                If a person gets banned after joining your
                                server, they will banned <i>at the latest</i>{" "}
                                when they send their next message. We do
                                periodic scans to clean up banned people as fast
                                as possible.
                            </p>
                        </>
                    }
                >
                    <p className="text-xs text-right text-gray-300">
                        {config.bansync_subscribed.length} /{" "}
                        {entitlements.bansync_subscription_limit} list
                        subscriptions
                    </p>
                </BlockWithPanel>

                {!ownBanList ? (
                    <p>Loading lists you can access…</p>
                ) : !ownBanList.data ? (
                    <ErrorHandler error={ownBanList} />
                ) : (
                    <div className="space-y-2">
                        {ownBanList.data.map((banList) => (
                            <PlainBlock>
                                <OwnBanList
                                    banList={banList}
                                    performingOperation={performingOperation}
                                    setPerformingOperation={
                                        setPerformingOperation
                                    }
                                    route={route}
                                    ownBanList={ownBanList}
                                    setOwnBanList={setOwnBanList}
                                    config={config}
                                    updateConfig={updateConfig}
                                />
                            </PlainBlock>
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}

function OwnBanList({
    banList,
    performingOperation,
    setPerformingOperation,
    route,
    ownBanList,
    setOwnBanList,
    config,
    updateConfig,
}) {
    const [tab, setTab] = useState(-1);
    const [users, setUser] = useState();
    const [userInput, setUserInput] = useState("");
    return (
        <>
            <p className="flex flex-wrap gap-2">
                {banList.name && `${banList.name} - `}
                <code className="px-1 bg-gray-600 rounded">
                    {banList.id}
                </code>{" "}
                <span className="px-2 rounded-full bg-indigo-550 upper">
                    {banList.manager ? "Manager" : "Subscriber"}
                </span>
                <button
                    className="ml-auto rounded-full --btn --btn-destructive"
                    title="Unsubscribe"
                    onClick={() => {
                        setPerformingOperation(true);
                        const newList = config.bansync_subscribed.filter(
                            (x) => x !== banList.id
                        );
                        doChange(
                            patchConfig(route.guildId, {
                                bansync_subscribed: newList,
                            })
                        ).then((response) => {
                            setPerformingOperation(false);
                            if (!response) return;
                            updateConfig({ bansync_subscribed: newList });
                            setOwnBanList({
                                data: ownBanList.data.filter(
                                    (bl) => bl.id !== banList.id
                                ),
                            });
                        });
                    }}
                >
                    <X className="w-6 h-6" />
                </button>
            </p>
            <p className="mt-2">
                {banList.deleted ? (
                    "This list has been deleted."
                ) : (
                    <>
                        This list contains{" "}
                        {banList.count === 1
                            ? "one user"
                            : `${banList.count} users`}
                        .
                    </>
                )}
            </p>
            {banList.manager && (
                <>
                    <p>
                        {banList.auto_sync
                            ? "List is synced and new bans will automatically be added to the list."
                            : "List is not synced and no bans are automatically added."}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        <button
                            className={clsx(
                                "--btn --btn-0 --btn-neutral",
                                tab === 0 && "ring ring-indigo-500"
                            )}
                            onClick={() => {
                                setTab(tab === 0 ? -1 : 0);
                                if (tab !== 0 && !users)
                                    getGuildBanListUsers(
                                        route.guildId,
                                        banList.id
                                    )
                                        .then(setUser)
                                        .catch(setUser);
                            }}
                        >
                            List users
                        </button>
                        <button
                            className={clsx(
                                "--btn --btn-0 --btn-neutral",
                                tab === 1 && "ring ring-indigo-500"
                            )}
                            onClick={() => {
                                setTab(tab === 1 ? -1 : 1);
                            }}
                        >
                            Add users
                        </button>
                        <button
                            className={clsx(
                                "--btn --btn-0 --btn-neutral",
                                tab === 2 && "ring ring-indigo-500"
                            )}
                            onClick={() => {
                                setTab(tab === 2 ? -1 : 2);
                            }}
                        >
                            Remove users
                        </button>
                        <div className="border border-gray-550" />
                        <button
                            className={clsx(
                                "--btn --btn-0 --btn-neutral",
                                tab === 3 && "ring ring-indigo-500"
                            )}
                            onClick={() => {
                                setTab(tab === 3 ? -1 : 3);
                            }}
                        >
                            Settings
                        </button>
                    </div>
                </>
            )}
            {tab === 0 && (
                <div className="mt-6">
                    {!users ? (
                        <p>Loading users...</p>
                    ) : users?.data ? (
                        <p className="w-full px-3 py-1 bg-gray-800 rounded-lg pb-7">
                            {users.data.length > 0
                                ? users.data.join(", ")
                                : "No users in this list currently."}
                        </p>
                    ) : (
                        <ErrorHandler error={users} />
                    )}
                </div>
            )}
            {(tab === 1 || tab === 2) && (
                <div className="mt-6">
                    <MultilineTextInput
                        placeholder={
                            tab === 1
                                ? "Put user ids to add to the ban list in here."
                                : "Put user ids to remove from the ban list in here."
                        }
                        value={userInput}
                        setValue={setUserInput}
                    />
                    <button
                        className="--btn --btn-primary --btn-0 w-60"
                        disabled={
                            userInput
                                .split(/[^\d]+/)
                                .filter((x) => /^\d{17,22}$/.test(x)).length ===
                            0
                        }
                        onClick={() => {
                            const ids = userInput
                                .split(/[^\d]+/)
                                .filter((x) => /^\d{17,22}$/.test(x));
                            setUserInput(ids.join(", "));
                            const fn =
                                tab === 1
                                    ? addGuildBanListUsers
                                    : deleteGuildBanListUsers;
                            setPerformingOperation(true);
                            doChange(fn(route.guildId, banList.id, ids)).then(
                                (response) => {
                                    setPerformingOperation(false);
                                    if (!response) return;
                                    if (response.data < ids.length)
                                        toast(
                                            `${
                                                ids.length - response.data
                                            } users were not ${
                                                tab === 1
                                                    ? "added to"
                                                    : "removed from"
                                            } the list.`
                                        );
                                    if (response.data > 0) {
                                        const newCount =
                                            tab === 1
                                                ? banList.count + response.data
                                                : banList.count - response.data;
                                        setOwnBanList({
                                            data: ownBanList.data.map((bl) =>
                                                bl.id === banList.id
                                                    ? { ...bl, count: newCount }
                                                    : bl
                                            ),
                                        });
                                        setUser(); // reset
                                    }
                                }
                            );
                        }}
                    >
                        {tab === 1 ? "Add to list" : "Remove from list"}
                    </button>
                </div>
            )}
            {tab === 3 && (
                <div className="flex gap-2 mt-6">
                    <button
                        className="--btn --btn-0 --btn-primary min-w-[8rem]"
                        disabled={performingOperation}
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(
                                postGuildBanListImport(
                                    route.guildId,
                                    banList.id
                                )
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (!response) return;
                                toast(`Imported ${response.data} bans.`);
                                const newCount = banList.count + response.data;
                                setOwnBanList({
                                    data: ownBanList.data.map((bl) =>
                                        bl.id === banList.id
                                            ? { ...bl, count: newCount }
                                            : bl
                                    ),
                                });
                                setUser(); // reset
                            });
                        }}
                    >
                        Import bans from server
                    </button>
                    <button
                        className="--btn --btn-0 --btn-primary min-w-[8rem]"
                        disabled={performingOperation}
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(
                                patchGuildBanSyncList(
                                    route.guildId,
                                    banList.id,
                                    {
                                        auto_sync: !banList.auto_sync,
                                    }
                                )
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (response)
                                    setOwnBanList({
                                        data: ownBanList.data.map((bl) =>
                                            bl.id !== banList.id
                                                ? bl
                                                : response.data
                                        ),
                                    });
                            });
                        }}
                    >
                        {banList.auto_sync ? "De-sync bans" : "Sync bans"}
                    </button>
                </div>
            )}
        </>
    );
}
