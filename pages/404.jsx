
import MetaTags from "@/components/metatags.jsx";
import { InternalLink } from "@/components/buttons.jsx";


export default function FourOFour() {
    return (
        <div className="flex items-center justify-center my-10">
            <MetaTags
                title="404 - Not Found"
                description="Not found. Please check your spelling."
            />
            <div>
                <p className="font-extrabold text-center border-b-4 border-indigo-500 text-9xl">
                    404
                </p>
                <p className="mt-2 text-4xl font-bold text-center text-gray-100">
                    Page not found
                </p>
                <InternalLink href="/" className="mt-2">
                    Back to the Homepage
                </InternalLink>
                <InternalLink href="/dash" className="mt-2">
                    Back to the Dashboard
                </InternalLink>
            </div>
        </div>
    )
}
