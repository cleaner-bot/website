import React from "react";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import BSOD from "@/components/bsod.jsx";
import MetaTags from "@/components/metatags";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <>
                    <MetaTags title="This website ran into a problem and needs to be reloaded." />
                    <BSOD error={this.state.hasError} />
                </>
            );
        }
        return this.props.children;
    }
}

export default function MyCustomApp({ Component, pageProps }) {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        color: "#fff",
                        background: "#111827",
                    },
                }}
            />
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </>
    );
}
