
export function range(len, fn) {
    const data = [];
    for(let i = 0; i < len; i++)
        data.push(fn(i));
    return data;
}