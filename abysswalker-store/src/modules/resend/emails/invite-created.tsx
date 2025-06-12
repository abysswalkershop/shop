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

type InviteCreatedEmailProps = {
    invite: {
        id: string
        email: string
        token: string
    }
    inviter_name?: string
    accept_url?: string
}

function InviteCreatedEmailComponent({ invite, inviter_name, accept_url }: InviteCreatedEmailProps) {
    const acceptInviteUrl = accept_url
        ? `${accept_url}?token=${invite.token}&email=${encodeURIComponent(invite.email)}`
        : undefined

    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>You're invited to join our team!</Preview>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                You're Invited! 🎉
                            </Heading>
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hi there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            {inviter_name ? `${inviter_name} has invited you` : 'You have been invited'} to join our team as an admin user.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>Email:</strong> {invite.email}
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Click the button below to accept the invitation and create your account:
                        </Text>

                        {acceptInviteUrl && (
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button
                                    className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center px-[20px] py-[12px]"
                                    href={acceptInviteUrl}
                                >
                                    Accept Invitation
                                </Button>
                            </Section>
                        )}

                        <Text className="text-black text-[14px] leading-[24px]">
                            This invitation will expire in 7 days. If you have any questions, please contact the person who invited you.
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

export const inviteCreatedEmail = (props: InviteCreatedEmailProps) => (
    <InviteCreatedEmailComponent {...props} />
)
