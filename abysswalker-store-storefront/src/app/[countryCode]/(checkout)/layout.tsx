import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-abyss-background relative small:min-h-screen">
      <div className="h-16 bg-abyss-background border-b border-abyss-dark-accent">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-abyss-text-light flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-abyss-text-light hover:text-abyss-light-accent ">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-abyss-text-light hover:text-abyss-light-accent">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-abyss-text-light hover:text-abyss-light-accent uppercase"
            data-testid="store-link"
          >
            Abysswalker
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
