import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  return (
    <Suspense fallback={<div className="w-full" data-testid="account-overview-loading" />}>
      <OverviewContent countryCode={params.countryCode} />
    </Suspense>
  )
}

async function OverviewContent({ countryCode }: { countryCode: string }) {
  await connection()

  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} countryCode={countryCode} />
}
