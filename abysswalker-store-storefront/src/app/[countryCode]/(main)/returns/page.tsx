import InteractiveLink from "@modules/common/components/interactive-link";

export default function ReturnsPage() {
    return (
        <div className="text-ui-fg-base max-w-3xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Returns & Shipping Policy
            </h1>

            <hr className="border-gray-300 mb-6" />

            <p className="text-sm text-gray-500 mb-6 text-center">
                <strong>Last Updated:</strong> June 11, 2025
            </p>

            <p className="text-gray-700 mb-8">
                Thank you for shopping at <a href="#" className="text-blue-600 hover:underline">Abyss Walker</a>! We strive
                to provide you with the best products and service. Please read our Returns &
                Shipping Policy carefully.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Shipping Policy</h2>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                1.1 Shipping Zones & Costs
            </h3>
            <p className="text-gray-700 mb-4">
                We offer shipping to <span className="font-semibold">select international destinations</span>.
                Shipping costs are calculated at checkout based on the weight, dimensions
                of your order, and your selected shipping method.
            </p>

            <h3 className="text-xl font-medium text-gray-700 mb-3">1.2 Processing Time</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="mb-2">
                    <strong className="font-semibold">Order Processing:</strong> Orders are
                    typically processed within 1-7 business days (Monday-Friday, excluding
                    holidays) after your order is placed.
                </li>
                <li>
                    <strong className="font-semibold">Custom/Personalized Items:</strong> Please
                    allow an additional <span className="font-semibold">7</span> business
                    days for processing of custom or personalized items.
                </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                1.3 Estimated Delivery Times
            </h3>
            <p className="text-gray-700 mb-3">
                Delivery times are estimates and may vary due to unforeseen circumstances
                (e.g., weather delays, carrier issues).
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="mb-2">
                    <strong className="font-semibold">Standard Shipping: </strong>
                    <span className="font-semibold">1</span> -
                    <span className="font-semibold">30</span> business days
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Expedited Shipping: </strong>
                    <span className="font-semibold">1</span> -
                    <span className="font-semibold">30</span> business days
                </li>
                <li>
                    <strong className="font-semibold">International Shipping: </strong>
                    <span className="font-semibold">1</span> -
                    <span className="font-semibold">30</span> business days (Please note:
                    international orders may be subject to customs duties, taxes, and fees
                    levied by the destination country. These charges are the responsibility of
                    the recipient.)
                </li>
                <br />
                <p>We reserve the right to extend the delivery timeframe due to factors out of our control. You will be notified accordingly if this happens.</p>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                1.4 Shipping Confirmation & Tracking
            </h3>
            <p className="text-gray-700 mb-4">
                Once your order has shipped, you will receive a shipping confirmation email
                containing your tracking number(s). You can track the status of your
                shipment through the provided link.
            </p>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                1.5 Shipping Address Accuracy
            </h3>
            <p className="text-gray-700 mb-4">
                Please ensure your shipping address is accurate and complete. We are not
                responsible for orders shipped to incorrectly entered addresses. If a
                package is returned to us due to an incorrect address, you will be
                responsible for the re-shipping fees.
            </p>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                1.6 Lost or Damaged Packages
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-8">
                <li className="mb-2">
                    <strong className="font-semibold">Lost Packages:</strong> If your tracking
                    information shows that your package was delivered but you have not
                    received it, please contact the shipping carrier immediately. After
                    contacting the carrier, please contact us <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink> within <span className="font-semibold">2</span> days
                    of the reported delivery date so we can assist you.
                </li>
                <li>
                    <strong className="font-semibold">Damaged Packages:</strong> If your order
                    arrives damaged, please take photos of the damaged packaging and
                    product(s) and contact us immediately <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
                    Please retain all original packaging and damaged items until further
                    instructions are provided.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Returns & Exchange Policy
            </h2>

            <p className="text-gray-700 mb-4">
                We want you to be completely satisfied with your purchase. If you're not,
                here's how we can help:
            </p>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                2.1 Eligibility for Returns/Exchanges
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="mb-2">
                    <strong className="font-semibold">Return Window:</strong> You have <span className="font-semibold">14</span> days from the date you
                    received your item(s) to initiate a return or exchange.
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Condition of Items:</strong> To be eligible
                    for a return or exchange, your item must be unused, unwashed, in the same
                    condition that you received it, and in its original packaging with all
                    tags attached.
                </li>
                <li>
                    <strong className="font-semibold">Proof of Purchase:</strong> A receipt or
                    proof of purchase is required.
                </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 mb-3">2.2 Non-Returnable Items</h3>
            <p className="text-gray-700 mb-3">
                Certain types of items cannot be returned, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="mb-1">Gift cards</li>
                <li className="mb-1">
                    Intimate or sanitary goods - <em className="italic">Unless faulty</em>
                </li>
                <li className="mb-1">Health and personal care items</li>
                <li className="mb-1">
                    Custom or personalized products (unless there is a defect or error on our
                    part)
                </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                2.3 How to Initiate a Return or Exchange
            </h3>
            <ol className="list-decimal list-inside text-gray-700 mb-4">
                <li className="mb-2">
                    <strong className="font-semibold">Contact Us:</strong> To initiate a return
                    or exchange, please contact us <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink> with
                    your order number and reason for return/exchange.
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Return Authorization:</strong> We will
                    provide you with instructions and a Return Merchandise Authorization (RMA)
                    number if your return is approved.
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Ship Item(s):</strong> Carefully package the
                    item(s) and include the RMA number. You are responsible for paying your
                    own shipping costs for returning your item. Shipping costs are
                    non-refundable. If you receive a refund, the cost of return shipping will
                    be deducted from your refund.
                </li>
                <li>
                    <strong className="font-semibold">Tracking:</strong> We recommend using a
                    trackable shipping service or purchasing shipping insurance for returns,
                    as we cannot guarantee that we will receive your returned item.
                </li>
            </ol>

            <h3 className="text-xl font-medium text-gray-700 mb-3">2.4 Refunds</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="mb-2">
                    <strong className="font-semibold">Inspection:</strong> Once your return is
                    received and inspected, we will send you an email to notify you that we
                    have received your returned item. We will also notify you of the approval
                    or rejection of your refund.
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Approval:</strong> If approved, your refund
                    will be processed, and a credit will automatically be applied to your
                    original method of payment within
                    <span className="font-semibold">7</span> business days.
                </li>
                <li className="mb-2">
                    <strong className="font-semibold">Partial Refunds:</strong> There are certain
                    situations where only partial refunds may be granted:
                    <ul className="list-circle list-inside ml-5 mt-1">
                        <li className="mb-1">
                            Any item not in its original condition, is damaged or missing parts
                            for reasons not due to our error.
                        </li>
                        <li>
                            Any item that is returned more than <span className="font-semibold">14</span> days after delivery.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong className="font-semibold">Late or Missing Refunds:</strong>
                    <ul className="list-circle list-inside ml-5 mt-1">
                        <li className="mb-1">
                            If you haven't received a refund yet, first check your bank account
                            again.
                        </li>
                        <li className="mb-1">
                            Then contact your credit card company, it may take some time before
                            your refund is officially posted.
                        </li>
                        <li className="mb-1">
                            Next contact your bank. There is often some processing time before a
                            refund is posted.
                        </li>
                        <li>
                            If you've done all of this and you still have not received your
                            refund, please contact us <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
                        </li>
                    </ul>
                </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-700 mb-3">2.5 Exchanges</h3>
            <div className="text-gray-700 mb-4">
                If you need to exchange an item for a different size or color, please contact us <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink> or
                follow the return process as described above and place a new order for the desired
                item. This ensures you get the item you want as quickly as possible.
            </div>

            <h3 className="text-xl font-medium text-gray-700 mb-3">
                2.6 Damaged or Defective Items
            </h3>
            <div className="text-gray-700 mb-8">
                If you receive a damaged or defective item, please contact us immediately <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
                with photos of the damage/defect. We will arrange for a replacement or a
                full refund, including shipping costs.
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Contact Us</h2>

            <div className="text-gray-700 mb-4">
                If you have any questions about our Returns & Shipping Policy, please
                contact <InteractiveLink href="/contact" className="inline-flex">here</InteractiveLink>.
            </div>

            <hr className="border-gray-300 mb-6" />

            <p className="text-sm text-gray-500 text-center">
                <strong className="font-semibold">EI Abyss Walker
                </strong> reserves the
                right to modify this Returns & Shipping Policy at any time. Changes and
                clarifications will take effect immediately upon their posting on the
                website.
            </p>
        </div>
    );
}