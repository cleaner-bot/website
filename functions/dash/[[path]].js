export function onRequestGet({ env, request, params }) {
    let { path } = params;
    path = path.split("/").slice(1).join("/");
    return env.ASSETS.fetch(new Request(new URL("/dash/[id]/" + path, request.url).toString(), request))
}