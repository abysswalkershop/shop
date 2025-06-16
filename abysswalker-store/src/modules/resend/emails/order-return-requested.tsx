import {
    Text,
    Container,
    Heading,
    Html,
    Section,
    Tailwind,
    Head,
    Preview,
    Body,
    Link,
} from "@react-email/components"

type OrderReturnRequestedEmailProps = {
    order_id: string
    reason?: string
    customer_name?: string
    items_to_return?: string[]
}

function OrderReturnRequestedEmailComponent({
    order_id,
    reason,
    customer_name,
    items_to_return
}: OrderReturnRequestedEmailProps) {
    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Return request for order #{order_id}</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Return Request Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Return Request Received
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            We've received your return request and will process it soon.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer_name || 'Customer'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We've received your return request for order <strong>#{order_id}</strong>.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Return Request Details:</Text>
                            <Text className="text-gray-600 text-sm m-0">
                                <strong>Order ID:</strong> #{order_id}
                            </Text>
                            {reason && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Reason:</strong> {reason}
                                </Text>
                            )}
                            {items_to_return && items_to_return.length > 0 && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Items to Return:</strong> {items_to_return.join(', ')}
                                </Text>
                            )}
                        </Section>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Our team will review your request and get back to you within 24-48 hours with return instructions and a prepaid shipping label.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If you have any questions about your return request, please contact our customer support team at contact@abysswalker.org.
                        </Text>
                    </Container>

                    {/* Footer */}
                    <Section className="bg-gray-50 p-6 mt-10">
                        <Text className="text-center text-gray-500 text-sm">
                            Thank you for choosing ABYSSWALKER.
                        </Text>
                        <Text className="text-center text-gray-400 text-xs mt-4">
                            © {new Date().getFullYear()} EI Abyss Walker. All rights reserved.
                        </Text>
                    </Section>
                </Body>
            </Html>
        </Tailwind>
    )
}

export const orderReturnRequestedEmail = (props: OrderReturnRequestedEmailProps) => (
    <OrderReturnRequestedEmailComponent {...props} />
)

const mockReturnRequest = {
    "order_id": "1009",
    "return_id": "ret_01JSNXDH9BPJWWKVW03B9E9KW9",
    "reason": "Item doesn't fit properly",
    "customer_name": "John Doe",
    "items_to_return": ["Medusa Sweatshirt - Size L", "Medusa T-Shirt - Size M"]
}

// @ts-ignore
export default () => <OrderReturnRequestedEmailComponent {...mockReturnRequest} />
