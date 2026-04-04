import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"

export default async function CartButton({
  countryCode,
}: {
  countryCode: string
}) {
  const cart = await retrieveCart().catch(() => null)

  return <CartDropdown cart={cart} countryCode={countryCode} />
}
