"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

type ProductQueryParams = HttpTypes.FindParams &
  HttpTypes.StoreProductParams & {
    handle?: string | string[]
    id?: string[]
    collection_id?: string | string[]
    tag_id?: string[]
    is_giftcard?: boolean
  }

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: ProductQueryParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductQueryParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const currentPage = Math.max(pageParam, 1)
  const offset = currentPage === 1 ? 0 : (currentPage - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else if (regionId) {
    region = await retrieveRegion(regionId)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const next = {
    ...(await getCacheOptions("products", { personalized: false })),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...queryParams,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? currentPage + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: ProductQueryParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const currentPage = Math.max(page, 1)

  if (sortBy === "created_at") {
    return listProducts({
      pageParam: currentPage,
      queryParams,
      countryCode,
    })
  }

  const pageSize = 100
  const products: HttpTypes.StoreProduct[] = []
  let count = 0
  let nextPageToFetch = 1

  while (true) {
    const {
      response: { products: pageProducts, count: pageCount },
    } = await listProducts({
      pageParam: nextPageToFetch,
      queryParams: {
        ...queryParams,
        limit: pageSize,
      },
      countryCode,
    })

    products.push(...pageProducts)
    count = pageCount

    if (products.length >= count || pageProducts.length < pageSize) {
      break
    }

    nextPageToFetch += 1
  }

  const sortedProducts = sortProducts(products, sortBy)

  const pageOffset = (currentPage - 1) * limit
  const nextPage = count > pageOffset + limit ? currentPage + 1 : null
  const paginatedProducts = sortedProducts.slice(pageOffset, pageOffset + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
