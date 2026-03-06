import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  if (["price_asc", "price_desc"].includes(sortBy)) {
    const productsWithMinPrice = products.map((product) => ({
      product,
      minPrice:
        product.variants && product.variants.length > 0
          ? Math.min(
            ...product.variants.map(
              (variant) => variant?.calculated_price?.calculated_amount || 0
            )
          )
          : Number.POSITIVE_INFINITY,
    }))

    return productsWithMinPrice
      .sort((a, b) => {
        const diff = a.minPrice - b.minPrice

        return sortBy === "price_asc" ? diff : -diff
      })
      .map(({ product }) => product)
  }

  if (sortBy === "created_at") {
    return [...products].sort((a, b) => {
      return (
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      )
    })
  }

  return [...products]
}
