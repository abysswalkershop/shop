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
    fulfillment_id: string
    delivery_date?: string | Date
    delivery_time?: string | Date
}

function DeliveryCreatedEmailComponent({
    order_id,
    fulfillment_id,
    delivery_date,
    delivery_time
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
            <Html>
                <Head />
                <Preview>Your order has been delivered!</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Your Order Has Been Delivered! 📦✅
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Excellent news! Your order <strong>#{order_id}</strong> has been successfully delivered.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Fulfillment ID:</strong> {fulfillment_id}
                        </Text>                        {formattedDate && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Delivery Date:</strong> {formattedDate}
                            </Text>
                        )}

                        {formattedTime && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Delivery Time:</strong> {formattedTime}
                            </Text>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            We hope you're satisfied with your purchase! If you have any questions or concerns about your order, please don't hesitate to contact us.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for choosing us for your shopping needs!
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

export const deliveryCreatedEmail = (props: DeliveryCreatedEmailProps) => (
    <DeliveryCreatedEmailComponent {...props} />
)
