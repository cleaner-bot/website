export function onRequestGet({ env, request, params }) {
    try {
        let { path } = params;
        path = path.split("/").slice(1).join("/");
        return env.ASSETS.fetch(new Request(new URL("/dash/[id]/" + path, request.url).toString(), request))
    } catch(e) {
        return new Response(`${e.message} ${e.stack}`)
    }
}