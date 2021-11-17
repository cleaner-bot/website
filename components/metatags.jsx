
import Head from "next/head";


export default function MetaTags({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property="og:description" content={description} />
            <meta name="description" content={description} />
            <meta name="theme-color" content="#6366F1" />
        </Head>
    )
}
