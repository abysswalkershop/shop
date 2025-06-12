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
import { OrderDTO, CustomerDTO } from "@medusajs/framework/types"

type OrderCompletedEmailProps = {
    order: OrderDTO & {
        customer: CustomerDTO
    }
}

function OrderCompletedEmailComponent({ order }: OrderCompletedEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Your order #{order.display_id.toString()} has been completed</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Order Completed! 🎉
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {order.customer?.first_name || 'Customer'},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Great news! Your order <strong>#{order.display_id}</strong> has been completed and is on its way to you.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We hope you love your purchase! If you have any questions or need support, please don't hesitate to reach out.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for choosing us and we look forward to serving you again.
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

export const orderCompletedEmail = (props: OrderCompletedEmailProps) => (
    <OrderCompletedEmailComponent {...props} />
)
