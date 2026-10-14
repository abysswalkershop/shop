import { listRegions } from "@lib/data/regions"
import { getStaticCountryCodes } from "@lib/util/static-countries"

export async function generateStaticParams() {
    const countryCodes = getStaticCountryCodes(await listRegions())

    return countryCodes.map((countryCode) => ({
        countryCode,
    }))
}

export default function CountryCodeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
