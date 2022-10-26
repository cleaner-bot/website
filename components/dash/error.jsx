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
                        Support (Discord)
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
                    You are sending too many requests!
                </p>
                <p className="text-center text-gray-200">
                    Your access has been temporarily restricted.
                </p>
                <p className="text-center text-gray-200">
                    Please reload the page or contact support.
                </p>
            </GenericErrorHandler>
        );
    },
    503: function Error503({ error }) {
        setTimeout(() => window.location.reload(), 10000);
        return (
            <GenericErrorHandler
                title="Temporarily unavailable"
                hasSupport={true}
            >
                <p className="mt-6 text-center text-gray-200">
                    Service temporarily unvailable
                </p>
                <p className="text-center text-gray-200">
                    Your browser will automatically refresh in a few seconds.
                </p>
            </GenericErrorHandler>
        );
    },
    fallback: function ErrorFallback({ error }) {
        return (
            <GenericErrorHandler
                title={`HTTP Error ${error.response.status}`}
                hasSupport={true}
            >
                {error.response.data && error.response.data.detail ? (
                    <p className="mt-6 text-center text-gray-200">
                        {typeof error.response.data.detail === "string"
                            ? error.response.data.detail
                            : JSON.stringify(error.response.data.detail)}
                    </p>
                ) : (
                    <p className="mt-6 text-center text-gray-200">
                        Access to this resource failed.
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
    if (error.response && error.response.status !== 0) {
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
                <p className="mt-6 text-center text-gray-200">
                    Either our server is down, or our security systems blocked
                    your request.
                </p>
                <p className="mt-6 text-center text-gray-200">
                    Please reload the page or contact support.
                </p>
            </GenericErrorHandler>
        );
    }
    return (
        <GenericErrorHandler title="Unhandled error" hasSupport={true}>
            <p className="mt-6 text-center text-gray-200">{error.message}</p>
        </GenericErrorHandler>
    );
}
