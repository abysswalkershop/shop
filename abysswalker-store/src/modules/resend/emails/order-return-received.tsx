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

type OrderReturnReceivedEmailProps = {
  order_id?: string
  received_at?: string
  customer_name?: string
  return_reason?: string
}

function OrderReturnReceivedEmailComponent({
  order_id,
  received_at,
  customer_name,
  return_reason
}: OrderReturnReceivedEmailProps) {
  const formattedDate = received_at ? new Date(received_at).toLocaleDateString() : "today"

  return (
    <Tailwind>
      <Html className="font-sans bg-gray-100">
        <Head />
        <Preview>Your return has been received and is being processed</Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
          {/* Header */}
          <Section className="bg-[#27272a] text-white px-6 py-4">
            <Text className="text-lg font-bold">ABYSSWALKER</Text>
          </Section>

          {/* Return Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-gray-800">
              Return Received
            </Heading>
            <Text className="text-center text-gray-600 mt-2">
              We've received your return and are processing it.
            </Text>
          </Container>

          {/* Content */}
          <Container className="px-6">
            <Text className="text-gray-800 text-base leading-relaxed">
              Hello {customer_name || 'Customer'},
            </Text>

            <Text className="text-gray-800 text-base leading-relaxed">
              We have received your return for order <strong>#{order_id}</strong> and are now processing it.
            </Text>

            <Section className="bg-gray-50 p-4 rounded-lg my-6">
              <Text className="text-gray-700 font-semibold text-base m-0 mb-2">Return Details:</Text>
              {order_id && (
                <Text className="text-gray-600 text-sm m-0">
                  <strong>Order ID:</strong> #{order_id}
                </Text>
              )}
              <Text className="text-gray-600 text-sm m-0">
                <strong>Received On:</strong> {formattedDate}
              </Text>
              {return_reason && (
                <Text className="text-gray-600 text-sm m-0">
                  <strong>Return Reason:</strong> {return_reason}
                </Text>
              )}
            </Section>

            <Text className="text-gray-800 text-base leading-relaxed">
              You will receive another email confirmation once your return has been fully processed and any applicable refund has been issued.
            </Text>

            <Text className="text-gray-800 text-base leading-relaxed">
              Thank you for your patience. If you have any questions about your return, please contact our customer service team at contact@abysswalker.org.
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

export const OrderReturnReceivedEmail = (props: OrderReturnReceivedEmailProps) => (
  <OrderReturnReceivedEmailComponent {...props} />
)

const mockReturn = {
  "order_id": "1008",
  "return_id": "ret_01JSNXDH9BPJWWKVW03B9E9KW8",
  "received_at": "2025-06-16T12:00:00.000Z",
  "customer_name": "John Doe",
  "return_reason": "Product not as described"
}

export default () => <OrderReturnReceivedEmailComponent {...mockReturn} />
