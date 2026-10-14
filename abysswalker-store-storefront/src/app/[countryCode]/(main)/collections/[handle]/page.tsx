import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getCollectionByHandle } from "@lib/data/collections"
import { listStaticHandles } from "@lib/data/static-handles"
import { StoreCollection } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const handles = await listStaticHandles("/store/collections")
  return handles.map((handle) => ({ handle }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Abyss Walker`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const params = await props.params

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <CollectionTemplate
          collection={collection}
          countryCode={params.countryCode}
        />
      }
    >
      <CollectionPageContent
        collection={collection}
        countryCode={params.countryCode}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

async function CollectionPageContent({
  collection,
  countryCode,
  searchParams,
}: {
  collection: StoreCollection
  countryCode: string
  searchParams: Props["searchParams"]
}) {
  const resolvedSearchParams = await searchParams
  const { sortBy, page } = resolvedSearchParams

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={countryCode}
    />
  )
}
