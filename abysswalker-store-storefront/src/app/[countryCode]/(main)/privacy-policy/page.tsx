export default function PrivacyPolicyPage() {
    return (
        <div className="text-ui-fg-base max-w-4xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8 rounded-md text-black">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
            <hr className="border-gray-300 mb-6" />
            <p className="text-sm text-gray-500 mb-6 text-center"><strong>Last Updated:</strong> June 10, 2025</p>

            <p className="mb-4 text-black">
                Welcome to EI Abyss Walker! This Privacy Policy describes how EI Abyss Walker ("we," "us," or "our") collects, uses, and discloses your information when you visit, use, or make a purchase from our online shop (the "Service").
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4 text-black">
                We collect various types of information in connection with the Service, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                    <strong className="text-gray-900">Personal Information You Provide:</strong>
                    <ul className="list-circle pl-6 mt-1">
                        <li className="mb-1 text-black">
                            <strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Order Information:</strong> When you make a purchase, we collect your name, billing address, shipping address, email address, and phone number.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Payment Information:</strong> When you make a purchase, your payment details (e.g., credit card number, expiration date, CVV) are directly submitted to our third-party payment processor, Stripe. <strong className="text-red-600">We do not directly collect, store, or process your full payment card details on our servers.</strong> Stripe processes this information securely on our behalf. Please refer to Stripe's Privacy Policy for more information on how they handle your payment data.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Communications:</strong> If you contact us via email or other methods, we may collect the content of your communications and your contact information.
                        </li>
                    </ul>
                </li>
                <li className="mb-2">
                    <strong className="text-gray-900">Information Collected Automatically (via Medusa.js and your browser):</strong>
                    <ul className="list-circle pl-6 mt-1">
                        <li className="mb-1 text-black">
                            <strong>Usage Data:</strong> We may collect basic, anonymous information about how you access and use the Service, such as your IP address (typically truncated or anonymized), browser type, and the pages you visit. This data is used solely for the technical operation of the shop and to improve its functionality.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Cookies:</strong> We use strictly necessary cookies to ensure the proper functioning of our shop, such as maintaining your session, managing your shopping cart, and enabling secure logins. These cookies are essential for you to navigate the website and use its features. We do not use cookies for tracking or advertising purposes. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, but please note that disabling essential cookies may prevent our shop from functioning correctly.
                        </li>
                    </ul>
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. No Third-Party Tracking or Analytics</h2>
            <p className="mb-4">
                <strong className="text-gray-900">We do not use any third-party tracking or analytics providers (e.g., Google Analytics, Meta Pixel, etc.) on our Service.</strong> We are committed to minimizing data collection and respecting your privacy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4 text-black">
                We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-1 text-black">To provide and maintain our Service, including processing your orders and managing your account.</li>
                <li className="mb-1 text-black">To facilitate secure payment processing through Stripe.</li>
                <li className="mb-1 text-black">To communicate with you about your orders, account, or any inquiries you make.</li>
                <li className="mb-1 text-black">To improve the technical performance and functionality of our Service.</li>
                <li className="mb-1 text-black">To detect, prevent, and address technical issues or fraudulent activity.</li>
                <li className="mb-1 text-black">To comply with legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. How We Share Your Information</h2>
            <p className="mb-4 text-black">
                We may share your information with third parties in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-2 text-black">
                    <strong className="text-gray-900">Service Providers:</strong> We share necessary information with essential third-party vendors who perform services directly required for the operation of our shop. This includes:
                    <ul className="list-circle pl-6 mt-1">
                        <li className="mb-1 text-black">
                            <strong>Stripe:</strong> For payment processing. Your payment information is securely transmitted directly to Stripe.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Shipping Providers:</strong> To fulfill your orders and deliver products to you.
                        </li>
                        <li className="mb-1 text-black">
                            <strong>Website Hosting:</strong> Hetzner, for hosting our shop's infrastructure. (While we do not directly share any data with Hetzner, they provide the servers and infrastructure that host our Service, so it is worth mentioning.)
                        </li>
                    </ul>
                    These service providers are contractually obligated to protect your information and only use it for the specific purposes for which it was disclosed.
                </li>
                <li className="mb-1 text-black">
                    <strong className="text-gray-900">Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                </li>
                <li className="mb-1 text-black">
                    <strong className="text-gray-900">Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
                </li>
                <li className="mb-1 text-black">
                    <strong className="text-gray-900">With Your Consent:</strong> We may share your information with your consent or at your direction.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Data Storage and Security (Hetzner & Stripe)</h2>
            <p className="mb-4 text-black">
                Our online shop is hosted on Hetzner servers. Hetzner provides robust infrastructure and security measures to protect the data stored on their systems.
            </p>
            <p className="mb-4 text-black">
                For payment processing, we rely on Stripe's secure infrastructure. Stripe is a PCI DSS certified payment processor, meaning they adhere to strict security standards for handling payment card information.
            </p>
            <p className="mb-4 text-black">
                While we strive to use commercially acceptable means to protect your Personal Information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Your Choices and Rights</h2>
            <p className="mb-4 text-black">
                Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li className="mb-1 text-black">Access, update, or delete your personal information.</li>
                <li className="mb-1 text-black">Object to the processing of your personal information.</li>
                <li className="mb-1 text-black">Request that we restrict the processing of your personal information.</li>
                <li className="mb-1 text-black">Withdraw your consent at any time where we rely on your consent to process your personal information.</li>
                <li className="mb-1 text-black">Receive a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
            </ul>
            <p className="mb-4 text-black">
                To exercise these rights, please contact us using the contact details provided below.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-4 text-black">
                Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Children's Privacy</h2>
            <p className="mb-4 text-black">
                Our Service is not intended for individuals under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-black">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
            <p className="mb-4 text-black">
                If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="mb-1 text-black"><strong>EI Abyss Walker</strong></p>
            <p className="mb-1 text-black">Email: <a href="mailto:contact@abysswalker.org" className="text-blue-600 hover:underline">contact@abysswalker.org</a></p>
            <p className="text-black">39 rue Victor Hugo 97200 Fort de France, Martinique</p>
        </div>
    );
}