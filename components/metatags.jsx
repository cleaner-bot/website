
import Head from "next/head";


export default function MetaTags({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://cdn.discordapp.com/avatars/823533449717481492/8f9fa1d877c02711fe00a1c91fc2836d.png?size=256" />
            <meta property="og:color" content="#6366F1" />
            <meta name="twitter:card" content="summary" />
        </Head>
    )
}
