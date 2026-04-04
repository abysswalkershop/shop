import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SpecialFeaturedProducts from "@modules/home/components/special-featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LodeStoneHero from "@modules/home/components/lodestonehero"
import GlowHero from "@modules/home/components/glowhero"
import ShowCaseBarGlow from "@modules/home/components/showcase-bar-glow/page"
import ShowCaseBarMagnet from "@modules/home/components/showcase-bar-magnet/page"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { Suspense } from "react"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import Thumbnail from "@modules/products/components/thumbnail"
import Spinner from "@modules/common/icons/spinner"

export const metadata: Metadata = {
  title: "Abyss Walker",
  description:
    "Experience Biohacking",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return (
    <>
      <Hero />
      <Suspense fallback={<SpecialFeaturedProductsBoundaryFallback />}>
        <SpecialFeaturedProductsBoundary region={region} />
      </Suspense>
      <ShowCaseBarGlow />
      <GlowHero />
      <ShowCaseBarMagnet />
      <LodeStoneHero />
      <Suspense fallback={<FeaturedProductsBoundaryFallback />}>
        <FeaturedProductsBoundary region={region} />
      </Suspense>
    </>
  )
}

async function SpecialFeaturedProductsBoundary({ region }: { region: HttpTypes.StoreRegion }) {
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <div className="pt-2 w-full border-b border-abyss-dark-accent">
      <SpecialFeaturedProducts collections={collections} region={region} />
    </div>
  )
}

function SpecialFeaturedProductsBoundaryFallback() {
  return (
    <div className="pt-2 w-full border-b border-abyss-dark-accent">
      <div
        className="content-container pb-2"
      >
        <div className="flex justify-between mb-2">
          <Text className="txt-large">Featured</Text>
          <InteractiveLink href="/collections/featured">
            View all
          </InteractiveLink>
        </div>
        <ul className="flex overflow-x-auto gap-x-4 small:gap-x-5 pb-2">
          {[...Array(7)].map((_, i) => (
            <li key={i} className="flex-none w-[calc((100%-1.5rem)/2)] small:w-[calc((100%-6*1.25rem)/7)]">
              <div data-testid="product-wrapper">
                <Thumbnail
                  size="full"
                  isFeatured
                  compact
                />
                <div className="mt-2 flex items-start justify-between gap-x-3 txt-small">
                  <div className="bg-abyss-dark-accent animate-pulse rounded-full w-16 h-4 mb-1.5" />
                  <div className="flex items-center gap-x-2">
                    <div className="bg-abyss-dark-accent animate-pulse rounded-full w-8 h-4 mb-1.5" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}

async function FeaturedProductsBoundary({ region }: { region: HttpTypes.StoreRegion }) {
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <FeaturedProducts collections={collections} region={region} />
  )
}

function FeaturedProductsBoundaryFallback() {
  return (
    <div className="py-12 bg-abyss-background flex items-center justify-center">
      <Spinner className="animate-spin" />
    </div>
  )
}