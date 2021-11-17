import { ArrowLeftIcon } from "@heroicons/react/outline";

import MetaTags from "@/components/metatags.jsx";


export default function FourOFour() {
    return (
        <div className="flex justify-center items-center my-10">
            <MetaTags
                title="404 - Not Found"
                description="Not found. Please check your spelling."
            />
            <div>
                <p className="text-9xl font-extrabold border-b-4 border-indigo-500 text-center">
                    404
                </p>
                <p className="text-4xl font-bold text-gray-100 text-center mt-2">
                    Page not found
                </p>
                <button className="-anim -btn w-full bg-blue-580 hover:bg-blue-630 mt-8" onClick={() => {
                    window.history.back();
                }}>
                    <ArrowLeftIcon className="w-6 h-6 mr-2" />
                    Go back
                </button>
            </div>
        </div>
    )
}
