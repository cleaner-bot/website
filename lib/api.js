import axios from "axios";
import toast from "react-hot-toast";

export let API_ROUTE = "https://cleaner.thenewgalaxy.online/";
if (globalThis.localStorage && localStorage.getItem("dev") === "true")
    API_ROUTE = "http://localhost:8000/";

export let AXIOS = axios.create({
    baseURL: API_ROUTE,
    withCredentials: true,
});
AXIOS.interceptors.request.use((config) => {
    const url =
        "/" +
        config.url
            .split("/")
            .filter((_, index) => index > 1)
            .join("/");
    config.withCredentials = true;
    if (
        url.startsWith("/user/") ||
        url.startsWith("/guild/") ||
        url.startsWith("/bansync") ||
        url.startsWith("/super-verification") ||
        url.startsWith("/joinguard") ||
        url.startsWith("/billing") ||
        url.startsWith("/chl")
    ) {
        const token = localStorage.getItem("token");
        if (!token && !url.startsWith("/chl")) {
            return Promise.reject({ response: { status: 401 } });
        }
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
});

/* Helper */

export async function doChange(promise, text) {
    const toastId = toast.loading(text?.loading || "Saving...");
    let response;
    try {
        response = await promise;
    } catch (e) {
        console.error(e);
        if (e.response && e.response.status !== 0) {
            const message =
                typeof e.response.data === "string"
                    ? e.response.data
                    : "Check console";
            toast.error(
                (text?.error || "Failed to save: ") +
                    `${e.response.status}: ${message}`,
                { id: toastId }
            );
            if (
                e.response.status === 429 &&
                e.response.headers["retry-after"]
            ) {
                const retry_after = +e.response.headers["retry-after"];
                if (retry_after > 0)
                    await new Promise((res) =>
                        setTimeout(res, retry_after + 1000)
                    );
            }
        } else {
            toast.error((text?.error || "Failed to save: ") + e.message, {
                id: toastId,
            });
        }
        return false;
    }
    if (text?.success === null) {
        toast.dismiss(toastId);
    } else {
        toast.success(text?.success || "Saved", { id: toastId });
    }
    const remaining = response.headers["x-ratelimit-remaining"];
    const limit = response.headers["x-ratelimit-limit"];
    if (
        remaining !== undefined &&
        limit !== undefined &&
        (remaining < 2 || remaining / limit <= 0.5)
    ) {
        const percentage = 1.1 - remaining / limit;
        const retry_after = +response.headers["retry-after"];
        if (retry_after > 0)
            await new Promise((res) =>
                setTimeout(res, retry_after * percentage)
            );
    }
    return response;
}

/* OAuth */

export function createOAuthRedirect({
    destination,
    extraScopes,
    allowChange,
    withBot,
    withAdmin,
    guildId,
}) {
    const redirect_uri = `${document.location.origin}/oauth-comeback`;
    const query = {
        client_id: "1051460283454984303",
        response_type: "code",
        redirect_uri,
        scope: [
            "identify",
            "guilds",
            ...(extraScopes || []),
            ...(withBot ? ["bot", "applications.commands"] : []),
        ].join(" "),
    };
    if (destination) query.state = destination;
    if (!allowChange) query.prompt = "none";
    if (withBot) {
        query.permissions = 1099914308662 + withAdmin ? 8 : 0;
        if (guildId) {
            query.guild_id = guildId;
            query.disable_guild_select = true;
        }
    }
    return `https://discord.com/oauth2/authorize?${new URLSearchParams(
        query
    ).toString()}`;
}

export function postOAuth2Finalize(code, state, redirect_uri) {
    return AXIOS.post("/v1/oauth2/d/finalize", { code, state, redirect_uri });
}

/* Human platform */

export function postHumanChallenge(data) {
    return AXIOS.post("/v1/chl", data);
}

/* @me */

export function getUser() {
    return AXIOS.get(`/v1/user/me`);
}

export function getGuilds() {
    return AXIOS.get(`/v1/user/me/guilds`);
}

export function getStatistics() {
    return AXIOS.get(`/v1/user/me/statistics`);
}

export function getMFA() {
    return AXIOS.get(`/v1/user/me/mfa`);
}

export function deleteMFA() {
    return AXIOS.delete(`/v1/user/me/mfa`);
}

export function postTOTPMFA({ secret, code }) {
    return AXIOS.post(`/v1/user/me/mfa/totp`, { secret, code });
}

/* User Ban List */

export function getUserBanSyncLists() {
    return AXIOS.get("/v1/user/me/bansync/banlist");
}

export function postUserBanSyncList(banListId) {
    return AXIOS.post(`/v1/user/me/bansync`);
}

export function patchUserBanSyncList(banListId, body) {
    return AXIOS.patch(`/v1/user/me/bansync/${banListId}`, body);
}

export function deleteUserBanSyncList(banListId) {
    return AXIOS.delete(`/v1/user/me/bansync/${banListId}`);
}

export function getUserBanListUsers(banListId) {
    return AXIOS.get(`/v1/user/me/bansync/${banListId}/users`);
}

export function addUserBanListUsers(banListId, users) {
    return AXIOS.post(`/v1/user/me/bansync/${banListId}/users`, users);
}

export function deleteUserBanListUsers(banListId, users) {
    return AXIOS.delete(`/v1/user/me/bansync/${banListId}/users`, {
        data: users,
    });
}

/* Guild */

export function getGuild(guildId) {
    return AXIOS.get(`/v1/guild/${guildId}`);
}

export function getGuildStatistics(guildId) {
    return AXIOS.get(`/v1/guild/${guildId}/statistics`);
}

export function postVerificationMessage(guildId, channelId) {
    return AXIOS.post(`/v1/guild/${guildId}/verification-message`, {
        channel_id: channelId,
    });
}

export function postSuperVerificationMessage(guildId, channelId) {
    return AXIOS.post(`/v1/guild/${guildId}/super-verification-message`, {
        channel_id: channelId,
    });
}

export function putWorker(guildId, source) {
    return AXIOS.put(`/v1/guild/${guildId}/worker`, source);
}

export function patchConfig(guildId, options) {
    return AXIOS.patch(`/v1/guild/${guildId}/config`, options);
}

export function patchEntitlements(guildId, options) {
    return AXIOS.patch(`/v1/guild/${guildId}/entitlements`, options);
}

export function getGuildSyncLists(guildId) {
    return AXIOS.get(`/v1/guild/${guildId}/bansync`);
}

export function getGuildSyncList(guildId, banListId) {
    return AXIOS.get(`/v1/guild/${guildId}/bansync/${banListId}`);
}

export function patchGuildBanSyncList(guildId, banListId, body) {
    return AXIOS.patch(`/v1/guild/${guildId}/bansync/${banListId}`, body);
}

export function postGuildBanListImport(guildId, banListId) {
    return AXIOS.post(`/v1/guild/${guildId}/bansync/${banListId}/import`);
}

export function getGuildBanListUsers(guildId, banListId) {
    return AXIOS.get(`/v1/guild/${guildId}/bansync/${banListId}/users`);
}

export function addGuildBanListUsers(guildId, banListId, users) {
    return AXIOS.post(`/v1/guild/${guildId}/bansync/${banListId}/users`, users);
}

export function deleteGuildBanListUsers(guildId, banListId, users) {
    return AXIOS.delete(`/v1/guild/${guildId}/bansync/${banListId}/users`, {
        data: users,
    });
}

export function putBanListManagers(guildId, banListId, guilds) {
    return AXIOS.put(
        `/v1/guild/${guildId}/bansync/${banListId}/managers`,
        guilds
    );
}

export function getLinkFilterList(guildId) {
    return AXIOS.get(`/v1/guild/${guildId}/linkfilter`);
}

export function patchLinkFilterList(guildId, data) {
    return AXIOS.patch(`/v1/guild/${guildId}/linkfilter`, data);
}

/* Global Statistics */

export function getGlobalStatistics() {
    return AXIOS.get(`/v1/statistics`);
}

/* Billing */

export function getStripeCheckoutURL(options) {
    return AXIOS.get(`/v1/billing/stripe/checkout`, { params: options });
}

export function getStripePortalURL(options) {
    return AXIOS.get(`/v1/billing/stripe/portal`, { params: options });
}

export function getCoinbaseChargeURL(options) {
    return AXIOS.get(`/v1/billing/coinbase/checkout`, { params: options });
}

/* Branding */

export async function uploadGuildAsset(category, guildId, formData) {
    const uploadURL = await AXIOS.post(
        `/guild/${guildId}/branding/assets/${category}`
    );
    return await AXIOS.post(uploadURL.data, formData, {
        headers: { "content-type": "multipart/form-data" },
    });
}

export function putGuildVanity(guildId, vanity) {
    return AXIOS.put(`/guild/${guildId}/branding/vanity`, vanity);
}

export function createAssetURL(category, guildId) {
    return `https://cdn.cleanerbot.xyz/${category}/${guildId}`;
}
