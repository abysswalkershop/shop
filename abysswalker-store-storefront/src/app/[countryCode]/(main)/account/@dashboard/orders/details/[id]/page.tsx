import { retrieveOrder, retrieveTrackingNumberByOrder } from "@lib/data/orders"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"

type Props = {
  params: Promise<{ countryCode: string; id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: `Order #${order.display_id}`,
    description: `View your order`,
  }
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params

  return (
    <Suspense fallback={<div className="w-full" data-testid="order-details-loading" />}>
      <OrderDetailsContent id={params.id} countryCode={params.countryCode} />
    </Suspense>
  )
}

async function OrderDetailsContent({
  id,
  countryCode,
}: {
  id: string
  countryCode: string
}) {
  await connection()

  const order = await retrieveOrder(id).catch(() => null)

  if (!order) {
    notFound()
  }

  const tracking = await retrieveTrackingNumberByOrder(id)

  return (
    <OrderDetailsTemplate
      order={order}
      countryCode={countryCode}
      trackingNumber={tracking}
    />
  )
}
