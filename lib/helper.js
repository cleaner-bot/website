export function range(len, fn) {
    const data = [];
    for (let i = 0; i < len; i++) data.push(fn(i));
    return data;
}

export function randomString(length) {
    let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}
