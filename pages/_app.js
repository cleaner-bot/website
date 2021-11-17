
import React from "react";
import Head from "next/head";

import "../styles/globals.css";

export default function MyCustomApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <html lang="en" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

