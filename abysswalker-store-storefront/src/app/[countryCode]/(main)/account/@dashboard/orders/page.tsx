import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  return (
    <Suspense fallback={<div className="w-full" data-testid="orders-page-loading" />}>
      <OrdersContent countryCode={params.countryCode} />
    </Suspense>
  )
}

async function OrdersContent({ countryCode }: { countryCode: string }) {
  await connection()

  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} countryCode={countryCode} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
