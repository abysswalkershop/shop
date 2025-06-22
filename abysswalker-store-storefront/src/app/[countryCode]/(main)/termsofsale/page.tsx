import InteractiveLink from "@modules/common/components/interactive-link";
import Link from "next/link";

export default function TermsOfSalePage() {
    return (
        <div className="text-ui-fg-base max-w-3xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8 text-black rounded-md">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
                Terms of Sale - Abyss Walker
            </h1>
            <hr className="border-gray-300 mb-6" />
            <p className="text-sm text-gray-500 mb-6 text-center">
                <strong>Last Updated:</strong> June 22, 2025
            </p>

            <p className="mb-4 text-black">
                These Terms of Sale ("Terms of Sale") govern the purchase of products
                and services ("Products") from Abyss Walker ("us", "we", or "our")
                through our website at <a href="https://abysswalker.org" className="text-blue-600 hover:underline"
                >https://abysswalker.org</a>. By placing an order with us, you agree to be bound by these Terms of
                Sale. These Terms of Sale are in addition to our <Link href="/tos" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Product Descriptions and Pricing
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                a. Product Information:
            </h3>
            <p className="mb-4 text-black">
                We strive to ensure that all descriptions, images, and prices of
                Products appearing on our website are accurate. However, we do not
                guarantee that the Product descriptions, prices, or other content
                available on the website are entirely accurate, complete, reliable,
                current, or error-free. If a Product offered by us is not as described,
                your sole remedy is to return it in unused condition, as per our <Link href="/returns" className="text-blue-600 hover:underline">Return Policy</Link>.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">b. Pricing:</h3>
            <p className="mb-4 text-black">
                All prices are listed in EUR or USD. Prices are
                subject to change without notice. The price charged for a Product will
                be the price in effect at the time the order is placed and will be set
                out in your order confirmation email. Prices do not include applicable
                sales tax, shipping, or handling charges, which will be added to your
                total at checkout.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                c. Errors in Pricing:
            </h3>
            <p className="mb-6 text-black">
                In the event a Product is listed at an incorrect price due to
                typographical error or error in pricing information received from our
                suppliers, we shall have the right to refuse or cancel any orders placed
                for Product listed at the incorrect price. We shall have the right to
                refuse or cancel any such orders whether or not the order has been
                confirmed and your credit card charged. If your credit card has already
                been charged for the purchase and your order is cancelled, we shall
                issue a credit to your credit card account in the amount of the
                incorrect price.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. Order Acceptance
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                a. Order Confirmation:
            </h3>
            <p className="mb-4 text-black">
                Your receipt of an electronic or other form of order confirmation does
                not signify our acceptance of your order, nor does it constitute
                confirmation of our offer to sell. We reserve the right at any time
                after receipt of your order to accept or decline your order for any
                reason.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">b. Verification:</h3>
            <p className="mb-6 text-black">
                We may require additional verifications or information before accepting
                any order.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                3. Payment Terms
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                a. Payment Methods:
            </h3>
            <p className="mb-4 text-black">
                We accept payment via <strong>Visa, MasterCard and others</strong>.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                b. Payment Processing:
            </h3>
            <p className="mb-4 text-black">
                Payment is due at the time of order placement. Your card will be charged
                when you place your order. All transactions are subject to validation
                checks and authorization by the card issuer. If the issuer of your
                payment card refuses to authorize payment to us, we will not be liable
                for any delay or non-delivery.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">c. Security:</h3>
            <p className="mb-6 text-black">
                For your security, your billing name and address must match that of the
                credit card used for payment. We reserve the right to cancel any order
                that does not meet these criteria.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. Shipping and Delivery
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                a. Shipping Methods:
            </h3>
            <p className="mb-4 text-black">
                We ship Products via <strong>local postal services</strong>.
                Available shipping methods and costs will be displayed at checkout.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                b. Shipping Times:
            </h3>
            <p className="mb-4 text-black">
                Estimated shipping times are provided for your convenience but are not
                guaranteed. Actual delivery times may vary due to factors beyond our
                control, including weather, carrier delays, and customs processing.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                c. Shipping Address:
            </h3>
            <p className="mb-4 text-black">
                It is your responsibility to provide an accurate and complete shipping
                address. We are not responsible for delays or non-delivery resulting
                from incorrect or incomplete addresses provided by you.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">d. Risk of Loss:</h3>
            <p className="mb-4 text-black">
                All Products purchased from us are made pursuant to a shipment contract.
                This means that the risk of loss and title for these Products pass to you
                upon our delivery to the carrier.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                e. International Shipping:
            </h3>
            <p className="mb-6 text-black">
                For international orders, you are responsible for any applicable customs
                duties, import taxes, fees, or other charges imposed by your country's
                customs office. These charges are not included in the Product price or
                shipping cost and are the sole responsibility of the buyer. Delays due
                to customs processing are beyond our control.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Returns, Refunds, and Exchanges
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">a. Return Policy:</h3>
            <p className="mb-4 text-black">
                Our Return Policy is outlined separately on our website at <Link href="/returns" className="text-blue-600 hover:underline">https://abysswalker.org/returns</Link>. By purchasing Products from us, you agree to our Return Policy.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                b. Conditions for Returns:
            </h3>
            <p className="mb-4 text-black">
                Products must be returned in their original condition, unused, unwashed,
                and with all tags attached, within <strong>14 days </strong>
                of delivery. (Exclusions apply)
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">c. Refunds:</h3>
            <p className="mb-4 text-black">
                Refunds will be processed according to our Return Policy. Shipping costs
                are generally non-refundable.
            </p>
            <h3 className="text-xl font-medium mb-2 text-gray-700">d. Exchanges:</h3>
            <p className="mb-6 text-black">
                Exchanges are subject to Product availability and the terms of our
                Return Policy.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Product Warranty and Disclaimer
            </h2>
            <h3 className="text-xl font-medium mb-2 text-gray-700">
                a. Limited Warranty:
            </h3>
            <p className="mb-2 text-black">
                We warrant that Products purchased from us will be free from defects in
                material and workmanship for a period of <strong>2 years </strong>
                from the date of purchase. This warranty does not cover:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-black">
                <li>Normal wear and tear.</li>
                <li>
                    Damage caused by misuse, accident, neglect, alteration, or improper
                    care.
                </li>
                <li>
                    Products that have been modified by anyone other than us.
                </li>
            </ul>
            <h3 className="text-xl font-medium mb-2 text-gray-700">b. Disclaimer:</h3>
            <p className="mb-6 font-bold text-red-700">
                EXCEPT AS EXPRESSLY STATED IN THIS SECTION, WE MAKE NO REPRESENTATIONS
                OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF
                THE SITE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED
                ON THIS SITE. TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, WE
                DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED
                TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. Limitation of Liability
            </h2>
            <p className="mb-6 text-black">
                In no event shall EI Abyss Walker, its directors, officers,
                employees, affiliates, agents, contractors, interns, suppliers, service
                providers, or licensors be liable for any injury, loss, claim, or any
                direct, indirect, incidental, punitive, special, or consequential
                damages of any kind, including, without limitation lost profits, lost
                revenue, lost savings, loss of data, replacement costs, or any similar
                damages, whether based in contract, tort (including negligence), strict
                liability or otherwise, arising from your purchase or use of any
                products procured using the service, or for any other claim related in
                any way to your use of the service or any product, including, but not
                limited to, any errors or omissions in any content, or any loss or
                damage of any kind incurred as a result of the use of the service or any
                content (or product) posted, transmitted, or otherwise made available
                via the service, even if advised of their possibility. Because some
                states or jurisdictions do not allow the exclusion or the limitation of
                liability for consequential or incidental damages, in such states or
                jurisdictions, our liability shall be limited to the maximum extent
                permitted by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                8. Governing Law
            </h2>
            <p className="mb-6 text-black">
                These Terms of Sale and any separate agreements whereby we provide you
                Products shall be governed by and construed in accordance with the laws
                of <strong>France</strong>, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                9. Changes to Terms of Sale
            </h2>
            <p className="mb-4 text-black">
                We reserve the right, at our sole discretion, to update, change or
                replace any part of these Terms of Sale by posting updates and changes
                to our website. It is your responsibility to check our website
                periodically for changes. Your continued use of or access to our website
                or the Service following the posting of any changes to these Terms of
                Sale constitutes acceptance of those changes.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Contact Us</h2>
            <p className="mb-2 text-black">If you have any questions about these Terms, please contact us</p><InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
        </div>
    );
}