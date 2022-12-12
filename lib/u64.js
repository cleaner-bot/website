export function u64ToBytes(n) {
    return new Uint8Array(
        new Uint32Array([Number(n & 0xffffffffn), Number(n >> 32n)]).buffer
    );
}

export function bytesToU64(array) {
    const array32 = new Uint32Array(array.buffer);
    return BigInt(array32[0]) | (BigInt(array32[1]) << 32n);
}
