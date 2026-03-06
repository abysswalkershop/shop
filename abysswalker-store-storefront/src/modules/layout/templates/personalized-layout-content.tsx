import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export default async function PersonalizedLayoutContent() {
    const customer = await retrieveCustomer()
    const cart = await retrieveCart()
    let shippingOptions: StoreCartShippingOption[] = []

    if (cart) {
        const { shipping_options } = await listCartOptions()

        shippingOptions = shipping_options
    }

    if (!cart) {
        return null
    }

    return (
        <>
            {customer && <CartMismatchBanner customer={customer} cart={cart} />}
            <FreeShippingPriceNudge
                variant="popup"
                cart={cart}
                shippingOptions={shippingOptions}
            />
        </>
    )
}