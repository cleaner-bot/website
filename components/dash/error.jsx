
import { ExternalLink } from "@/components/buttons.jsx";


function GenericErrorHandler({ title, children, hasSupport }) {
    return (
        <div className="px-4 my-20">
            <h1 className="text-4xl font-medium text-center text-rose-400">
                {title}
            </h1>
            {children}
            {hasSupport && <div className="flex justify-center">
                <ExternalLink href="/discord" className="mt-12 w-96">
                    Support (discord)
                </ExternalLink>
            </div>}
        </div>
    )
}

const httpErrors = {
    400: function Error400({ error }) {
        return (
            <GenericErrorHandler title="Bad Request" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Your browser sent an invalid request.
                </p>
                {error.response.data && error.response.data.detail && <p className="text-center text-gray-200">
                    {error.response.data.detail}
                </p>}
            </GenericErrorHandler>
        )
    },
    401: function Error401({ error }) {
        localStorage.removeItem("token");
        return (
            <GenericErrorHandler title="Unauthorized">
                <p className="mt-6 text-center text-gray-200">
                    You are not authorization to access this ressource.
                </p>
                {error.response.data && error.response.data.detail && <p className="text-center text-gray-200">
                    {error.response.data.detail}
                </p>}
            </GenericErrorHandler>
        )
    },
    403: function Error403({ error }) {
        return (
            <GenericErrorHandler title="Forbidden">
                <p className="mt-6 text-center text-gray-200">
                    You are not allowed to access this ressource.
                </p>
                {error.response.data && error.response.data.detail && <p className="text-center text-gray-200">
                    {error.response.data.detail}
                </p>}
            </GenericErrorHandler>
        )
    },
    404: function Error404({ error }) {
        return (
            <GenericErrorHandler title="Not Found">
                <p className="mt-6 text-center text-gray-200">
                    The ressource is not found or you have no access to it.
                </p>
                {error.response.data && error.response.data.detail && <p className="text-center text-gray-200">
                    {error.response.data.detail}
                </p>}
            </GenericErrorHandler>
        )
    },
    429: function Error429({ error }) {
        const retry_after_header = error.response.headers["retry-after"];
        return (
            <GenericErrorHandler title="Too Many Requests" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Your network is sending too many requests!
                </p>
                <p className="text-center text-gray-200">
                    {retry_after_header ? `Please wait ${Math.floor(retry_after_header / 1000) + 2} seconds...` : "Your access has been banned. Please contact support."}
                </p>
            </GenericErrorHandler>
        )
    },
    fallback: function ErrorFallback({ error }) {
        return (
            <GenericErrorHandler title={`${error.response.status}: ${error.response.statusText}`} hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Access to this ressource failed.
                </p>
                {error.response.data && error.response.data.detail && <p className="text-center text-gray-200">
                    {error.response.data.detail}
                </p>}
            </GenericErrorHandler>
        )
    }
}

function isNetworkError(error) {
    return error.message === "Network Error";
}


export default function ErrorHandler({ error }) {
    if(error.response) {
        const Handler = httpErrors[error.response.status] || httpErrors.fallback;
        return <Handler error={error} />
    }
    if(isNetworkError(error)) {
        return (
            <GenericErrorHandler title="Network Error" hasSupport={true}>
                <p className="mt-6 text-center text-gray-200">
                    Failed to reach the server.
                </p>
            </GenericErrorHandler>
        )
    }
    return null;
}
