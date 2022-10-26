import crc32 from "@/lib/crc32.js";
import { b64decode } from "./base64";

function readNumber(bytes) {
    let result = 0n;
    let base = 1n;
    for (let i = bytes.length - 1; i >= 0; i--) {
        result += BigInt(bytes[i]) * base;
        base *= 256n;
    }
    return result;
}

export default function decodeFlow(flowId) {
    // this is harder than it looks
    const raw = b64decode(flowId);
    if (raw.length !== 52) return { raw, id: flowId, isValid: false };
    // format:
    //  0 -  7: user id
    const userId = readNumber(raw.subarray(0, 8));
    //  8 - 15: guild id
    const guildId = readNumber(raw.subarray(8, 16));
    // 16 - 47: hmac (cant verify)
    // 48 - 51: crc32
    const checksum = readNumber(raw.subarray(48, 52));
    return {
        raw,
        id: flowId,
        userId,
        guildId,
        checksum,
        isValid: true,
        isChecksumValid: crc32(raw.subarray(0, 48)) == checksum,
    };
}
