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

type PaymentRefundedEmailProps = {
    order_id?: string
    refund_amount: string | number
    currency: string
    reason?: string
    refund_method?: string
    customer_name?: string
}

function PaymentRefundedEmailComponent({
    order_id,
    refund_amount,
    currency,
    reason,
    refund_method,
    customer_name
}: PaymentRefundedEmailProps) {
    const formatAmount = (amount: string | number) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
        return numAmount.toFixed(2)
    }

    const formatCurrency = (curr: string) => {
        return curr.toUpperCase()
    }

    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your refund has been processed</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Refund Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Refund Processed
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            Your refund has been successfully processed.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer_name || 'there'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We've processed a refund for your recent transaction. Here are the details:
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Refund Details:</Text>
                            {order_id && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Order ID:</strong> #{order_id}
                                </Text>
                            )}
                            <Text className="text-gray-600 text-sm m-0">
                                <strong>Refund Amount:</strong> {formatAmount(refund_amount)} {formatCurrency(currency)}
                            </Text>
                            {reason && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Reason:</strong> {reason}
                                </Text>
                            )}
                            {refund_method && (
                                <Text className="text-gray-600 text-sm m-0">
                                    <strong>Refund Method:</strong> {refund_method}
                                </Text>
                            )}
                        </Section>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Please note that it may take 3-10 business days for the refund to appear in your account, depending on your bank or payment provider.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If you have any questions about this refund, please don't hesitate to contact our customer support team at contact@abysswalker.org.
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

export const paymentRefundedEmail = (props: PaymentRefundedEmailProps) => (
    <PaymentRefundedEmailComponent {...props} />
)

const mockRefund = {
    "order_id": "1004",
    "payment_id": "pay_01JSNXDH9BPJWWKVW03B9E9KW8",
    "refund_amount": 45.00,
    "currency": "eur",
    "reason": "Customer requested refund",
    "refund_method": "Credit Card",
    "customer_name": "John Doe"
}

export default () => <PaymentRefundedEmailComponent {...mockRefund} />
