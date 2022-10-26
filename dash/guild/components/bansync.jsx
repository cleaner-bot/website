import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { BlockWithPanel, PlainBlock } from "@/components/dash/block.jsx";
import { Description, Section } from "@/components/dash/dash.jsx";
import {
    Button,
    HorizontalRule,
    MultilineTextInput,
    TextInput,
} from "@/components/dash/ui.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import {
    getOwnBanSyncLists,
    doChange,
    postBanSyncList,
    deleteBanSyncList,
    patchBanSyncList,
    getBanLists,
    patchConfig,
    getBanListUsers,
    addBanListUsers,
    deleteBanListUsers,
    putBanListManagers,
    postBanListImport,
} from "@/lib/api.js";
import clsx from "clsx";

export default function BanSyncComponent({
    config,
    updateConfig,
    entitlements,
    route,
}) {
    const [ownBanList, setOwnBanList] = useState();
    const [resolvedBanListError, setResolvedBanListError] = useState();
    const [resolvedBanLists, setResolvedBanLists] = useState({});
    const [performingOperation, setPerformingOperation] = useState(false);
    const [listId, setListId] = useState("");

    useEffect(() => {
        getOwnBanSyncLists(route.guildId)
            .then(setOwnBanList)
            .catch(setOwnBanList);
        if (config.bansync_subscribed.length > 0)
            getBanLists(config.bansync_subscribed)
                .then((response) => setResolvedBanLists(response.data))
                .catch(setResolvedBanListError);
    }, []);

    return (
        <>
            <Description>
                Subscribe to ban lists and synchronize your bans with them. If
                someone on a ban list you are synchronizing with is banned, they
                get banned from your server as well.
            </Description>
            <Section>
                <HorizontalRule label="YOUR LISTS" />
                <BlockWithPanel
                    name="Create a ban list"
                    description="Creates a ban list for others to subscribe to."
                    panel={
                        <Button
                            text="Create ban list"
                            disabled={
                                performingOperation ||
                                !ownBanList?.data ||
                                ownBanList.data.length >=
                                    entitlements.bansync_own_limit
                            }
                            onClick={() => {
                                setPerformingOperation(true);
                                doChange(postBanSyncList(route.guildId), {
                                    loading: "Creating...",
                                    error: "Failed to create: ",
                                    success: "Created!",
                                }).then((response) => {
                                    setPerformingOperation(false);
                                    if (response)
                                        setOwnBanList({
                                            data: [
                                                ...(ownBanList.data || []),
                                                response.data,
                                            ],
                                        });
                                });
                            }}
                        />
                    }
                >
                    <p className="text-xs text-right text-gray-300">
                        {ownBanList?.data ? ownBanList.data.length : "?"} /{" "}
                        {entitlements.bansync_own_limit} lists created
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
                                />
                            </PlainBlock>
                        ))}
                    </div>
                )}
                <HorizontalRule label="SUBSCRIBED LISTS" />

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
                                    doChange(getBanLists([listId]), {
                                        loading: "Performing pre-checks...",
                                        error: "Failed: ",
                                        success: null,
                                    }).then((response) => {
                                        if (!response)
                                            return setPerformingOperation(
                                                false
                                            );
                                        if (response.data[listId] === false) {
                                            setPerformingOperation(false);
                                            return toast.error(
                                                "List not found."
                                            );
                                        }
                                        setResolvedBanLists({
                                            ...resolvedBanLists,
                                            ...response.data,
                                        });
                                        doChange(
                                            patchConfig(route.guildId, {
                                                bansync_subscribed: [
                                                    ...config.bansync_subscribed,
                                                    listId,
                                                ],
                                            })
                                        ).then((response) => {
                                            setPerformingOperation(false);
                                            if (response)
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

                <div className="space-y-2">
                    {config.bansync_subscribed.map((listId, index) => (
                        <BlockWithPanel
                            small={true}
                            panel={
                                <Button
                                    disabled={performingOperation}
                                    color="--btn-destructive"
                                    onClick={() => {
                                        setPerformingOperation(true);
                                        const newLists =
                                            config.bansync_subscribed.filter(
                                                (x) => x !== listId
                                            );
                                        doChange(
                                            patchConfig(route.guildId, {
                                                bansync_subscribed: newLists,
                                            }),
                                            {
                                                loading: "Unsubscribing...",
                                                error: "Failed to unsubscribe: ",
                                                success: "Unsubscribed!",
                                            }
                                        ).then((response) => {
                                            setPerformingOperation(false);
                                            if (response)
                                                updateConfig({
                                                    bansync_subscribed:
                                                        newLists,
                                                });
                                        });
                                    }}
                                    text="Unsubscribe from list"
                                />
                            }
                        >
                            <p>
                                {resolvedBanLists[listId] &&
                                    resolvedBanLists[listId].name + " - "}
                                <code className="px-1 bg-gray-600 rounded">
                                    {listId}
                                </code>
                            </p>
                            {resolvedBanLists[listId] === false ? (
                                <p className="mt-2 text-red-400">
                                    This list no longer exists.
                                </p>
                            ) : resolvedBanLists[listId] === undefined ? (
                                <p className="mt-2">
                                    Loading list information...
                                </p>
                            ) : (
                                <p className="mt-2">
                                    This list contains{" "}
                                    {resolvedBanLists[listId].count === 1
                                        ? "one user"
                                        : `${resolvedBanLists[listId].count} users`}
                                    .
                                </p>
                            )}
                            {index >=
                                entitlements.bansync_subscription_limit && (
                                <p className="text-red-400">
                                    You are only allowed to have{" "}
                                    {entitlements.bansync_subscription_limit}{" "}
                                    subscriptions, more will be ignored.
                                </p>
                            )}
                        </BlockWithPanel>
                    ))}
                </div>
                {resolvedBanListError && (
                    <ErrorHandler error={resolvedBanListError} />
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
}) {
    const [tab, setTab] = useState(-1);
    const [users, setUser] = useState();
    const [userInput, setUserInput] = useState("");
    const [nameInput, setNameInput] = useState(banList.name);
    const [guildInput, setGuildInput] = useState(
        banList.managers ? banList.managers.join(", ") : ""
    );
    return (
        <>
            <p>
                {banList.name} -{" "}
                <code className="px-1 bg-gray-600 rounded">{banList.id}</code>{" "}
                <span className="px-2 rounded-full bg-indigo-550 upper">
                    {route.guildId === banList.owner ? "Owner" : "Manager"}
                </span>
            </p>
            <p className="mt-2">
                This list contains{" "}
                {banList.count === 1 ? "one user" : `${banList.count} users`}.
            </p>
            <p>
                {banList.auto_sync
                    ? "List is synced and new bans will automatically be added to the list."
                    : "List is not synced and no bans are automatically added."}
            </p>
            <p className="text-xs text-gray-300">
                Note: You still have to subscribe to this banlist or bans added
                to this ban list will not take affect in your server.
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
                            getBanListUsers(route.guildId, banList.id)
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
                    disabled={route.guildId !== banList.owner}
                >
                    Name
                </button>
                <button
                    className={clsx(
                        "--btn --btn-0 --btn-neutral",
                        tab === 4 && "ring ring-indigo-500"
                    )}
                    onClick={() => {
                        setTab(tab === 4 ? -1 : 4);
                    }}
                    disabled={route.guildId !== banList.owner}
                >
                    Managers
                </button>
                <button
                    className={clsx(
                        "--btn --btn-0 --btn-neutral",
                        tab === 5 && "ring ring-indigo-500"
                    )}
                    onClick={() => {
                        setTab(tab === 5 ? -1 : 5);
                    }}
                >
                    Settings
                </button>
            </div>
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
                                    ? addBanListUsers
                                    : deleteBanListUsers;
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
                <div className="mt-6">
                    <TextInput
                        value={nameInput}
                        setValue={setNameInput}
                        maxLength={32}
                        placeholder="Name of this list"
                    />
                    <button
                        className="my-2 --btn --btn-primary --btn-0 w-60"
                        disabled={
                            !/^[a-zA-Z\d -_()\[\]]{6,64}$/.test(nameInput) ||
                            nameInput === banList.name
                        }
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(
                                patchBanSyncList(route.guildId, banList.id, {
                                    name: nameInput,
                                })
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (!response) return;
                                setOwnBanList({
                                    data: ownBanList.data.map((bl) =>
                                        bl.id === banList.id
                                            ? { ...bl, name: nameInput }
                                            : bl
                                    ),
                                });
                            });
                        }}
                    >
                        Save name
                    </button>
                    <p className="text-xs text-gray-300">
                        This name will be shown to subscribers, so choose wisely
                        and make it recognizeable.
                    </p>
                </div>
            )}
            {tab === 4 && (
                <div className="mt-6">
                    <MultilineTextInput
                        placeholder="Put managing guild ids in here."
                        value={guildInput}
                        setValue={setGuildInput}
                    />
                    <button
                        className="--btn --btn-primary --btn-0 w-60"
                        disabled={
                            guildInput
                                .split(/[^\d]+/)
                                .filter((x) => /^\d{17,22}$/.test(x))
                                .sort()
                                .join(",") === banList.managers.sort().join(",")
                        }
                        onClick={() => {
                            const ids = guildInput
                                .split(/[^\d]+/)
                                .filter((x) => /^\d{17,22}$/.test(x));
                            setGuildInput(ids.join(", "));
                            setPerformingOperation(true);
                            doChange(
                                putBanListManagers(
                                    route.guildId,
                                    banList.id,
                                    ids
                                )
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (!response) return;
                                setGuildInput(response.data.join(", "));
                                if (response.data < ids.length)
                                    toast(
                                        `${
                                            ids.length - response.data
                                        } guilds were not added due to some reasons.`
                                    );
                                setOwnBanList({
                                    data: ownBanList.data.map((bl) =>
                                        bl.id === banList.id
                                            ? { ...bl, managers: response.data }
                                            : bl
                                    ),
                                });
                            });
                        }}
                    >
                        Save managers
                    </button>
                    <p className="mt-2 text-xs text-gray-300">
                        You can add more servers here which will also be able to
                        manage the users in the ban list and sync their bans to
                        it. Managing servers can't change the name, add/remove
                        other managing servers or delete the list.
                    </p>
                    <p className="text-xs text-gray-300">
                        To prevent abuse added servers must be subscribed to the
                        list first.
                    </p>
                </div>
            )}
            {tab === 5 && (
                <div className="flex gap-2 mt-6">
                    <button
                        className="--btn --btn-0 --btn-primary min-w-[8rem]"
                        disabled={performingOperation}
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(
                                postBanListImport(route.guildId, banList.id)
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
                                patchBanSyncList(route.guildId, banList.id, {
                                    auto_sync: !banList.auto_sync,
                                })
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
                    <button
                        className="--btn --btn-0 --btn-destructive min-w-[8rem]"
                        disabled={
                            performingOperation ||
                            banList.owner !== route.guildId
                        }
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(
                                deleteBanSyncList(route.guildId, banList.id),
                                {
                                    loading: "Deleting...",
                                    error: "Failed to delete: ",
                                    success: "Deleted!",
                                }
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (response)
                                    setOwnBanList({
                                        data: ownBanList.data.filter(
                                            (bl) => bl.id !== banList.id
                                        ),
                                    });
                            });
                        }}
                    >
                        Delete list
                    </button>
                </div>
            )}
        </>
    );
}
