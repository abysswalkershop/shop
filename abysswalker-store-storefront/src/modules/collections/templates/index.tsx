import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ServerRefinementList from "@modules/store/components/refinement-list/server"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

const refinementListFallback = (
  <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
    <div className="flex flex-col gap-y-4 small:min-w-[250px]">
      <div className="h-5 w-20 animate-pulse rounded bg-abyss-dark-accent" />
      <div className="space-y-2">
        <div className="h-4 w-36 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-4 w-32 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-4 w-28 animate-pulse rounded bg-abyss-dark-accent" />
      </div>
    </div>
    <div className="flex flex-col gap-y-4 small:min-w-[250px]">
      <div className="h-5 w-24 animate-pulse rounded bg-abyss-dark-accent" />
      <div className="space-y-2">
        <div className="h-4 w-40 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-4 w-36 animate-pulse rounded bg-abyss-dark-accent" />
        <div className="h-4 w-32 animate-pulse rounded bg-abyss-dark-accent" />
      </div>
    </div>
  </div>
)

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <Suspense fallback={refinementListFallback}>
        <ServerRefinementList sortBy={sort} countryCode={countryCode} />
      </Suspense>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
