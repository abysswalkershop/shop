import { listRegionCountryCodes } from "@lib/data/regions"

export async function generateStaticParams() {
    const countryCodes = await listRegionCountryCodes()

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