import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

import MetaTags from "@/components/metatags.jsx";
import { InternalLink, ExternalLink } from "@/components/buttons.jsx";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";
import { Features, ReducedFeatures } from "@/components/features.jsx";
import data from "@/lib/data";
import { getSiPrefixedNumber } from "@/lib/si";


export default function Home() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <MetaTags
                title="The Cleaner - Keeping your servers clean"
                description="A bot built for keeping servers clean. Start protecting your server with The Cleaner now!"
            />
            <div className="--container">
                <Header />
                <Hero />
            </div>
            <div className="py-20 my-20 border-t border-b bg-gray-750 border-gray-550">
                <div className="--container">
                    <FeatureSection />
                </div>
            </div>
            <div className="--container">
                <StatsSection />
            </div>
            <div className="py-20 my-20 border-t border-b bg-gray-750 border-gray-550">
                <div className="!max-w-5xl --container">
                    <TestimonialSection />
                </div>
            </div>
            <div className="--container">
                <CTASection />
                <div className="pb-8 border-t border-gray-550" />
                <Footer />
            </div>
        </>
    );
}

function Hero() {
    return (
        <>
            <h2 className="mt-20 text-5xl font-extrabold leading-10 text-center md:text-left">
                Keep your server clean
            </h2>
            <p className="mt-6 text-gray-100">
                The Cleaner helps you keep your server clean and safe while you
                are away.
            </p>
            <p>
                Fully automated state-of-the-art security for your server in
                bundled into an all-in-one package to let you sleep.
            </p>
            <div className="flex items-center justify-center w-full gap-4 mt-12 md:w-1/2 md:max-w-xl">
                <InternalLink href="/dash" className="w-full">
                    Dashboard
                </InternalLink>
                <ExternalLink
                    href="https://docs.cleanerbot.xyz"
                    color="--btn-neutral"
                    style="--btn-0"
                    className="!hidden md:!flex"
                >
                    Documentation
                </ExternalLink>
            </div>
        </>
    );
}

function FeatureSection() {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            <ReducedFeatures withAos={true} />
            <button
                className="mx-auto mt-20 --btn --btn-0 --btn-neutral"
                onClick={() => {
                    setShowMore(!showMore);
                }}
            >
                Show {showMore ? "less" : "more"} features
                {showMore ? (
                    <ChevronUp className="ml-2" />
                ) : (
                    <ChevronDown className="ml-2" />
                )}
            </button>
            {showMore && (
                <div className="mt-20">
                    <Features withAos={true} />
                </div>
            )}
        </>
    );
}

function StatsSection() {
    return (
        <div className="grid gap-y-4 md:divide-x sm:grid-cols-2 md:grid-cols-4 divide-gray-550" data-aos="fade-up">
            <Stat name="Servers" count={data.guilds} />
            <Stat name="Users" count={data.users} />
            <Stat name="Bans" count={data.bans} />
            <Stat name="Deleted messages" count={data.messages} />
        </div>
    )
}

function Stat({ name, count }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">
                {getSiPrefixedNumber(count)}+
            </span>
            <span className="text-gray-200">
                {name}
            </span>
        </div>
    )
}

function TestimonialSection() {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <h2 className="pb-10 text-3xl font-bold text-center lg:col-span-2">
                See what our customers say
            </h2>
            <Testimonial
                guildName="Leo Laboratories"
                guildIcon=""
                author="SoraDev#1337"
                authorIcon=""
                authorRole="Owner"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.
            </Testimonial>
            <Testimonial
                guildName="The Cleaner | Cleaning Utensils"
                guildIcon=""
                author="SoraDev#1337"
                authorIcon=""
                authorRole="Owner"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.
            </Testimonial>
        </div>
    );
}

function Testimonial({ guildName, guildIcon, author, authorIcon, authorRole, children }) {
    return (
        <div className="flex flex-col items-center justify-center gap-6" data-aos="fade-up">
            <div className="flex items-center gap-8 text-xl font-semibold text-indigo-200">
                {guildIcon && <Image src={guildIcon} className="w-10 h-10" />}
                {guildName}
            </div>
            <p className="text-center text-gray-200">
                &ldquo;{children}&rdquo;
            </p>
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    {authorIcon && <Image src={authorIcon} className="w-10 h-10" />}
                    {author}
                </div>
                <svg className="hidden w-5 h-5 mx-1 text-indigo-200 lg:block" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20z" />
                </svg>
                <span className="text-gray-300">
                    {authorRole}, {guildName}
                </span>
            </div>
        </div>
    )
}

function CTASection() {
    return (
        <div className="my-40 --container" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-center sm:text-5xl md:text-6xl">
                Try <span className="text-indigo-200">The Cleaner</span> now
            </h2>
            <InternalLink href="/dash" className="mx-auto max-w-[27rem] mt-6 sm:mt-12">
                Dashboard
            </InternalLink>
        </div>
    );
}
