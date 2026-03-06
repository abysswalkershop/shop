import { retrieveCart } from "@lib/data/cart"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import { Suspense } from "react"
import CallbackPageClient from "./client"

export default function CallbackPage({
    searchParams,
}: {
    searchParams: Promise<{ cart_id?: string }>
}) {
    return (
        <Suspense fallback={<CheckoutCallbackFallback />}>
            <CallbackPageContent searchParams={searchParams} />
        </Suspense>
    )
}

async function CallbackPageContent({
    searchParams,
}: {
    searchParams: Promise<{ cart_id?: string }>
}) {
    await connection()

    const cartId = (await searchParams).cart_id

    if (!cartId) {
        return notFound()
    }

    const cart = await retrieveCart(cartId)

    if (!cart) {
        return notFound()
    }

    return (
        <PaymentWrapper cart={cart}>
            <CallbackPageClient
                cartId={cart.id}
                regioncode={cart.shipping_address?.country_code?.toLowerCase() || "de"}
            />
        </PaymentWrapper>
    )
}

function CheckoutCallbackFallback() {
    return (
        <div className="content-container py-12">
            <div className="h-48 animate-pulse rounded bg-abyss-dark-accent" />
        </div>
    )
}