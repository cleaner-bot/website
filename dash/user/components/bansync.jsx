import { useEffect, useState } from "react";
import clsx from "clsx";

import { BlockWithPanel, PlainBlock } from "@/components/dash/block.jsx";
import { Section } from "@/components/dash/dash.jsx";
import {
    Button,
    MultilineTextInput,
    TextInput,
} from "@/components/dash/ui.jsx";
import ErrorHandler from "@/components/dash/error.jsx";
import {
    doChange,
    getUserBanSyncLists,
    postUserBanSyncList,
    getUserBanListUsers,
    addUserBanListUsers,
    deleteUserBanListUsers,
    patchUserBanSyncList,
    deleteUserBanSyncList,
} from "@/lib/api.js";

const BANLIST_MAX = 5;

export default function BanSyncComponent() {
    const [ownBanList, setOwnBanList] = useState();
    const [performingOperation, setPerformingOperation] = useState(false);

    useEffect(() => {
        getUserBanSyncLists().then(setOwnBanList).catch(setOwnBanList);
    }, []);

    return (
        <Section>
            <BlockWithPanel
                name="Create a ban list"
                description="Creates a new ban list. Others will be able to follow it."
                panel={
                    <Button
                        text="Create ban list"
                        disabled={
                            performingOperation ||
                            !ownBanList?.data ||
                            ownBanList.data.length >= BANLIST_MAX
                        }
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(postUserBanSyncList(), {
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
                    {BANLIST_MAX} lists created
                </p>
            </BlockWithPanel>

            {!ownBanList ? (
                <p>Loading your ban lists...</p>
            ) : !ownBanList.data ? (
                <ErrorHandler error={ownBanList} />
            ) : (
                <div className="space-y-2">
                    {ownBanList.data.map((banList) => (
                        <PlainBlock>
                            <OwnBanList
                                banList={banList}
                                performingOperation={performingOperation}
                                setPerformingOperation={setPerformingOperation}
                                ownBanList={ownBanList}
                                setOwnBanList={setOwnBanList}
                            />
                        </PlainBlock>
                    ))}
                </div>
            )}
        </Section>
    );
}

function OwnBanList({
    banList,
    performingOperation,
    setPerformingOperation,
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
            </p>
            <p className="mt-2">
                This list contains{" "}
                {banList.count === 1 ? "one user" : `${banList.count} users`}.
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
                            getUserBanListUsers(banList.id)
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
                                    ? addUserBanListUsers
                                    : deleteUserBanListUsers;
                            setPerformingOperation(true);
                            doChange(fn(banList.id, ids)).then((response) => {
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
                            });
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
                                patchUserBanSyncList(banList.id, {
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
                        className="w-full --btn --btn-primary --btn-0 sm:w-60"
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
                                patchUserBanSyncList(banList.id, {
                                    managers: ids,
                                })
                            ).then((response) => {
                                setPerformingOperation(false);
                                if (!response) return;
                                setGuildInput(
                                    response.data.managers.join(", ")
                                );
                                if (response.data < ids.length)
                                    toast(
                                        `${
                                            ids.length - response.data
                                        } guilds were not added due to some reasons.`
                                    );
                                setOwnBanList({
                                    data: ownBanList.data.map((bl) =>
                                        bl.id === banList.id
                                            ? {
                                                  ...bl,
                                                  managers: response.data,
                                              }
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
                        it. Managing servers can only access the name of the ban
                        list and the users within.
                    </p>
                </div>
            )}
            {tab === 5 && (
                <div className="flex gap-2 mt-6">
                    <button
                        className="--btn --btn-0 --btn-destructive min-w-[8rem]"
                        disabled={performingOperation}
                        onClick={() => {
                            setPerformingOperation(true);
                            doChange(deleteUserBanSyncList(banList.id), {
                                loading: "Deleting...",
                                error: "Failed to delete: ",
                                success: "Deleted!",
                            }).then((response) => {
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
