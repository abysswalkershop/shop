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
} from "@react-email/components"

type DeliveryCreatedEmailProps = {
    order_id: string
    delivery_date?: string | Date
    delivery_time?: string | Date
    customer_name?: string
    delivery_address?: string
}

function DeliveryCreatedEmailComponent({
    order_id,
    delivery_date,
    delivery_time,
    customer_name,
    delivery_address
}: DeliveryCreatedEmailProps) {
    const formatDate = (date: string | Date | undefined) => {
        if (!date) return undefined
        const dateObj = typeof date === 'string' ? new Date(date) : date
        return dateObj.toLocaleDateString()
    }

    const formatTime = (date: string | Date | undefined) => {
        if (!date) return undefined
        const dateObj = typeof date === 'string' ? new Date(date) : date
        return dateObj.toLocaleTimeString()
    }

    const formattedDate = formatDate(delivery_date)
    const formattedTime = formatTime(delivery_time)

    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your order has been delivered!</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Delivery Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Your Order Has Been Delivered!
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            Your package has been successfully delivered.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer_name || 'there'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Excellent news! Your order <strong>#{order_id}</strong> has been successfully delivered.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Delivery Details:</Text>
                            <Text className="text-gray-600 text-sm m-0">
                                <strong>Order ID:</strong> #{order_id}
                            </Text>
                            {formattedDate && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Delivery Date:</strong> {formattedDate}
                                </Text>
                            )}
                            {formattedTime && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Delivery Time:</strong> {formattedTime}
                                </Text>
                            )}
                            {delivery_address && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Delivered To:</strong> {delivery_address}
                                </Text>
                            )}
                        </Section>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We hope you're satisfied with your purchase! If you have any questions or concerns about your order, please don't hesitate to contact our support team at contact@abysswalker.org.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Thank you for choosing ABYSSWALKER for your shopping needs!
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

export const deliveryCreatedEmail = (props: DeliveryCreatedEmailProps) => (
    <DeliveryCreatedEmailComponent {...props} />
)

const mockDelivery = {
    "order_id": "1006",
    "fulfillment_id": "ful_01JSNXDH9BPJWWKVW03B9E9KW8",
    "delivery_date": "2025-06-16T14:30:00.000Z",
    "delivery_time": "2025-06-16T14:30:00.000Z",
    "customer_name": "John Doe",
    "delivery_address": "123 Main Street, Apt 4B, Copenhagen, DK"
}

// @ts-ignore
export default () => <DeliveryCreatedEmailComponent {...mockDelivery} />
