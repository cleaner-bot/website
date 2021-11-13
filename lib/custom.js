
const customGuilds = {
    "0": {},
    "756989147163656273": {
        splash: "https://cdn.discordapp.com/splashes/302094807046684672/b3abc737a37bdff48d0d3237b65ac994.jpg?size=2048"
    }
}


export function getCustomPaths() {
    return Object.keys(customGuilds).map(x => ({ params: {id: x} }));
}

export function getCustomProps(id) {
    return customGuilds[id];
}
