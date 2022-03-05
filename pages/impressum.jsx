
import Link from "next/link";
import { InternalLink } from "@/components/buttons.jsx";

import MetaTags from "@/components/metatags.jsx";


export default function Privacy() {
    return (
        <div className="--container">
            <article>
                <MetaTags
                    title="The Cleaner - Impressum"
                    description="Impressum for The Cleaner."
                />
                <h1>
                    Impressum
                </h1>
                <p>
                    Applicable for the imprint is German law.
                </p>
                <h2>
                    Copyright
                </h2>
                <p>
                    All rights reserved. Copies of any kind are only allowed with written consent by the owner.
                </p>
                <h2>
                    Liability
                </h2>
                <p>
                    The contents of our pages were created with great care. However, we cannot accept any liability for the correctness, completeness and topicality of the content. As a service provider, we are responsible for our own content on these pages in accordance with general law in accordance with Section 7 (1) of the German Telemedia Act. According to §§ 8 to 10 TMG, as a service provider, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information according to general laws remain unaffected. However, liability in this regard is only possible from the point in time at which we become aware of a specific legal violation. As soon as we become aware of such legal violations, we will remove this content immediately.
                </p>
                <h2>
                    Liability for links
                </h2>
                <p>
                    Our offer contains links to external third-party websites over whose content we have no influence. We can therefore not accept any liability for this third-party content. The respective provider or operator of the website is always responsible for the content of the linked websites. The linked websites were checked for possible legal violations at the time of linking. No illegal content was found at the time the link was created. However, permanent monitoring of the content of the linked pages is unreasonable without concrete evidence of a violation of the law. As soon as we become aware of legal violations, we will remove such links immediately.
                </p>
                <h2>
                    Copyright (2)
                </h2>
                <p>
                    The content and works on these pages created by the website operator are subject to German copyright law. The duplication, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this website are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are observed. In particular contents of third parties are marked as such. If you should nevertheless become aware of a copyright infringement, we ask that you notify us accordingly. As soon as we become aware of legal violations, we will remove such content immediately.
                </p>
                <h2>
                    Privacy notice
                </h2>
                <p>
                    You can find our current <Link href="/privacy"><a>privacy policy here</a></Link>.
                </p>
            </article>
            
            <InternalLink href="/" className="mt-2 w-80">
                Back to the Homepage
            </InternalLink>
        </div>
    )
}
