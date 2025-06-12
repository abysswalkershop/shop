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

type UserCreatedEmailProps = {
    user: {
        id: string
        email: string
        first_name?: string
        last_name?: string
    }
    admin_url?: string
}

function UserCreatedEmailComponent({ user, admin_url }: UserCreatedEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Welcome to the admin panel!</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Admin Access Granted 🔑
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi {user.first_name || 'there'},
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Your admin account has been successfully created! You now have access to the admin panel.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Email:</strong> {user.email}
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            With your admin access, you can:
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px] ml-[20px]">
                            • Manage products and inventory<br />
                            • View and process orders<br />
                            • Handle customer support<br />
                            • Access analytics and reports<br />
                            • Configure store settings
                        </Text>

                        {admin_url && (
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button
                                    className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center px-[20px] py-[12px]"
                                    href={admin_url}
                                >
                                    Access Admin Panel
                                </Button>
                            </Section>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions about using the admin panel, please contact the development team.
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

export const userCreatedEmail = (props: UserCreatedEmailProps) => (
    <UserCreatedEmailComponent {...props} />
)
