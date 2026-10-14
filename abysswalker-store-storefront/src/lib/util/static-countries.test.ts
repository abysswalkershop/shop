import assert from "node:assert/strict"
import { test } from "node:test"
import { getStaticCountryCodes } from "./static-countries"

const regions = [
  { countries: [{ iso_2: "AT" }, { iso_2: "de" }, { iso_2: "at" }] },
  { countries: [{ iso_2: "ca" }, { iso_2: "us" }] },
  { countries: [] },
]

test("builds one country per pricing region, preferring the default country", () => {
  assert.deepEqual(getStaticCountryCodes(regions, "", "US"), ["at", "us"])
})

test("falls back to the first available country in each region", () => {
  assert.deepEqual(getStaticCountryCodes(regions, "", "gb"), ["at", "ca"])
})

test("can pre-render all countries without duplicates", () => {
  assert.deepEqual(getStaticCountryCodes(regions, "all", "us"), ["at", "de", "ca", "us"])
})

test("can pre-render an explicit country list", () => {
  assert.deepEqual(getStaticCountryCodes(regions, " DE,us,de ", "at"), ["de", "us"])
})

test("rejects unknown configured countries instead of silently dropping pages", () => {
  assert.throws(() => getStaticCountryCodes(regions, "at,gb", "us"), /Unknown STOREFRONT_STATIC_COUNTRIES: gb/)
})
