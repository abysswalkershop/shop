// Country URLs share prices within a Medusa region. Build one representative
// per region by default; other countries remain available for on-demand rendering.
export function getStaticCountryCodes(
  regions: { countries?: { iso_2?: string | null }[] | null }[],
  configuredCountries = process.env.STOREFRONT_STATIC_COUNTRIES,
  defaultCountry = process.env.NEXT_PUBLIC_DEFAULT_REGION
) {
  const regionCountries = regions.map((region) =>
    Array.from(new Set((region.countries ?? []).flatMap(({ iso_2 }) =>
      iso_2 ? [iso_2.toLowerCase()] : []
    )))
  )
  const allCountries = new Set(regionCountries.flat())

  if (configuredCountries?.trim().toLowerCase() === "all") {
    return Array.from(allCountries)
  }

  if (configuredCountries?.trim()) {
    const countries = Array.from(new Set(configuredCountries.split(",").map((code) => code.trim().toLowerCase())))
    const invalid = countries.filter((code) => !allCountries.has(code))

    if (invalid.length) {
      throw new Error(`Unknown STOREFRONT_STATIC_COUNTRIES: ${invalid.join(", ")}`)
    }

    return countries
  }

  const preferredCountry = defaultCountry?.toLowerCase()
  return Array.from(new Set(regionCountries.flatMap((countries) => {
    const country = preferredCountry && countries.includes(preferredCountry)
      ? preferredCountry
      : countries[0]
    return country ? [country] : []
  })))
}
