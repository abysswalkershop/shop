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
    Button,
} from "@react-email/components"

type TransferRequestedEmailProps = {
    order?: {
        id: string
        display_id: number
        email: string
        total: number
        currency_code: string
        created_at: string
    }
    storeurl: string,
    transferToken: string
    id: string
}

function TransferRequestedEmailComponent({
    order,
    storeurl,
    transferToken,
    id,
}: TransferRequestedEmailProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const transferConfirmationUrl = `${storeurl}/de/order/${id}/transfer/${transferToken}`

    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Someone is trying to transfer your order #{order?.display_id ? String(order.display_id) : ''}</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Content */}
                    <Container className="px-6 py-8">
                        <Heading className="text-2xl font-bold text-gray-800 mb-6">
                            Order Transfer Request
                        </Heading>

                        <Text className="text-gray-800 text-base leading-relaxed mb-4">
                            Hi there,
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed mb-4">
                            Someone has requested to transfer your order{order?.display_id ? ` #${order.display_id}` : ''}.
                            If this was you, please click the button below to confirm the transfer.
                        </Text>

                        {order && (
                            <Section className="bg-gray-50 p-4 rounded-lg mb-6">
                                <Text className="text-sm font-semibold text-gray-600 mb-2">Order Details:</Text>
                                <Text className="text-sm text-gray-700 mb-1">
                                    <strong>Order ID:</strong> #{order.display_id}
                                </Text>
                                <Text className="text-sm text-gray-700">
                                    <strong>Order Date:</strong> {formatDate(order.created_at)}
                                </Text>
                            </Section>
                        )}

                        <Section className="text-center mb-6">
                            <Button
                                href={transferConfirmationUrl}
                                className="bg-[#27272a] text-white px-6 py-3 rounded-md text-base font-medium inline-block no-underline"
                            >
                                Confirm Transfer
                            </Button>
                        </Section>

                        <Text className="text-gray-800 text-base leading-relaxed mb-4">
                            <strong>Important:</strong> If you did not request this transfer, please ignore this email.
                            The transfer will not proceed without your confirmation.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If you have any questions or concerns, feel free to reach out to our support team at{' '}
                            <a href="mailto:contact@abysswalker.org" className="text-[#27272a] underline">
                                contact@abysswalker.org
                            </a>
                            .
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

export const transferRequestedEmail = (props: TransferRequestedEmailProps) => (
    <TransferRequestedEmailComponent {...props} />
)

const mockOrder = {
    order: {
        id: "order_01JSNXD6VQC1YH56E4TGC81NWX",
        display_id: 1001,
        email: "customer@example.com",
        total: 9999, // $99.99 in cents
        currency_code: "usd",
        created_at: "2025-01-15T10:30:00.000Z",
    },
    storeurl: "https://abysswalker.org",
    transferToken: "transfer_01JSNXD6VQC1YH56E4TGC81NWX",
    id: "order_01JSNXD6VQC1YH56E4TGC81NWX",
}

export default () => <TransferRequestedEmailComponent {...mockOrder} />
