"use client"

import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import CategoryTree from "@modules/layout/components/category-tree"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  countryCode?: string
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({
  sortBy,
  categories,
  countryCode,
  'data-testid': dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      {categories && categories.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <p className="txt-small-plus text-abyss-medium-accent">Categories</p>
          <CategoryTree
            countryCode={countryCode}
            categories={categories}
            className="grid grid-cols-1 gap-2 text-abyss-text-light txt-small"
            nestedClassName="grid grid-cols-1 gap-2 pl-4"
            itemClassName="flex flex-col gap-2"
            linkClassName="hover:text-abyss-light-accent"
            parentLinkClassName="txt-small-plus"
            nestedItemClassName="text-abyss-text-light"
            dataTestId="store-category-tree"
          />
        </div>
      )}
    </div>
  )
}

export default RefinementList
