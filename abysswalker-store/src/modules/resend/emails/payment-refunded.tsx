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
    payment_id: string
    refund_amount: string | number
    currency: string
    reason?: string
    refund_method?: string
}

function PaymentRefundedEmailComponent({
    order_id,
    payment_id,
    refund_amount,
    currency,
    reason,
    refund_method
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
            <Html>
                <Head />
                <Preview>Your refund has been processed</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Refund Processed 💰
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We've processed a refund for your recent transaction. Here are the details:
                        </Text>

                        {order_id && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Order ID:</strong> #{order_id}
                            </Text>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Payment ID:</strong> {payment_id}
                        </Text>                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Refund Amount:</strong> {formatAmount(refund_amount)} {formatCurrency(currency)}
                        </Text>

                        {reason && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Reason:</strong> {reason}
                            </Text>
                        )}

                        {refund_method && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Refund Method:</strong> {refund_method}
                            </Text>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            Please note that it may take 3-10 business days for the refund to appear in your account, depending on your bank or payment provider.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions about this refund, please don't hesitate to contact our customer support team.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Best regards,<br />
                            The Team
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}

export const paymentRefundedEmail = (props: PaymentRefundedEmailProps) => (
    <PaymentRefundedEmailComponent {...props} />
)
