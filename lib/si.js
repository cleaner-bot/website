const SI_PREFIXES_CENTER_INDEX = 8;

const siPrefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "μ",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
];

export function getSiPrefixedNumber(number) {
    if (number === 0) return number.toString();
    const base = Math.floor(Math.log10(Math.abs(number)));
    const siBase = (base < 0 ? Math.ceil : Math.floor)(base / 3);
    if (siBase === 0) return number.toString();
    const baseNumber = parseFloat(
        (number / Math.pow(10, siBase * 3)).toFixed(2)
    );
    const prefix = siPrefixes[siBase + SI_PREFIXES_CENTER_INDEX];
    return `${baseNumber}${prefix}`;
}
