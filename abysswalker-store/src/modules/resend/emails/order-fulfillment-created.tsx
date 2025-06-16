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

type OrderFulfillmentCreatedEmailProps = {
    order_id: string
    tracking_number?: string
    tracking_url?: string
    fulfillment_provider?: string
    customer_name?: string
    estimated_delivery?: string
}

function OrderFulfillmentCreatedEmailComponent({
    order_id,
    tracking_number,
    tracking_url,
    fulfillment_provider,
    customer_name,
    estimated_delivery
}: OrderFulfillmentCreatedEmailProps) {
    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your order is on its way!</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Fulfillment Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Your Order is Shipping! 📦
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            Your order has been fulfilled and is on its way.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer_name || 'there'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Great news! Your order <strong>#{order_id}</strong> has been fulfilled and is on its way to you.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Fulfillment Details:</Text>
                            <Text className="text-gray-600 text-sm m-0">
                                <strong>Order ID:</strong> #{order_id}
                            </Text>
                            {tracking_number && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Tracking Number:</strong> {tracking_number}
                                </Text>
                            )}
                            {fulfillment_provider && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Carrier:</strong> {fulfillment_provider}
                                </Text>
                            )}
                            {estimated_delivery && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Estimated Delivery:</strong> {estimated_delivery}
                                </Text>
                            )}
                        </Section>

                        {tracking_url && (
                            <Section className="text-center my-6">
                                <Link
                                    href={tracking_url}
                                    className="bg-[#27272a] rounded text-white text-base font-semibold no-underline text-center px-6 py-3 inline-block"
                                >
                                    Track Your Package
                                </Link>
                            </Section>
                        )}

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We'll send you another notification once your package is delivered.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Thank you for choosing ABYSSWALKER!
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

export const orderFulfillmentCreatedEmail = (props: OrderFulfillmentCreatedEmailProps) => (
    <OrderFulfillmentCreatedEmailComponent {...props} />
)

const mockFulfillment = {
    "order_id": "1007",
    "tracking_number": "1Z999AA1234567891",
    "tracking_url": "https://www.ups.com/track?tracknum=1Z999AA1234567891",
    "fulfillment_provider": "UPS",
    "customer_name": "John Doe",
    "estimated_delivery": "June 18, 2025"
}

// @ts-ignore
export default () => <OrderFulfillmentCreatedEmailComponent {...mockFulfillment} />
