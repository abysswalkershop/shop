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
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Welcome to ABYSSWALKER!</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Welcome Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Welcome to ABYSSWALKER! 🎉
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            We're excited to have you as part of our community.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {customer.first_name || 'there'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Welcome to our store! Your account has been successfully created with the email: <strong>{customer.email}</strong>
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            You can now:
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-4">
                            <Text className="text-gray-700 text-base leading-relaxed m-0">
                                • Browse our latest products<br />
                                • Track your orders<br />
                                • Manage your account settings<br />
                                • Enjoy exclusive member benefits
                            </Text>
                        </Section>

                        {store_url && (
                            <Section className="text-center mt-8 mb-8">
                                <Button
                                    className="bg-[#27272a] rounded text-white text-base font-semibold no-underline text-center px-6 py-3"
                                    href={store_url}
                                >
                                    Start Shopping
                                </Button>
                            </Section>
                        )}

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If you have any questions, feel free to reach out to our support team at contact@abysswalker.org.
                        </Text>
                    </Container>

                    {/* Footer */}
                    <Section className="bg-gray-50 p-6 mt-10">
                        <Text className="text-center text-gray-500 text-sm">
                            Thank you for choosing ABYSSWALKER.
                        </Text>
                        <Text className="text-center text-gray-400 text-xs mt-4">
                            © {new Date().getFullYear()} EI Abyss Walker. All rights reserved.
                        </Text>
                    </Section>
                </Body>
            </Html>
        </Tailwind>
    )
}

export const customerCreatedEmail = (props: CustomerCreatedEmailProps) => (
    <CustomerCreatedEmailComponent {...props} />
)

const mockCustomer = {
    "customer": {
        "id": "cus_01JSNXD6VQC1YH56E4TGC81NWX",
        "company_name": null,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-0123",
        "has_account": true,
        "metadata": null,
        "created_by": null,
        "created_at": "2025-06-16T10:30:00.000Z",
        "updated_at": "2025-06-16T10:30:00.000Z",
        "deleted_at": null,
    },
    "store_url": "https://abysswalker.org"
}

// @ts-ignore
export default () => <CustomerCreatedEmailComponent {...mockCustomer} />
