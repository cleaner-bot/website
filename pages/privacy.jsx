
import Link from "next/link";

import MetaTags from "@/components/metatags.jsx";
import { InternalLink } from "@/components/buttons.jsx";


export default function Privacy() {
    return (
        <div className="--container">
            <article>
                <MetaTags
                    title="The Cleaner - Privacy Policy"
                    description="Privacy Policy for The Cleaner."
                />
                <h1>
                    Privacy Policy
                </h1>

                <h2>
                    Introduction
                </h2>

                <p>
                    With the following privacy policy we would like to explain to you which types of your personal data (hereinafter also referred to as "data" for short) we process for which purposes and to what extent.
                    This privacy policy applies to all processing of personal data carried out by us through the use of our application „The Cleaner“ and the associated systems (hereinafter collectively referred to as "Service").
                </p>
                <p>
                    Last uptdated: 1. December 2021
                </p>

                <h2>
                    Overview of the data processing
                </h2>
                <p>
                    The following overview summarizes the types of data processed and the purposes of their processing and refers to the data subjects.
                </p>
                <p>
                    „The Cleaner“ receives chat messages of Discord channels that use our Service and filters unwanted content. (i.e. spam or phishing).
                    „The Cleaner“ deletes messages in the Discord channels, if the content is unwanted according to the <Link href="https://cleaner.leodev.xyz/docs/rules/"><a>filter rules</a></Link>.
                    Additionally, users that repeatedly violate the filter rules, will be prevented from participating in the Discord channels.
                </p>
                <p>
                    Users have to receive an invitation to the Discord channels first (closed user group).
                    A Discord Account has to be created under the <Link href="https://discord.com/privacy"><a>Privacy Policy of Discord</a></Link> first for this.
                </p>

                <h3>
                    Categories of processed data
                </h3>
                <p>
                    Data categories are the message content and Discord user information.
                    User information are:
                </p>

                <ul>
                    <li>unique user id (number).</li>
                    <li>name or pseudonym.</li>
                    <li>date of the account creation.</li>
                    <li>Server join time.</li>
                    <li>user flags</li>
                </ul>
                <p>
                    For details, refer to <Link href="https://discord.com/developers/docs/resources/user#user-object"><a>https://discord.com/developers/docs/resources/user#user-object</a></Link>.
                </p>
                
                <h3>
                    Categories of affected users
                </h3>
                <ul>
                    <li>
                        Users of Discord.
                    </li>
                </ul>

                <h3>
                    Purposes of processing
                </h3>
                <p>
                    Providing our service „The Cleaner“.
                </p>

                <h3>
                    Applicable legal bases
                </h3>
                <p>
                Below you will find an overview of the legal basis, the GDPR, on the basis of which we process personal data. Please note that in addition to the provisions of the GDPR, national data protection requirements may apply in your or our country of residence or domicile. If more specific legal bases are relevant in individual cases, we will inform you of this in the privacy policy.
                </p>
                <ul>
                    <li>
                        <strong>
                            Consent (Art. 6 Para. 1 S. 1 lit. a. GDPR)
                        </strong>{" "}
                        - The data subject has given their consent to the processing of their personal data for a specific purpose or for several specific purposes.
                    </li>
                    <li>
                        <strong>
                            Fulfillment of the contract and pre-contractual inquiries (Art. 6 Para. 1 S. 1 lit. b. GDPR)
                        </strong>{" "}
                        - Processing is necessary for the performance of a contract to which the data subject is a party, or for the implementation of pre-contractual measures that are carried out at the request of the data subject.
                    </li>
                    <li>
                        <strong>
                            Legitimate interests (Art. 6 Para. 1 S. 1 lit. f. GDPR)
                        </strong>{" "}
                        - The processing is necessary to safeguard the legitimate interests of the person responsible or a third party, unless the interests or fundamental rights and freedoms of the person concerned, which require the protection of personal data, outweigh the above.
                    </li>
                </ul>
                <p>
                    <strong>
                        National data protection regulations in Germany:
                    </strong>{" "}
                    In addition to the data protection regulations of the General Data Protection Regulation, national data protection regulations apply in Germany. This includes in particular the law on the protection against misuse of personal data during data processing (Federal Data Protection Act - BDSG). In particular, the BDSG contains special regulations on the right to information, the right to erasure, the right to object, the processing of special categories of personal data, processing for other purposes and transmission as well as automated decision-making in individual cases, including profiling. Furthermore, it regulates data processing for the purposes of the employment relationship (Section 26 BDSG), in particular with regard to the establishment, implementation or termination of employment relationships and the consent of employees. In addition, the state data protection laws of the individual federal states can apply.
                </p>

                <h2>
                    Security measures
                </h2>
                <p>                    
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
                </p>

                <h2>
                    Deletion of data
                </h2>
                <p>
                    The data processed by us will be deleted in accordance with the legal requirements as soon as the consent permitted for processing is revoked or other permissions are no longer applicable (e.g. if the purpose of processing this data is no longer applicable or is not required for the purpose).
                </p>
                <p>
                    If the data are not deleted because they are required for other legally permissible purposes, their processing will be limited to these purposes. This means that the data is blocked and not processed for other purposes. This applies, for example, to data that must be stored for commercial or tax law reasons or whose storage is necessary to assert, exercise or defend legal claims or to protect the rights of another natural or legal person.
                </p>
                <p>
                Our data protection information may also contain further information on the storage and deletion of data, which have priority for the respective processing.
                </p>

                <ul>
                    <li>
                        <strong>Messages:</strong>{" "}
                        Generally messages are only kept for a minute but in special cases can be stored for up to 10 minutes. (anonymized messages may be kept for longer)
                    </li>
                    <li>
                        <strong>Join information:</strong>{" "}
                        We store anonymized join information for up to 10 minutes.
                    </li>
                    <li>
                        <strong>Error logs:</strong>{" "}
                        Error logs are kept for up to 2 weeks and then automatically deleted.
                    </li>
                </ul>

                <h2>
                    Change and update of this privacy policy
                </h2>
                <p>
                    We ask you to inform yourself regularly about the content of our privacy policy. We will adapt this privacy policy as soon as the changes to the data processing carried out by us make this necessary. We will inform you as soon as the changes require your cooperation (e.g. consent) or other individual notification.
                </p>
                <p>
                    If we provide addresses and contact information of companies and organizations in this privacy policy, please note that the addresses may change over time and ask you to check the information before contacting them.
                </p>

                <h2>
                    Responsible Person
                </h2>
                <p>
                    „The Cleaner“ is represented by <Link href="https://pointhope.de"><a>pointhope.de</a></Link>.
                    Their contact information can be found <Link href="https://pointhope.de/en/impressum.htm"><a>here</a></Link>.
                </p>

                <h2>
                    Rights of data subjects
                </h2>
                <p>
                    As a data subject, you have various rights under the GDPR, which arise in particular from Art. 15 to 21 GDPR:
                </p>
                <ul>
                    <li>
                        <strong>Right to object:</strong>{" "}
                        You have the right, for reasons that arise from your particular situation, to object at any time to the processing of your personal data, which is based on Art. 6 Para. 1 lit. e or f GDPR; this also applies to profiling based on these provisions. If the personal data relating to you are processed in order to operate direct mail, you have the right to object at any time to the processing of the personal data relating to you for the purpose of such advertising; this also applies to profiling insofar as it is associated with such direct mail.
                    </li>
                    <li>
                        <strong>Right to withdraw consent:</strong>{" "}
                        You have the right to withdraw your consent at any time.
                    </li>
                    <li>
                        <strong>Right to requesting information:</strong>
                        You have the right to request confirmation as to whether the data in question is being processed and to request information about this data as well as further information and a copy of the data in accordance with the legal requirements.
                    </li>
                    <li>
                        <strong>Right to rectification:</strong>
                        In accordance with the legal requirements, you have the right to request the completion of the data relating to you or the correction of incorrect data relating to you.
                    </li>
                    <li>
                        <strong>Right to erasure and restriction of processing:</strong>
                        In accordance with the legal requirements, you have the right to request that the data relating to you be deleted immediately or, alternatively, to request a restriction on the processing of the data in accordance with the legal requirements.
                    </li>
                    <li>
                        <strong>Right to data portability:</strong>
                        You have the right to receive data relating to you that you have provided to us in accordance with the legal requirements in a structured, common and machine-readable format or to request that it be transmitted to another person responsible.
                    </li>
                    <li>
                        <strong>Complaint to the supervisory authority:</strong>
                        Without prejudice to any other administrative or judicial remedy, you have the right to lodge a complaint with a supervisory authority, in particular in the member state of your habitual residence, your place of work or the place of the alleged violation, if you are of the opinion that the processing of your personal data violates the requirements of the GDPR.
                    </li>
                </ul>

                <p>Responsible supervisory authority for us:</p>
                <p>
                    Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
                    Postfach 20 04 44<br />
                    40102 Düsseldorf<br />
                    <br />
                    Tel.: 0211/38424-0<br />
                    Fax: 0211/38424-999<br />
                    E-Mail: poststelle@ldi.nrw.de
                </p>
            </article>
            <InternalLink href="/" className="w-full my-32 md:w-80">
                Back to the Homepage
            </InternalLink>
        </div>
    )
}
