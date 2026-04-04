import { Metadata } from "next"
import { Suspense } from "react"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params

  return (
    <Suspense fallback={<StoreTemplate countryCode={params.countryCode} />}>
      <StorePageContent
        countryCode={params.countryCode}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

async function StorePageContent({
  countryCode,
  searchParams,
}: {
  countryCode: string
  searchParams: Params["searchParams"]
}) {
  const resolvedSearchParams = await searchParams
  const { sortBy, page } = resolvedSearchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
