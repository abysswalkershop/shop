"use client"

import Link from "next/link"
import React from "react"

import { useCountryCode } from "@lib/context/country-context"

type LocalizedClientLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  countryCode?: string
  href: string
}

const buildLocalizedHref = (countryCode: string, href: string) => {
  return href === "/" ? `/${countryCode}` : `/${countryCode}${href}`
}

const LocalizedClientLinkWithResolvedCountry = ({
  children,
  href,
  ...props
}: Omit<LocalizedClientLinkProps, "countryCode">) => {
  const countryCode = useCountryCode()

  return (
    <Link href={buildLocalizedHref(countryCode, href)} {...props}>
      {children}
    </Link>
  )
}

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  countryCode,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  if (countryCode) {
    return (
      <Link href={buildLocalizedHref(countryCode, href)} {...props} prefetch>
        {children}
      </Link>
    )
  }

  return (
    <LocalizedClientLinkWithResolvedCountry href={href} {...props}>
      {children}
    </LocalizedClientLinkWithResolvedCountry>
  )
}

export default LocalizedClientLink
