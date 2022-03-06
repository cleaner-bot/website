
import { Pro } from "@/components/featurelist.jsx";
import Image from "@/components/image.jsx";

const features = [
    {
        name: "Automatic Raid Prevention",
        description: <>
            <p>
                Automatically detects raids and deploys on-the-fly rules to detect it.
            </p>
            <p>
                Automatically chooses the best Discord feature combat the spam. (timeout, kick, ban, etc)
            </p>
        </>,
        points: [
            "Detection within seconds.",
            "Automatically switches to banning if a large raid is detected.",
            "Automatic adjustments to channel slowmode.",
        ],
        image: {
            src: "/img/home/feature_antiraid.png",
            width: 1260,
            height: 764,
        },
    },
    {
        name: "Phishing Prevention",
        description: "Automatically detects phishing, malware and other malicious content.",
        points: [
            "Huge database of past phishing waves.",
            "Advanced heuristics for previously unknown domains.",
            "Preview embed detection",
        ],
        image: {
            src: "/img/home/feature_phishing.png",
            width: 1221,
            height: 539,
        },
    },
    {
        name: "Challenges",
        description: "Actions taken against violators.",
        points: [
            "Discord Timeout",
            "Discord Account Verification (interactive challenge)",
            "CAPTCHA Verification (interactive challenge)",
        ],
        image: {
            src: "/img/home/feature_captcha.png",
            width: 1250,
            height: 777
        },
    },
    {
        name: "Just... keep it clean",
        description: "Keep a lot of unsocialized content out of your server - by default.",
        points: [
            "Automatic de-hoisting.",
            "Protection against mass pings.",
            "Protection against Discord invites.",
            "Protection against broad pings. (@here and @everyone)",
        ],
        image: {
            src: "/img/home/feature_clean.png",
            width: 1177,
            height: 797,
        },
    }
]

export default function Features() {
    return (
        <div className="space-y-40">
            {features.map((feat, index) => <div className="grid lg:grid-cols-2 gap-y-10" data-aos="fade-up" key={feat.name}>
                <div className="m-auto">
                    <h2 className="mb-4 text-4xl font-bold leading-10">
                        {feat.name}
                    </h2>
                    <div className="text-gray-100">
                        {feat.description}
                    </div>
                    <div className="my-4 space-y-1">
                        {feat.points.map(point => <Pro key={point}>{point}</Pro>)}
                    </div>
                </div>
                <div className={index % 2 === 0 ? "lg:order-first" : ""}>
                    <Image className="w-full" valt="" {...feat.image} />
                </div>
            </div>)}
        </div>
    )
}
