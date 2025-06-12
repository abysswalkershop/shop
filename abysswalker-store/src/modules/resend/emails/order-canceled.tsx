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

type OrderCanceledEmailProps = {
    order: OrderDTO & {
        customer: CustomerDTO
    }
}

function OrderCanceledEmailComponent({ order }: OrderCanceledEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Your order #{order.display_id.toString()} has been canceled</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Order Canceled
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {order.customer?.first_name || 'Customer'},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We're writing to inform you that your order <strong>#{order.display_id}</strong> has been canceled.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions about this cancellation, please don't hesitate to contact our customer support team.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for choosing us.
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

export const orderCanceledEmail = (props: OrderCanceledEmailProps) => (
    <OrderCanceledEmailComponent {...props} />
)
