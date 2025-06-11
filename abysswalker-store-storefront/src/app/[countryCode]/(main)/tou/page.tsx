import InteractiveLink from "@modules/common/components/interactive-link";

export default function TOUPage() {
    return (
        <div className="text-ui-fg-base max-w-3xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
                Terms of Use (TOU) - Abyss Walker
            </h1>
            <hr className="border-gray-300 mb-6" />
            <p className="text-sm text-gray-500 mb-6 text-center">
                <strong>Last Updated:</strong> June 11, 2025
            </p>

            <p className="mb-4">
                These Terms of Use ("TOU") govern your access to and use of the website
                and services provided by Abyss Walker ("we", "us", or "our"). By
                accessing or using our website, you agree to comply with and be bound by
                these TOU.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Your Use of the Website
            </h2>
            <p className="mb-4">
                You agree to use the website only for lawful purposes and in a manner
                that does not infringe the rights of, or restrict or inhibit the use and
                enjoyment of the website by, any third party. Prohibited behavior
                includes harassing or causing distress or inconvenience to any person,
                transmitting obscene or offensive content, or disrupting the normal flow
                of dialogue within our website.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Permitted Use</h2>
            <p className="mb-2">You are permitted to use the website for:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
                <li>Browsing our products and services.</li>
                <li>Making legitimate inquiries and purchases.</li>
                <li>Accessing your account and order history.</li>
                <li>Submitting reviews or comments in accordance with our guidelines.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Prohibited Use</h2>
            <p className="mb-2">You agree not to use the website:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
                <li>
                    In any way that breaches any applicable local, national, or
                    international law or regulation.
                </li>
                <li>
                    In any way that is unlawful or fraudulent, or has any unlawful or
                    fraudulent purpose or effect.
                </li>
                <li>For the purpose of harming or attempting to harm minors in any way.</li>
                <li>
                    To send, knowingly receive, upload, download, use, or re-use any
                    material that does not comply with our content standards.
                </li>
                <li>
                    To transmit, or procure the sending of, any unsolicited or
                    unauthorized advertising or promotional material or any other form of
                    similar solicitation (spam).
                </li>
                <li>
                    To knowingly transmit any data, send or upload any material that
                    contains viruses, Trojan horses, worms, time-bombs, keystroke
                    loggers, spyware, adware, or any other harmful programs or similar
                    computer code designed to adversely affect the operation of any
                    computer software or hardware.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. User-Generated Content
            </h2>
            <p className="mb-2">If you post content on our website (e.g., product reviews, comments), you agree that:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
                <li>
                    Your content will not be illegal, obscene, abusive, threatening,
                    defamatory, invasive of privacy, infringing of intellectual property
                    rights, or otherwise injurious to third parties or objectionable.
                </li>
                <li>
                    You will not impersonate any person or entity or falsely state or
                    otherwise misrepresent your affiliation with a person or entity.
                </li>
                <li>
                    You grant Abyss Walker a non-exclusive, royalty-free, perpetual,
                    irrevocable, and fully sublicensable right to use, reproduce, modify,
                    adapt, publish, translate, create derivative works from, distribute,
                    and display such content throughout the world in any media.
                </li>
                <li>
                    You represent and warrant that you own or otherwise control all of the
                    rights to the content that you post; that the content is accurate;
                    that use of the content you supply does not violate this policy and
                    will not cause injury to any person or entity; and that you will
                    indemnify Abyss Walker for all claims resulting from content you
                    supply.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Disruption of Service
            </h2>
            <p className="mb-2">You shall not:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
                <li>
                    Introduce viruses, trojans, worms, logic bombs, or other material that
                    is malicious or technologically harmful.
                </li>
                <li>
                    Attempt to gain unauthorized access to our site, the server on which
                    our site is stored, or any server, computer, or database connected to
                    our site.
                </li>
                <li>
                    Attack our site via a denial-of-service attack or a distributed
                    denial-of-service attack.
                </li>
            </ul>
            <p className="mb-6">
                By breaching this provision, you may be committing a criminal offense. We
                will report any such breach to the relevant law enforcement authorities
                and we will cooperate with those authorities by disclosing your identity
                to them. In the event of such a breach, your right to use our site will
                cease immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Copyright and Trademarks
            </h2>
            <p className="mb-6">
                All content included on this site, such as text, graphics, logos, button
                icons, images, audio clips, digital downloads, data compilations, and
                software, is the property of Abyss Walker or its content suppliers
                and protected by international copyright laws. The compilation of all
                content on this site is the exclusive property of Abyss Walker, with
                copyright authorship for this collection by Abyss Walker, and
                protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. Changes to the TOU
            </h2>
            <p className="mb-6">
                We may revise these TOU at any time by amending this page. You are
                expected to check this page from time to time to take notice of any
                changes we made, as they are binding on you. Some of the provisions
                contained in these TOU may also be superseded by provisions or notices
                published elsewhere on our site.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Contact Us</h2>
            <p className="mb-2">If you have any concerns about material which appears on our site, please contact us </p><InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
        </div>
    );
}