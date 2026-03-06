import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
  limit,
  compact,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  limit?: number
  compact?: boolean
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  const displayProducts = typeof limit === "number"
    ? pricedProducts.slice(0, limit)
    : pricedProducts

  return (
    <div
      className={clx(
        "content-container",
        compact
          ? "pb-2"
          : "py-12 small:py-24"
      )}
    >
      <div className={clx("flex justify-between", compact ? "mb-2" : "mb-8")}>
        <Text className={compact ? "txt-large" : "txt-xlarge"}>{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul
        className={clx(
          compact
            ? "flex overflow-x-auto gap-x-4 small:gap-x-5 pb-2"
            : "grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36"
        )}
      >
        {displayProducts &&
          displayProducts.map((product) => (
            <li key={product.id} className={compact ? "flex-none w-[calc((100%-1.5rem)/2)] small:w-[calc((100%-6*1.25rem)/7)]" : undefined}>
              <ProductPreview
                product={product}
                region={region}
                isFeatured
                compact={compact}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
