import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

type OrderReturnReceivedEmailProps = {
  order_id?: string
  return_id?: string
  received_at?: string
  customer_name?: string
}

export const OrderReturnReceivedEmail = ({
  order_id,
  return_id,
  received_at,
  customer_name = "Customer",
}: OrderReturnReceivedEmailProps) => {
  const formattedDate = received_at ? new Date(received_at).toLocaleDateString() : "today"

  return (
    <Html>
      <Head />
      <Preview>Your return has been received and is being processed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`https://react-email-demo-ijnnx5hul-resend.vercel.app/static/vercel-logo.png`}
                width="75"
                height="45"
                alt="Abysswalker Store"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Return Received</Heading>
              <Text style={mainText}>
                Hello {customer_name},
              </Text>
              <Text style={mainText}>
                We have received your return for order <strong>#{order_id}</strong>.
                Your return ID is <strong>{return_id}</strong>.
              </Text>
              <Text style={mainText}>
                We received your return on {formattedDate} and our team is now processing it.
                You will receive another email confirmation once your return has been fully processed
                and any applicable refund has been issued.
              </Text>
              <Text style={mainText}>
                Thank you for your patience, and please don't hesitate to contact us if you have any questions.
              </Text>
            </Section>
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you have any questions about your return, please contact our customer service team.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
}

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
}

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
}

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
}

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
}

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
}

const coverSection = { backgroundColor: "#fff" }

const upperSection = { padding: "25px 35px" }

const lowerSection = { padding: "25px 35px" }

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
}

const mainText = { ...text, marginBottom: "14px" }

const cautionText = { ...text, margin: "0px" }

export default OrderReturnReceivedEmail
