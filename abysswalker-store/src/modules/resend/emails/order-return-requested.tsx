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
    return_id: string
    reason?: string
    customer_name?: string
}

function OrderReturnRequestedEmailComponent({
    order_id,
    return_id,
    reason,
    customer_name
}: OrderReturnRequestedEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Return request for order #{order_id}</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Return Request Received
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {customer_name || 'Customer'},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We've received your return request for order <strong>#{order_id}</strong>.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Return ID:</strong> {return_id}
                        </Text>

                        {reason && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Reason:</strong> {reason}
                            </Text>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            Our team will review your request and get back to you within 24-48 hours with return instructions.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions, please contact our customer support team.
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

export const orderReturnRequestedEmail = (props: OrderReturnRequestedEmailProps) => (
    <OrderReturnRequestedEmailComponent {...props} />
)
