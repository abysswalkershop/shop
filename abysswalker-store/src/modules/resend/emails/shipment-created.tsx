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

type ShipmentCreatedEmailProps = {
    order_id: string
    tracking_number?: string
    tracking_url?: string
    carrier?: string
    customer_name?: string
    estimated_delivery?: string
    shipped_at?: string
}

function ShipmentCreatedEmailComponent({
    order_id,
    tracking_number,
    tracking_url,
    carrier,
    customer_name,
    estimated_delivery,
    shipped_at
}: ShipmentCreatedEmailProps) {
    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your order has been shipped!</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Shipment Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Your Order Has Been Shipped!
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            Your order is on its way to you.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer_name || 'there'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Great news! Your order <strong>#{order_id}</strong> has been shipped and is on its way to you.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Shipment Details:</Text>
                            <Text className="text-gray-600 text-sm m-0">
                                <strong>Order ID:</strong> #{order_id}
                            </Text>
                            {tracking_number && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Tracking Number:</strong> {tracking_number}
                                </Text>
                            )}
                            {carrier && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Carrier:</strong> {carrier}
                                </Text>
                            )}
                            {tracking_url && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Tracking URL:</strong> <Link href={tracking_url}>{tracking_url}</Link>
                                </Text>
                            )}
                            {estimated_delivery && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Estimated Delivery:</strong> {estimated_delivery}
                                </Text>
                            )}
                            {shipped_at && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Shipped At:</strong> {new Date(shipped_at).toLocaleDateString()}
                                </Text>
                            )}
                        </Section>

                        {tracking_url && (
                            <Section className="text-center my-6">
                                <Link
                                    href={tracking_url}
                                    className="bg-[#27272a] rounded text-white text-base font-semibold no-underline text-center px-6 py-3 inline-block"
                                >
                                    Track Your Shipment
                                </Link>
                            </Section>
                        )}

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We'll notify you again when your package arrives.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If you have any questions about your shipment, please contact our support team at contact@abysswalker.org.
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

export const shipmentCreatedEmail = (props: ShipmentCreatedEmailProps) => (
    <ShipmentCreatedEmailComponent {...props} />
)

const mockShipment = {
    "order_id": "1005",
    "tracking_number": "1Z999AA1234567890",
    "tracking_url": "https://www.ups.com/track?tracknum=1Z999AA1234567890",
    "carrier": "UPS",
    "customer_name": "John Doe",
    "estimated_delivery": "June 20, 2025"
}

export default () => <ShipmentCreatedEmailComponent {...mockShipment} />
