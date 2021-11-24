import Link from "next/link";

import MetaTags from "@/components/metatags.jsx";


export function Article({ title, date, children }) {
    return (
        <div className="mx-auto px-4 w-full lg:w-[1024px]">
            <MetaTags title={title} description="Read the blog on the website!" />
            <h1 className="text-2xl lg:text-6xl font-bold text-center">
                {title}
            </h1>
            <p className="mt-2 text-gray-350 text-center">
                Published on {date}
            </p>
            <article className="py-8">
                {children}
                <Link href="/blog/">
                    <a className="mt-20 block">
                        Read other articles &rarr;
                    </a>
                </Link>
            </article>
        </div>
    )
}
