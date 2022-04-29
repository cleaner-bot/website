
import axios, { Axios } from "axios";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";


export let API_ROUTE = "https://cleaner-api.leodev.xyz/";
if(globalThis.localStorage && localStorage.getItem("dev") === "true")
    API_ROUTE = "http://localhost:3001/";

export let AXIOS = axios.create({
    baseURL: API_ROUTE,
})
AXIOS.interceptors.request.use((config) => {
    const url = config.url;
    config.withCredentials = true;
    if(url.startsWith("/user/") || url.startsWith("/guild/") || url.startsWith("/challenge") || url.startsWith("/verification")) {
        const token = localStorage.getItem("token");
        if(!token && !url.startsWith("/challenge")){
            const e = new Error("Not logged in");
            e.response = {
                data: { detail: "Not logged in" },
                status: 401,
                statusText: "",
                headers: {},
                config: config
            }
            throw e;
        }
        config.headers["X-Token"] = token;
    }
    return config;
})

const swrFetcher = url => AXIOS.get(url);
const swrOptions = {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if(error.status >= 400 && error.status < 500) return;
        if(retryCount >= 5) return;
        let retry_after = 5000;
        if(error.response && error.response.status === 429 && error.response.headers["retry-after"]) {
            const retry_after_header = +error.response.headers["retry-after"];
            if(retry_after_header > 0)
                retry_after = retry_after_header + 1000;
        }
        setTimeout(() => revalidate({ retryCount }), retry_after);
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
}

/* Helper */

export async function doChange(promise, text) {
    const toastId = toast.loading(text?.loading || "Saving...");
    let response;
    try {
        response = await promise;
    } catch (e) {
        console.error(e);
        if(e.response) {
            toast.error((text?.error || "Failed to save: ") + `${e.response.status}: ${e.response.data.detail}`, { id: toastId });
            if(e.response.status === 429 && e.response.headers["retry-after"]) {
                const retry_after = +e.response.headers["retry-after"];
                if(retry_after > 0)
                    await new Promise(res => setTimeout(res, retry_after + 1000));
            }
        } else {
            toast.error((text?.error || "Failed to save: ") + e.message, { id: toastId });
        }
        return false;
    }
    toast.success(text?.success || "Saved", { id: toastId });
    const remaining = response.headers["x-ratelimit-remaining"];
    const limit = response.headers["x-ratelimit-limit"];
    if(remaining !== undefined && limit !== undefined && (remaining < 2 || remaining / limit <= 0.5)) {
        const percentage = 1.1 - remaining / limit;
        const retry_after = +response.headers["retry-after"];
        if(retry_after > 0)
            await new Promise(res => setTimeout(res, retry_after * percentage));
    }
    return true;
}

/* Status and Radar */

export function useRadar() {
    return useSWR(`/radar`, swrFetcher, swrOptions);
}

/* OAuth */

export function createOAuthRedirect(options) {
    const query = new URLSearchParams(options);
    return `${API_ROUTE}/oauth/redirect?${query}`;
}

export function postOAuthCallback(code, state) {
    return AXIOS.post("/oauth/callback", undefined, { params: {code, state} });
}

/* Remote Auth */

export function createRemoteAuth() {
    return AXIOS.post(`/user/@me/remote-auth`);
}

export function postRemoteAuth(code) {
    return AXIOS.post(`/remote-auth`, { code });
}

/* @me */

export function useGuilds() {
    return useSWR(`/user/@me/guilds`, swrFetcher, swrOptions);
}

/* Guild */

export function useGuild(guildId) {
    return useSWR(guildId ? `/guild/${guildId}` : null, swrFetcher, swrOptions);
}

export async function getGuild(guildId) {
    return await AXIOS.get(`/guild/${guildId}`);
}

export function useLoggingDownloads(guildId) {
    return useSWR(`/guild/${guildId}/logging/downloads`, swrFetcher, swrOptions);
}

export function useStatistics(guildId) {
    return useSWR(`/guild/${guildId}/statistics`, swrFetcher, swrOptions);
}

export async function postChallengeEmbed(guildId, channelId) {
    return await AXIOS.post(`/guild/${guildId}/challenge-embed`, {channel_id: channelId})
}

export async function useSnapshots(guildId) {
    return useSWR(`/guild/${guildId}/backup/snapshot`, swrFetcher, swrOptions);
}

export async function postTakeSnapshot(guildId) {
    const response = await AXIOS.post(`/guild/${guildId}/backup/snapshot`);
    if(response.status >= 200 && response.status < 300)
        mutate(`/guild/${guildId}/backup/snapshot`);
    return response;
}

export async function postApplySnapshot(guildId, snapshotId) {
    return await AXIOS.post(`/guild/${guildId}/backup/snapshot/${snapshotId}`);
}

export async function patchConfig(guildId, options) {
    const response = await AXIOS.patch(`/guild/${guildId}/config`, options);
    return response;
}

export async function patchEntitlement(guildId, options) {
    const response = await AXIOS.patch(`/guild/${guildId}/entitlement`, options);
    return response;
}

/* Assets */

export let ASSETS_AXIOS = new Axios({
    baseURL: "https://cleaner-cdn.leodev.xyz"
});

export async function uploadGuildAsset(category, guildId, formData) {
    const uploadURL = await AXIOS.post(`/guild/${guildId}/assets/${category}`);
    return await AXIOS.post(uploadURL.data, formData, {headers: {"content-type": "multipart/form-data"}});
}
