import { HttpTypes } from "@medusajs/types"

import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function SpecialFeaturedProducts({
    collections,
    region,
}: {
    collections: HttpTypes.StoreCollection[]
    region: HttpTypes.StoreRegion
}) {
    const featuredCollection = collections.find((collection) => {
        const handle = collection.handle?.toLowerCase()
        const title = collection.title?.toLowerCase()

        return handle === "featured" || title === "featured"
    })

    if (!featuredCollection) {
        return null
    }

    return (
        <ProductRail
            collection={featuredCollection}
            region={region}
            limit={7}
            compact
        />
    )
}