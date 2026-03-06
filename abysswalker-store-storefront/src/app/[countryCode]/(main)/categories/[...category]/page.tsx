import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map((category) => category.handle)

  const staticParams = countryCodes
    ?.map((countryCode) =>
      categoryHandles.map((handle) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const title = `${productCategory.name} | Abyss Walker`

    const description = productCategory.description ?? `${title} category.`

    return {
      title,
      description,
      alternates: {
        canonical: `/${params.countryCode}/categories/${params.category.join("/")}`,
      },
    }
  } catch {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const params = await props.params

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <CategoryTemplate
          category={productCategory}
          countryCode={params.countryCode}
        />
      }
    >
      <CategoryPageContent
        category={productCategory}
        countryCode={params.countryCode}
        searchParams={props.searchParams}
      />
    </Suspense>
  )
}

async function CategoryPageContent({
  category,
  countryCode,
  searchParams,
}: {
  category: NonNullable<Awaited<ReturnType<typeof getCategoryByHandle>>>
  countryCode: string
  searchParams: Props["searchParams"]
}) {
  const resolvedSearchParams = await searchParams
  const { sortBy, page } = resolvedSearchParams

  return (
    <CategoryTemplate
      category={category}
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
