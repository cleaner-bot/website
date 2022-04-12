
import React from "react";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

export default function MyCustomApp({ Component, pageProps }) {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        color: "#fff",
                        background: "#111827"
                    }
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

