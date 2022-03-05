export async function onRequest({ env, request, params }) {
    let { path } = params;
    let path = path.split("/").slice(1).join("/");
    return context.env.ASSETS.fetch(new URL("/dash/[id]/" + path, request.url).toString())
}