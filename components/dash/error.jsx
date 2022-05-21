import { ExternalLink } from "@/components/buttons.jsx";
import { useEffect } from "react";

function GenericErrorHandler({ title, children, hasSupport }) {
    return (
        <div className="px-4 my-20">
            <h1 className="text-4xl font-medium text-center text-rose-400">
                {title}
            </h1>
            {children}
            {hasSupport && (
                <div className="flex justify-center">
                    <ExternalLink href="/discord" className="mt-12 w-96">
                        Support (discord)
                    </ExternalLink>
                </div>
            )}
        </div>
    );
}

const httpErrors = {
    400: function Error400({ error }) {
        return (
            <GenericErrorHandler title="Bad Request" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Your browser sent an invalid request.
                </p>
                {error.response.data && error.response.data.detail && (
                    <p className="text-center text-gray-200">
                        {error.response.data.detail}
                    </p>
                )}
            </GenericErrorHandler>
        );
    },
    401: function Error401({ error }) {
        localStorage.removeItem("token");
        return (
            <GenericErrorHandler title="Unauthorized">
                <p className="mt-6 text-center text-gray-200">
                    You are not authorized to access this resource.
                </p>
                {error.response.data && error.response.data.detail && (
                    <p className="text-center text-gray-200">
                        {error.response.data.detail}
                    </p>
                )}
            </GenericErrorHandler>
        );
    },
    403: function Error403({ error }) {
        return (
            <GenericErrorHandler title="Forbidden">
                <p className="mt-6 text-center text-gray-200">
                    You are not allowed to access this resource.
                </p>
                {error.response.data && error.response.data.detail && (
                    <p className="text-center text-gray-200">
                        {error.response.data.detail}
                    </p>
                )}
            </GenericErrorHandler>
        );
    },
    404: function Error404({ error }) {
        return (
            <GenericErrorHandler title="Not Found">
                <p className="mt-6 text-center text-gray-200">
                    The resource is not found or you have no access to it.
                </p>
                {error.response.data && error.response.data.detail && (
                    <p className="text-center text-gray-200">
                        {error.response.data.detail}
                    </p>
                )}
            </GenericErrorHandler>
        );
    },
    429: function Error429({ error }) {
        const retry_after_header = error.response.headers["retry-after"];
        useEffect(() => {
            if (!retry_after_header) return;
            const id = setTimeout(
                () => window.location.reload(),
                +retry_after_header + 2000
            );
            return () => clearTimeout(id);
        }, [retry_after_header]);
        return (
            <GenericErrorHandler title="Too Many Requests" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Your network is sending too many requests!
                </p>
                <p className="text-center text-gray-200">
                    {retry_after_header
                        ? `This page will refresh after ${
                              Math.floor(retry_after_header / 1000) + 2
                          } seconds...`
                        : "Your access has been banned. Please contact support."}
                </p>
            </GenericErrorHandler>
        );
    },
    503: function Error503({ error }) {
        window.location.reload();
        return (
            <GenericErrorHandler title="Too Many Requests" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Temporarily unavailable
                </p>
                <p className="text-center text-gray-200">
                    Your browser will automatically refresh.
                </p>
            </GenericErrorHandler>
        );
    },
    fallback: function ErrorFallback({ error }) {
        return (
            <GenericErrorHandler
                title={`${error.response.status}: ${error.response.statusText}`}
                hasSupport={true}
            >
                <p className="mt-6 text-center text-gray-200">
                    Access to this resource failed.
                </p>
                {error.response.data && error.response.data.detail && (
                    <p className="text-center text-gray-200">
                        {typeof error.response.data.detail === "string"
                            ? error.response.data.detail
                            : JSON.stringify(error.response.data.detail)}
                    </p>
                )}
            </GenericErrorHandler>
        );
    },
};

function isNetworkError(error) {
    return error.message === "Network Error";
}

export default function ErrorHandler({ error }) {
    if (error.response) {
        const Handler =
            httpErrors[error.response.status] || httpErrors.fallback;
        return <Handler error={error} />;
    }
    if (isNetworkError(error)) {
        return (
            <GenericErrorHandler title="Network Error" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Failed to reach the server.
                </p>
            </GenericErrorHandler>
        );
    }
    return null;
}
