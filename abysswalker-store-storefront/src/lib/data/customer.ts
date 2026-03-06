"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export type CustomerActionResult = {
  success: boolean
  error: string | null
}

export type CustomerAddressFormState = CustomerActionResult & {
  addressId?: string
  isDefaultBilling?: boolean
  isDefaultShipping?: boolean
}

const revalidateCachedTag = (tag: string) => revalidateTag(tag, "max")

const getStringField = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

const requireStringField = (formData: FormData, key: string, label: string) => {
  const value = getStringField(formData, key)

  if (!value) {
    throw new Error(`${label} is required`)
  }

  return value
}

const getOptionalStringField = (formData: FormData, key: string) => {
  const value = getStringField(formData, key)
  return value || undefined
}

const getCustomerAuthInput = (formData: FormData) => {
  const email = requireStringField(formData, "email", "Email")
  const password = requireStringField(formData, "password", "Password")

  return { email, password }
}

const getCustomerProfileInput = (formData: FormData) => ({
  email: requireStringField(formData, "email", "Email"),
  first_name: requireStringField(formData, "first_name", "First name"),
  last_name: requireStringField(formData, "last_name", "Last name"),
  phone: getOptionalStringField(formData, "phone"),
})

const getCustomerAddressInput = (formData: FormData) => ({
  first_name: requireStringField(formData, "first_name", "First name"),
  last_name: requireStringField(formData, "last_name", "Last name"),
  company: getOptionalStringField(formData, "company"),
  address_1: requireStringField(formData, "address_1", "Address"),
  address_2: getOptionalStringField(formData, "address_2"),
  city: requireStringField(formData, "city", "City"),
  postal_code: requireStringField(formData, "postal_code", "Postal code"),
  province: getOptionalStringField(formData, "province"),
  country_code: requireStringField(formData, "country_code", "Country"),
  phone: getOptionalStringField(formData, "phone"),
})

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.toString()
  }

  return "Unknown error"
}

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    return await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        cache: "no-store",
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateCachedTag(cacheTag)

  return updateRes
}

export async function signup(
  _currentState: string | null,
  formData: FormData
): Promise<string | null> {
  const { password } = getCustomerAuthInput(formData)
  const customerForm = getCustomerProfileInput(formData)

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    await setAuthToken(token as string)

    const headers = {
      ...(await getAuthHeaders()),
    }

    await sdk.store.customer.create(
      customerForm,
      {},
      headers
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)

    const customerCacheTag = await getCacheTag("customers")
    revalidateCachedTag(customerCacheTag)

    await transferCart()

    return null
  } catch (error) {
    return getErrorMessage(error)
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const { email, password } = getCustomerAuthInput(formData)

  try {
    await sdk.auth
      .login("customer", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string)
        const customerCacheTag = await getCacheTag("customers")
        revalidateCachedTag(customerCacheTag)
      })
  } catch (error) {
    return getErrorMessage(error)
  }

  try {
    await transferCart()
  } catch (error) {
    return getErrorMessage(error)
  }

  return null
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  revalidateCachedTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateCachedTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateCachedTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: CustomerAddressFormState,
  formData: FormData
): Promise<CustomerAddressFormState> => {
  const isDefaultBilling = currentState.isDefaultBilling ?? false
  const isDefaultShipping = currentState.isDefaultShipping ?? false

  const address = {
    ...getCustomerAddressInput(formData),
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateCachedTag(customerCacheTag)
      return { ...currentState, success: true, error: null }
    })
    .catch((err) => {
      return { ...currentState, success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<CustomerActionResult> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateCachedTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: CustomerAddressFormState,
  formData: FormData
): Promise<CustomerAddressFormState> => {
  const formAddressId = formData.get("addressId")
  const addressId =
    currentState.addressId || (typeof formAddressId === "string" ? formAddressId : "")

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = getCustomerAddressInput(
    formData
  ) as HttpTypes.StoreUpdateCustomerAddress

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateCachedTag(customerCacheTag)
      return { ...currentState, success: true, error: null }
    })
    .catch((err) => {
      return { ...currentState, success: false, error: err.toString() }
    })
}
