import { isEqual, pick } from "lodash"

type AddressComparable = {
  first_name?: string | null
  last_name?: string | null
  address_1?: string | null
  company?: string | null
  postal_code?: string | null
  city?: string | null
  country_code?: string | null
  province?: string | null
  phone?: string | null
}

export default function compareAddresses(
  address1?: AddressComparable | null,
  address2?: AddressComparable | null
) {
  return isEqual(
    pick(address1, [
      "first_name",
      "last_name",
      "address_1",
      "company",
      "postal_code",
      "city",
      "country_code",
      "province",
      "phone",
    ]),
    pick(address2, [
      "first_name",
      "last_name",
      "address_1",
      "company",
      "postal_code",
      "city",
      "country_code",
      "province",
      "phone",
    ])
  )
}
