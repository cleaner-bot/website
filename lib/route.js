export function routeUrl(route) {
    const options = [route.guildId, route.component, ...route.other];
    while (options[options.length - 1] === "") options.pop();
    return options.join("/");
}
