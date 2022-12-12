var a,
    b,
    c,
    d,
    e = function (b) {
        var d = b.map((b) => b + "").join(""),
            e = 0x1,
            f = 0x0,
            g,
            i;
        if (d) {
            e = 0x0;
            for (g = d.length - 0x1; g >= 0x0; g--)
                (i = d.charCodeAt(g)),
                    (e = ((e << 0x6) & 0xfffffff) + i + (i << 0xe)),
                    (f = e & 0xfe00000),
                    (e = f !== 0x0 ? e ^ (f >> 0x15) : e);
        }
        return ~~String(e).slice(0x0, 0x3);
    },
    f = [],
    g = 0x0,
    h = (function () {
        var b,
            c = [
                "\x2d\x36\x23\x37\x37\x3c\x2c\x2c\x27\x36\x36\x31",
                "\u007b\u0030\u0078\u0037\u0045\u0036\u0045\u0036\u0043\u0036\u0035\u002c\u0030\u0078\u0036\u0038\u0031\u002c\u0030\u0078\u0037\u0045\u0037\u0034\u0036\u0038\u0036\u0037\u002c\u0030\u0078\u0036\u0035\u0030\u007d",
                "\x2d\x2e\x35\x27\x23\x3d\x33\x24\x2e\x3d",
                "\x7b\x30\x78\x37\x45\x36\x35\x36\x34\x34\x31\x2c\x30\x78\x36\x31\x31\x2c\x30\x78\x37\x45\x37\x34\x2c\x30\x78\x38\x7d",
                "\u002d\u0032\u0031\u0038\u0029\u0039\u0029",
                "\u003c\u007e\u0041\u0038\u002c\u0058\u0066\u0042\u006b\u0025\u007e\u003e",
                "\x7b\x30\x78\x37\x45\x37\x35\x37\x34\x36\x43\x2c\x30\x78\x36\x34\x32\x2c\x30\x78\x37\x45\x37\x39\x2c\x30\x78\x38\x7d",
                "\u003c\u007e\u0040\u003b\u004b\u0052\u0070\u0045\u0062\u0050\u007e\u003e",
                "\u003c\u007e\u0046\u0044\u002c\u004c\u007e\u003e",
                "\x2f\x2e\x33\x38\x29",
                "\u002d\u002a\u003b\u0037\u002d\u003a\u0034\u0026\u002f\u0029",
                "\x7b\x30\x78\x37\x45\x37\x35\x37\x33\x37\x30\x2c\x30\x78\x36\x35\x30\x2c\x30\x78\x37\x45\x36\x38\x2c\x30\x78\x38\x7d",
                "\x3c\x7e\x44\x2f\x21\x6b\x7e\x3e",
                "\x2d\x3e\x33\x38\x29\x36\x24\x2a\x2e\x35",
                "\u003c\u007e\u0046\u0028\u004b\u0047\u006e\u0042\u006c\u0033\u007e\u003e",
                "\u002f\u0031\u003a\u0034\u0025",
                "\u007b\u0030\u0078\u0037\u0045\u0037\u0035\u0037\u0033\u0036\u0032\u002c\u0030\u0078\u0036\u0031\u0031\u002c\u0030\u0078\u0037\u0045\u0037\u0034\u0036\u0043\u0036\u0035\u002c\u0030\u0078\u0036\u0030\u0041\u007d",
                "\x2d\x32\x35\x37\x2f\x3a\x2c\x34\x2f\x31",
                "\u002d\u003e\u0033\u0038\u0029\u0036\u002c\u002a\u002e\u0039",
                "\x7b\x30\x78\x37\x45\x37\x33\x37\x32\x36\x35\x2c\x30\x78\x36\x38\x31\x2c\x30\x78\x37\x45\x37\x35\x37\x34\x36\x43\x2c\x30\x78\x36\x34\x32\x7d",
                "\u002f\u0032\u0035\u0037\u003b\u003a\u0029",
                "\u002f\u003a\u0031\u0037\u0039\u003e\u002c\u0026\u002a\u003d",
                "\x7b\x30\x78\x37\x45\x37\x32\x37\x30\x36\x35\x2c\x30\x78\x36\x34\x32\x2c\x30\x78\x37\x45\x36\x43\x36\x33\x36\x31\x2c\x30\x78\x36\x34\x32\x7d",
                "\u003c\u007e\u0041\u004f\u0031\u002d\u004b\u007e\u003e",
                "\x3c\x7e\x41\x6f\x29\x43\x28\x45\x57\x7e\x3e",
                "\x29\x26\x22\x25\x27\x32\x23\x26\x29\x3a\x24\x35\x31\x33\x29",
                "\u007b\u0030\u0078\u0037\u0045\u0034\u0043\u0034\u0042\u0034\u0041\u002c\u0030\u0078\u0036\u0038\u0038\u002c\u0030\u0078\u0037\u0045\u0034\u0046\u0034\u0045\u0034\u0044\u002c\u0030\u0078\u0036\u0038\u0038\u002c\u0030\u0078\u0037\u0045\u0035\u0032\u0035\u0031\u0035\u0030\u002c\u0030\u0078\u0036\u0038\u0038\u007d",
                "\x2b\x2e\x2b\x26\x2b\x36\x33\x38\x2c\x22\x2d\x36\x35\x39\x29",
                "\u003c\u007e\u0040\u0055\u0069\u0071\u005b\u0041\u006e\u0050\u0064\u006b\u0043\u0026\u007e\u003e",
                "\u003c\u007e\u0043\u004d\u005b\u006a\u002a\u0044\u0066\u0042\u005d\u003a\u0045\u0072\u007e\u003e",
                "\x3c\x7e\x46\x45\x4d\x62\x4e\x47\x5e\x34\x54\x68\x30\x60\x7e\x3e",
                "\u007b\u0030\u0078\u0037\u0045\u0033\u0034\u0033\u0033\u0033\u0032\u002c\u0030\u0078\u0036\u0038\u0038\u002c\u0030\u0078\u0037\u0045\u0033\u0037\u0033\u0036\u0033\u0035\u002c\u0030\u0078\u0036\u0038\u0038\u002c\u0030\u0078\u0037\u0045\u0033\u0039\u0033\u0038\u0032\u0042\u002c\u0030\u0078\u0036\u0031\u0031\u007d",
                "\x7b\x30\x78\x37\x45\x36\x38\x36\x33\x36\x31\x2c\x30\x78\x36\x31\x31\x2c\x30\x78\x37\x45\x37\x34\x37\x32\x34\x31\x2c\x30\x78\x36\x38\x31\x7d",
                "\u007b\u0030\u0078\u0037\u0045\u0036\u0045\u0036\u0039\u0036\u0034\u002c\u0030\u0078\u0036\u0031\u0031\u002c\u0030\u0078\u0037\u0045\u0037\u0038\u0036\u0035\u0034\u0046\u002c\u0030\u0078\u0036\u0031\u0031\u007d",
                "\u002d\u002e\u0031\u0035\u003d\u002f\u0024\u002e\u002a\u0022\u0033\u0037\u0037\u003f\u002c\u003b\u002b\u003d\u003a\u0035\u002f",
            ],
            d = c;
        for (b = e(d) - 0x4; b; b--) d.unshift(d.pop());
        return g ? c.pop() : g++, c;
    })(),
    i = G(0x21),
    j = G.apply(this, [0x21]),
    k = G(0x17),
    l = G.apply(this, [0x20]),
    m = I.apply(this, [0x1f]),
    n = I(0x1e),
    o = I(0x1d),
    p = E.call(this, 0x1a),
    q = I(0x18),
    r = G.apply(this, [0x17]),
    s = E.call(this, 0x12),
    t = G.apply(this, [0x11]),
    u = E.apply(this, [0x3]),
    v = E.apply(this, [0x3]);
void ((a = I.apply(this, [0x9])),
(b = I.call(this, 0x8)),
(c = G.call(this, 0x7)),
(d = I.call(this, 0x6)));
var w = G(0x2),
    x = (function () {
        var a = {
            f: "\x67",
            h: (a = w) => {
                if (!x.i[0x0]) {
                    x.i.push(0x5d);
                }
                return x.i[a];
            },
            j: "\x6b",
            e: 0x51,
            i: [],
            m: [],
            l: (a = "\u006c\u0065\u006e\u0067\u0074\u0068") => {
                if (!x.m[0x0]) {
                    x.m.push(-0x40);
                }
                return x.m[a];
            },
        };
        return a;
    })();
function y(a, b) {
    switch (A) {
        case !(x.e > -0x39) ? 0xcd : 0x3bc:
            return a + b;
        case x.f[E.call(this, 0x3) + G(0x4)](0x0) == 0x67 ? 0x1fd : -0x43:
            return a - b;
        case x.h() ? -0x78 : void 0x0:
            return a * b;
    }
}
function z(b) {
    return (b = A + ((A = b), 0x0)), b;
}
var A;
onmessage = (a) => B(a[E.call(this, 0x5)]);
async function B({ [d + c]: e, [b + a]: f, prefix: g }) {
    var h,
        i,
        j,
        k = G.apply(this, [0x14]),
        l = E(0x10),
        m = I.apply(this, [0xf]);
    !((h = E(0xe)), (i = E.apply(this, [0xb])), (j = E.apply(this, [0xa])));
    const n = C(g),
        o = new Uint8Array(y(n.length, 0x4, (A = 0x3bc))),
        p = (o[j](n), new DataView(o[i])),
        q = [];
    for (
        let a = 0x0;
        a < e && x.f[v + "\x64\x65\x41\x74"](0x0) == 0x67;
        a += 0x20
    ) {
        var r,
            w = I.apply(this, [0xd]);
        +((r = G.apply(this, [0xc])),
        q[r](y(0x1 << Math[w](0x20, e - a), 0x1, (A = 0x1fd))));
    }
    let b = new Date()[h + "\x65"]();
    for (let c = 0x0; x.f[u + "\x64\x65\x41\x74"](0x0) == 0x67; c++) {
        var z,
            B = E.apply(this, [0x15]),
            D = E(0x3);
        z = E.call(this, 0x10);
        const F = (p[m + z](n.length, c, !0x1), await crypto[t][s](f, o)),
            H = new DataView(F);
        let e = !0x0;
        for (let a = 0x0; a < q.length && x.e > -0x39; a++) {
            var J = E.apply(this, [0x13]);
            if (
                (H[J + l](0x1c - 0x4 * a, !0x1) & q[a]) !== 0x0 &&
                x.f[D + "\x64\x65\x41\x74"](0x0) == 0x67
            ) {
                e = !0x1;
                break;
            }
        }
        if (e && x.e > -0x39) {
            var K = E(0x16);
            return postMessage({
                [k]: c,
                [B]: y(new Date()[K + "\x66"](), b, (A = 0x1fd)),
            });
        }
    }
}
const C = (a) => {
    var b,
        c,
        d,
        e = G.apply(this, [0x21]),
        f = G.call(this, 0x22),
        g = G(0x21);
    void ((b = E(0x1c)),
    (c = G.apply(this, [0x1b])),
    (d = I.apply(this, [0x19])));
    const h =
        ((a = a[r + q]("\u003d", "")),
        Math[d](y(a.length / 0x4, 0x3, (A = -0x78))));
    let z = new Uint8Array(h),
        B,
        C,
        D,
        F,
        H,
        L,
        M;
    const s = p + c + b + o + n + m + l + "\u002f\u003d";
    for (
        let N = ((a = a[k + "\u0065"](/[^A-Za-z0-9\+\/\=]/g, "")), 0x0),
            O = 0x0;
        N < h && x.j[j](0x0) == "\u006b";
        N += 0x3
    ) {
        var t,
            u,
            v,
            w = G.apply(this, [0x22]);
        ~((t = G.apply(this, [0x21])),
        (u = G.call(this, 0x22)),
        (v = G.apply(this, [0x22])));
        if (
            ((F = s[v + "\x66"](a[g](O++))),
            (H = s[u + "\u0066"](a[t](O++))),
            (L = s[f + "\u0066"](a[i](O++))),
            (M = s[w + "\x66"](a[e](O++))),
            (B = (F << 0x2) | (H >> 0x4)),
            (C = ((H & 0xf) << 0x4) | (L >> 0x2)),
            (D = ((L & 0x3) << 0x6) | M),
            (z[N] = B),
            L) != 0x40 &&
            x.h()
        ) {
            z[y(N, 0x1, (A = 0x3bc))] = C;
        }
        if (M != 0x40 && x.l()) {
            z[y(N, 0x2, (A = 0x3bc))] = D;
        }
    }
    return z;
};
function D(a) {
    var c,
        g,
        h = 0x0,
        j = "",
        k = a.length,
        l = String,
        m = "\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74",
        n =
            "\u0066\u0072\u006f\u006d\u0043\u0068\u0061\u0072\u0043\u006f\u0064\u0065",
        p;
    for (p = 0x0; p < k; p += 0x1)
        (c = a[m](p) - 0x21),
            c >= 0x0 && c < 0x20
                ? ((h += ((g = (g << 0x5) | c), 0x5)),
                  h >= 0x8
                      ? (h -= ((j += l[n]((g >> (h - 0x8)) & 0xff)), 0x8))
                      : 0x0)
                : 0x0;
    return j;
}
function E(c, d, e, g = D, i = f) {
    if (e) {
        return (d[f[e]] = E(c, d));
    } else {
        if (d) {
            [i, d] = [g(i), c || e];
        }
    }
    return d ? c[i[d]] : f[c] || ((e = (i[c], g)), (f[c] = e(h[c])));
}
function F(a) {
    var b = "";
    a = a.substring(0x1, a.length - 0x1);
    var c = a.split("\x2c");
    for (var d = 0x0; d < c.length; d += 0x2) {
        var e = [c[d], c[d + 0x1]],
            [f, g] = e.map(Number);
        while (g)
            (b += String.fromCharCode((f >> (0x8 * (g & 0x7))) & 0xff)),
                (g >>= 0x3);
    }
    return b.replace(/~/g, "");
}
function G(c, d, e, g = F, i = f) {
    if (e) {
        return (d[f[e]] = G(c, d));
    } else {
        if (d) {
            [i, d] = [g(i), c || e];
        }
    }
    return d ? c[i[d]] : f[c] || ((e = (i[c], g)), (f[c] = e(h[c])));
}
function H(
    b,
    i = [
        "\u0066\u0072\u006f\u006d\u0043\u0068\u0061\u0072\u0043\u006f\u0064\u0065",
        "\u0061\u0070\u0070\u006c\u0079",
    ]
) {
    var j,
        k,
        m,
        n,
        o,
        p = String,
        q = "\x6c\x65\x6e\x67\x74\x68",
        r = 0xff,
        s = "\u0063\u0068\u0061\u0072\u0043\u006f\u0064\u0065\u0041\u0074",
        t = "\u0073\u006c\u0069\u0063\u0065",
        u = "\u0072\u0065\u0070\u006c\u0061\u0063\u0065";
    for (
        "\x3c\x7e" === b[t](0x0, 0x2) && "\u007e\u003e" === b[t](-0x2),
            b = b[t](0x2, -0x2)[u](/s/g, "")[u]("\x7a", "\x21\x21\x21\x21\x21"),
            j = "\u0075\u0075\u0075\u0075\u0075"[t](b[q] % 0x5 || 0x5),
            b += j,
            m = [],
            n = 0x0,
            o = b[q];
        o > n;
        n += 0x5
    )
        (k =
            0x31c84b1 * (b[s](n) - 0x21) +
            0x95eed * (b[s](n + 0x1) - 0x21) +
            0x1c39 * (b[s](n + 0x2) - 0x21) +
            0x55 * (b[s](n + 0x3) - 0x21) +
            (b[s](n + 0x4) - 0x21)),
            m.push(r & (k >> 0x18), r & (k >> 0x10), r & (k >> 0x8), r & k);
    return (
        (function (b, k) {
            var j;
            for (j = k; j > 0x0; j--) b.pop();
        })(m, j[q]),
        p[i[0x0]][i[0x1]](p, m)
    );
}
function I(c, d, e, g = H, i = f) {
    if (e) {
        return (d[f[e]] = I(c, d));
    } else {
        if (d) {
            [i, d] = [g(i), c || e];
        }
    }
    return d ? c[i[d]] : f[c] || ((e = (i[c], g)), (f[c] = e(h[c])));
}
