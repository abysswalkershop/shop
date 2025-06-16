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
    shipment_id: string
    tracking_number?: string
    tracking_url?: string
    carrier?: string
}

function ShipmentCreatedEmailComponent({
    order_id,
    shipment_id,
    tracking_number,
    tracking_url,
    carrier
}: ShipmentCreatedEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Your order has been shipped!</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Your Order Has Been Shipped! 🚚
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Great news! Your order <strong>#{order_id}</strong> has been shipped and is on its way to you.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Shipment ID:</strong> {shipment_id}
                        </Text>

                        {tracking_number && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Tracking Number:</strong> {tracking_number}
                            </Text>
                        )}

                        {carrier && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <strong>Carrier:</strong> {carrier}
                            </Text>
                        )}

                        {tracking_url && (
                            <Text className="text-black text-[14px] leading-[24px]">
                                <Link href={tracking_url} className="text-blue-600 underline">
                                    Track your shipment here
                                </Link>
                            </Text>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            We'll notify you again when your package is out for delivery and when it arrives.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for your order!
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

export const shipmentCreatedEmail = (props: ShipmentCreatedEmailProps) => (
    <ShipmentCreatedEmailComponent {...props} />
)
