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
import { CustomerDTO } from "@medusajs/framework/types"

type CustomerCreatedEmailProps = {
    customer: CustomerDTO
    store_url?: string
}

function CustomerCreatedEmailComponent({ customer, store_url }: CustomerCreatedEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Welcome to our store!</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Welcome! 🎉
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {customer.first_name || 'there'},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Welcome to our store! We're excited to have you as part of our community.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Your account has been successfully created with the email: <strong>{customer.email}</strong>
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            You can now:
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px] ml-[20px]">
                            • Browse our latest products<br />
                            • Track your orders<br />
                            • Manage your account settings<br />
                            • Enjoy exclusive member benefits
                        </Text>

                        {store_url && (
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button
                                    className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center px-[20px] py-[12px]"
                                    href={store_url}
                                >
                                    Start Shopping
                                </Button>
                            </Section>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions, feel free to reach out to our support team.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Happy shopping!<br />
                            The Team
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}

export const customerCreatedEmail = (props: CustomerCreatedEmailProps) => (
    <CustomerCreatedEmailComponent {...props} />
)
