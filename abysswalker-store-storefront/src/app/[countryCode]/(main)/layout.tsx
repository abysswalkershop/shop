import { Suspense } from "react"
import { Metadata } from "next"

import { getBaseURL } from "@lib/util/env"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import PersonalizedLayoutContent from "@modules/layout/templates/personalized-layout-content"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export const dynamic = "force-dynamic"

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <PersonalizedLayoutContent />
      </Suspense>
      {props.children}
      <Footer />
    </>
  )
}
