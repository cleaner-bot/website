
import Link from "next/link";

import MetaTags from "@/components/metatags.jsx";



const articles = [
    { title: "Introducing The Cleaner", preview: "The Cleaner is a Discord Bot that is entirely focused on keeping your server clean...", date: "23/11/2021", id: "20211123-introduction" },
]


export default function Blog() {
    return (
        <div className="-container py-20">
            <MetaTags title="The Cleaner - Blog" description="Blog of The Cleaner!" />
            <h1 className="text-2xl text-gray-200">
                The `The Cleaner` Blog
            </h1>
            <Link href={`/`}>
                <a className="text-gray-200 hover:underline mt-4 block">
                    &larr; Go home
                </a>
            </Link>
            <div className="grid md:grid-cols-2 gap-x-2 gap-y-8 mt-12">
                {articles.map((article, index) => <Article key={article.key} article={article} className={index === 0 ? "md:col-span-2" : ""} />)}
            </div>
        </div>
    )
}

function Article({ article, className }) {
    return (
        <div className={className}>
            <Link href={`/blog/${article.id}`}>
                <a className="text-3xl font-semibold hover:underline">
                    {article.title}
                </a>
            </Link>
            <p className="text-gray-350 mt-6 mb-8">
                {article.date}
            </p>
            <p>
                {article.preview}
            </p>
            <Link href={`/blog/${article.id}`}>
                <a className="text-gray-200 text-sm hover:underline mt-2 block">
                    Continue reading &rarr;
                </a>
            </Link>
        </div>
    )
}
