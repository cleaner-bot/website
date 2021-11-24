
import Head from "next/head";


export default function MetaTags({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://cdn.discordapp.com/avatars/823533449717481492/64e20328c02c26f8da22e43b17f2d0db.png?size=256" />
            <meta property="og:color" content="#6366F1" />
            <meta name="twitter:card" content="summary" />
        </Head>
    )
}
