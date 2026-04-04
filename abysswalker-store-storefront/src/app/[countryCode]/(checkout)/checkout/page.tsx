import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Checkout",
}

export default function Checkout() {
  return (
    <Suspense fallback={<CheckoutPageFallback />}>
      <CheckoutContent />
    </Suspense>
  )
}

async function CheckoutContent() {
  await connection()

  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}

function CheckoutPageFallback() {
  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-56 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-48 animate-pulse rounded bg-abyss-dark-accent" />
      </div>
      <div className="h-96 animate-pulse rounded bg-abyss-dark-accent" />
    </div>
  )
}
