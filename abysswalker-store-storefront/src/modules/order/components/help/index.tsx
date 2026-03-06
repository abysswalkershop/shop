import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = ({ countryCode }: { countryCode: string }) => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink
              countryCode={countryCode}
              href="/contact"
              className="text-abyss-text-light hover:text-abyss-light-accent"
            >
              Contact
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink
              countryCode={countryCode}
              href="/returns"
              className="text-abyss-text-light hover:text-abyss-light-accent"
            >
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
