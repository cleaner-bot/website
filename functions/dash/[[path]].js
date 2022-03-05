export function onRequestGet({ env, request, params }) {
    let { path } = params;
    path = path.slice(1).join("/");
    const url = new URL("/dash/[id]" + (path ? "/" + path : ""), request.url);
    // return new Response(`${url.toString()} ${path}`)
    return env.ASSETS.fetch(new Request(url.toString(), request))
}
