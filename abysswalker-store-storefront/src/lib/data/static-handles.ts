import "server-only"

import { cache } from "react"
import { sdk } from "@lib/config"

const responseKeys = {
  "/store/products": "products",
  "/store/collections": "collections",
  "/store/product-categories": "product_categories",
} as const

type HandlePage = Partial<Record<(typeof responseKeys)[keyof typeof responseKeys], { handle?: string | null }[]>>

// Enumerate the entire catalog once per endpoint, without loading product data.
export const listStaticHandles = cache(async (endpoint: keyof typeof responseKeys) => {
  const handles = new Set<string>()
  const limit = 100

  for (let offset = 0; ; offset += limit) {
    const response = await sdk.client.fetch<HandlePage>(endpoint, {
      method: "GET",
      query: { fields: "handle", limit, offset },
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    const items = response[responseKeys[endpoint]]

    if (!items) {
      throw new Error(`Missing handle list in ${endpoint} response`)
    }

    for (const { handle } of items) {
      if (handle) handles.add(handle)
    }

    if (items.length < limit) return Array.from(handles)
  }
})
