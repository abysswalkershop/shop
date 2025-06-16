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
import { OrderDTO, CustomerDTO, BigNumberValue } from "@medusajs/framework/types"

type OrderCanceledEmailProps = {
    order: OrderDTO & {
        customer: CustomerDTO
    }
}

function OrderCanceledEmailComponent({ order }: OrderCanceledEmailProps) {
    const formatter = new Intl.NumberFormat([], {
        style: "currency",
        currencyDisplay: "narrowSymbol",
        currency: order.currency_code,
    })

    const formatPrice = (price: BigNumberValue) => {
        if (typeof price === "number") {
            return formatter.format(price)
        }

        if (typeof price === "string") {
            return formatter.format(parseFloat(price))
        }

        return price?.toString() || ""
    }

    return (
        <Tailwind>
            <Html className="font-sans bg-gray-100">
                <Head />
                <Preview>Your order #{order.display_id.toString()} has been canceled</Preview>
                <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
                    {/* Header */}
                    <Section className="bg-[#27272a] text-white px-6 py-4">
                        <Text className="text-lg font-bold">ABYSSWALKER</Text>
                    </Section>

                    {/* Cancellation Message */}
                    <Container className="p-6">
                        <Heading className="text-2xl font-bold text-center text-gray-800">
                            Order Canceled
                        </Heading>
                        <Text className="text-center text-gray-600 mt-2">
                            We've canceled your order as requested.
                        </Text>
                    </Container>

                    {/* Content */}
                    <Container className="px-6">
                        <Text className="text-gray-800 text-base leading-relaxed">
                            Hi {order.customer?.first_name || order.shipping_address?.first_name || 'Customer'},
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            We're writing to confirm that your order <strong>#{order.display_id}</strong> has been canceled.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-lg my-6">
                            <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Order Details:</Text>
                            <Text className="text-gray-600 text-sm m-0">Order ID: #{order.display_id}</Text>
                            <Text className="text-gray-600 text-sm m-0">Order Total: {formatPrice(order.total)}</Text>
                        </Section>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            If this cancellation was unexpected or if you have any questions, please don't hesitate to contact our customer support team at contact@abysswalker.org.
                        </Text>

                        <Text className="text-gray-800 text-base leading-relaxed">
                            Any payments made for this order will be refunded to your original payment method within 3-5 business days.
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

export const orderCanceledEmail = (props: OrderCanceledEmailProps) => (
    <OrderCanceledEmailComponent {...props} />
)

const mockOrder = {
    "order": {
        "id": "order_01JSNXDH9BPJWWKVW03B9E9KW8",
        "display_id": 1002,
        "email": "john.doe@example.com",
        "currency_code": "eur",
        "total": 35,
        "subtotal": 25,
        "discount_total": 0,
        "shipping_total": 10,
        "tax_total": 0,
        "item_subtotal": 25,
        "item_total": 25,
        "item_tax_total": 0,
        "customer_id": "cus_01JSNXD6VQC1YH56E4TGC81NWX",
        "shipping_address": {
            "id": "caaddr_01JSNXD6W0TGPH2JQD18K97B25",
            "customer_id": null,
            "company": "",
            "first_name": "John",
            "last_name": "Doe",
            "address_1": "123 Main Street",
            "address_2": "Apt 4B",
            "city": "Copenhagen",
            "country_code": "dk",
            "province": "",
            "postal_code": "1000",
            "phone": "+45 12 34 56 78",
            "metadata": null,
            "created_at": "2025-06-16T10:30:00.000Z",
            "updated_at": "2025-06-16T10:30:00.000Z",
            "deleted_at": null,
        },
        "customer": {
            "id": "cus_01JSNXD6VQC1YH56E4TGC81NWX",
            "company_name": null,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "+45 12 34 56 78",
            "has_account": true,
            "metadata": null,
            "created_by": null,
            "created_at": "2025-06-16T10:30:00.000Z",
            "updated_at": "2025-06-16T10:30:00.000Z",
            "deleted_at": null,
        },
    },
}

// @ts-ignore
export default () => <OrderCanceledEmailComponent {...mockOrder} />
