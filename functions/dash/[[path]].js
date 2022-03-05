export function onRequestGet({ env, request, params }) {
    let { path } = params;
    path = path.slice(1).join("/");
    return new Response(`${new URL("/dash/[id]/" + path, request.url).toString()} ${path}`)
    // return env.ASSETS.fetch(new Request(new URL("/dash/[id]/" + path, request.url).toString(), request))
}