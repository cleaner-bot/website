// Based off of https://stackoverflow.com/a/18639903

const table = new Uint32Array(256);
// Pre-generate crc32 polynomial lookup table
// http://wiki.osdev.org/CRC32#Building_the_Lookup_Table
// ... Actually use Alex's because it generates the correct bit order
//     so no need for the reversal function
for (let i = 256; i--; ) {
    let tmp = i;
    for (let k = 8; k--; ) {
        tmp = tmp & 1 ? 3988292384 ^ (tmp >>> 1) : tmp >>> 1;
    }
    table[i] = tmp;
}

// crc32b
// Example input        : [97, 98, 99, 100, 101] (Uint8Array)
// Example output       : 2240272485 (Uint32)
export default function crc32(data) {
    var crc = -1; // Begin with all bits set ( 0xffffffff )

    for (var i = 0, l = data.length; i < l; i++) {
        crc = (crc >>> 8) ^ table[(crc & 255) ^ data[i]];
    }

    return (crc ^ -1) >>> 0; // Apply binary NOT
}
