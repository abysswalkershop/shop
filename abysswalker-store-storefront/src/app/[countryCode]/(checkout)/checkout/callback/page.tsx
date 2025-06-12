import { retrieveCart } from "@lib/data/cart"
import { notFound } from "next/navigation"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CallbackPageClient from "./client"

export default async function CallbackPage({
    searchParams,
}: {
    searchParams: { cart_id?: string }
}) {
    const cartId = searchParams.cart_id
    const cart = await retrieveCart(cartId)

    if (!cart) {
        return notFound()
    }

    return (
        <PaymentWrapper cart={cart}>
            <CallbackPageClient regioncode={cart.shipping_address?.country_code?.toLowerCase() || "de"} />
        </PaymentWrapper>
    )
}