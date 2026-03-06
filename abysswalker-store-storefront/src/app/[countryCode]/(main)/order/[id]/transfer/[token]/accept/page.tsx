import { acceptTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@medusajs/ui"
import TransferImage from "@modules/order/components/transfer-image"
import { Suspense } from "react"

export default function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  return (
    <Suspense fallback={<TransferResultSkeleton />}>
      <AcceptTransferPageContent params={params} />
    </Suspense>
  )
}

async function AcceptTransferPageContent({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params
  const { success, error } = await acceptTransferRequest(id, token)

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Order transfered!
            </Heading>
            <Text className="text-zinc-600">
              Order {id} has been successfully transfered to the new owner.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              There was an error accepting the transfer. Please try again.
            </Text>
            {error && (
              <Text className="text-red-500">Error message: {error}</Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function TransferResultSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Processing transfer...
        </Heading>
      </div>
    </div>
  )
}
