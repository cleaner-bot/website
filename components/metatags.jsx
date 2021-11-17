
import Head from "next/head";


export function MetaTags({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property="description" content={description} />
            <meta property="og:description" content={description} />
        </Head>
    )
}
