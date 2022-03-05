export function onRequestGet({ env, request, params }) {
    try {
        let { path } = params;
        const url = new URL(path.length === 0 ? "/dash" : "/dash/[id]" + (path.length > 1 ? "/" + path.slice(1).join("/") : ""), request.url);
        return env.ASSETS.fetch(new Request(url.toString(), request))
    } catch(e) {
        return new Response(`${e.message} ${e.stack}`);
    }
}
