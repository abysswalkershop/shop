import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  const nonFeaturedCollections = collections.filter((collection) => {
    const handle = collection.handle?.toLowerCase()
    const title = collection.title?.toLowerCase()

    return handle !== "featured" && title !== "featured"
  })

  if (nonFeaturedCollections.length === 0) {
    return null
  }

  return (
    <div className="py-12 bg-abyss-background">
      <ul className="flex flex-col gap-x-6">
        {nonFeaturedCollections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
