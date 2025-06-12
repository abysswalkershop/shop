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

type PasswordResetEmailProps = {
    entity_id: string
    token: string
    reset_url?: string
    is_customer?: boolean
}

function PasswordResetEmailComponent({ entity_id, token, reset_url, is_customer = true }: PasswordResetEmailProps) {
    const resetPasswordUrl = reset_url
        ? `${reset_url}?token=${token}&email=${encodeURIComponent(entity_id)}`
        : undefined

    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Reset your password</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Reset Your Password 🔐
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            We received a request to reset the password for your {is_customer ? 'customer' : 'admin'} account.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Email:</strong> {entity_id}
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Click the button below to reset your password:
                        </Text>

                        {resetPasswordUrl && (
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button
                                    className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center px-[20px] py-[12px]"
                                    href={resetPasswordUrl}
                                >
                                    Reset Password
                                </Button>
                            </Section>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            If you continue to have problems, please contact our support team.
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

export const passwordResetEmail = (props: PasswordResetEmailProps) => (
    <PasswordResetEmailComponent {...props} />
)
