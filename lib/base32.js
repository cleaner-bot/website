// From https://technote.fyi/code/javascript/base32-encoding-and-decoding-in-javascript/
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const pad = "=";

export function base32encode(buffer) {
    var a = alphabet;
    var len = buffer.length;
    var o = "";
    var w,
        c,
        r = 0,
        sh = 0;
    for (let i = 0; i < len; i += 5) {
        // mask top 5 bits
        c = buffer[i];
        w = 0xf8 & c;
        o += a.charAt(w >> 3);
        r = 0x07 & c;
        sh = 2;

        if (i + 1 < len) {
            c = buffer[i + 1];
            // mask top 2 bits
            w = 0xc0 & c;
            o += a.charAt((r << 2) + (w >> 6));
            o += a.charAt((0x3e & c) >> 1);
            r = c & 0x01;
            sh = 4;
        }

        if (i + 2 < len) {
            c = buffer[i + 2];
            // mask top 4 bits
            w = 0xf0 & c;
            o += a.charAt((r << 4) + (w >> 4));
            r = 0x0f & c;
            sh = 1;
        }

        if (i + 3 < len) {
            c = buffer[i + 3];
            // mask top 1 bit
            w = 0x80 & c;
            o += a.charAt((r << 1) + (w >> 7));
            o += a.charAt((0x7c & c) >> 2);
            r = 0x03 & c;
            sh = 3;
        }

        if (i + 4 < len) {
            c = buffer[i + 4];
            // mask top 3 bits
            w = 0xe0 & c;
            o += a.charAt((r << 3) + (w >> 5));
            o += a.charAt(0x1f & c);
            r = 0;
            sh = 0;
        }
    }
    // Calculate length of pad by getting the
    // number of words to reach an 8th octet.
    if (r != 0) {
        o += a.charAt(r << sh);
    }
    return o;
}
