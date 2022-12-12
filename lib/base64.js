const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function removePaddingChars(input) {
    var lkey = alphabet.indexOf(input.charAt(input.length - 1));
    if (lkey == 64) return input.substring(0, input.length - 1);
    return input;
}

export function b64decode(input) {
    //get last chars to see if are valid
    input = removePaddingChars(input);
    input = removePaddingChars(input);
    input = input.replaceAll("-", "+").replaceAll("_", "/");

    const bytes = parseInt((input.length / 4) * 3, 10);

    const uarray = new Uint8Array(bytes);
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    var j = 0;

    for (let i = 0; i < bytes; i += 3) {
        //get the 3 octects in 4 ascii chars
        enc1 = alphabet.indexOf(input.charAt(j++));
        enc2 = alphabet.indexOf(input.charAt(j++));
        enc3 = alphabet.indexOf(input.charAt(j++));
        enc4 = alphabet.indexOf(input.charAt(j++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        uarray[i] = chr1;
        if (enc3 != 64) uarray[i + 1] = chr2;
        if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
}

export function b64encode(input) {
    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(input)));
}
