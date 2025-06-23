import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LodeStoneHero from "@modules/home/components/lodestonehero"
import GlowHero from "@modules/home/components/glowhero"
import ShowCaseBarGlow from "@modules/home/components/showcase-bar-glow/page"
import ShowCaseBarMagnet from "@modules/home/components/showcase-bar-magnet/page"

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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <ShowCaseBarMagnet />
      <LodeStoneHero />
      <ShowCaseBarGlow />
      <GlowHero />
      <div className="py-12 bg-abyss-background">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
