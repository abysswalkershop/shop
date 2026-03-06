import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"
import { Suspense } from "react"

export default function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  return (
    <Suspense
      fallback={
        <AccountPageLayoutFallback login={login} params={params} />
      }
    >
      <AccountPageLayoutContent
        dashboard={dashboard}
        login={login}
        params={params}
      />
    </Suspense>
  )
}

async function AccountPageLayoutFallback({
  login,
  params,
}: {
  login?: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <AccountLayout customer={null} countryCode={countryCode}>
      {login}
      <Toaster />
    </AccountLayout>
  )
}

async function AccountPageLayoutContent({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <AccountLayout customer={customer} countryCode={countryCode}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
