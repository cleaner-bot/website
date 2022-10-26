const factors = [
    ["y", 60 * 60 * 24 * 365],
    ["d", 60 * 60 * 24],
    ["h", 60 * 60],
    ["m", 60],
    ["s", 1],
];
const factorsMap = {};
for (const factor of factors) {
    factorsMap[factor[0]] = factor[1];
}

export function textToDuration(text) {
    let duration = 0,
        buffer = [];
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        if (/\d/.test(letter)) {
            buffer.push(letter);
        } else if (factorsMap[letter]) {
            duration +=
                (buffer.length > 0 ? parseInt(buffer.join("")) : 1) *
                factorsMap[letter];
            buffer = [];
        } else if (/[\s,]/.test(letter)) {
        } else {
            return undefined; // invalid
        }
    }
    if (buffer.length > 0) duration += parseInt(buffer.join(""));
    return duration;
}

export function durationToText(duration) {
    if (!duration) return "0s";
    const text = [];
    for (const factor of factors) {
        if (duration >= factor[1]) {
            text.push(Math.floor(duration / factor[1]).toString() + factor[0]);
            duration %= factor[1];
        }
    }
    return text.join("");
}
