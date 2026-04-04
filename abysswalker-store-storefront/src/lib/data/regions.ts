"use server"

import { cache } from "react"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions", { personalized: false })),
  }

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"), { personalized: false })),
  }

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

const getRegionMap = cache(async () => {
  const regions = await listRegions()
  const regionMap = new Map<string, HttpTypes.StoreRegion>()

  regions.forEach((region) => {
    region.countries?.forEach((country) => {
      const countryCode = country.iso_2?.toLowerCase()

      if (countryCode) {
        regionMap.set(countryCode, region)
      }
    })
  })

  return regionMap
})

export const getRegion = async (countryCode: string) => {
  try {
    const regionMap = await getRegionMap()
    const normalizedCountryCode = countryCode?.toLowerCase() || "us"
    const region = regionMap.get(normalizedCountryCode) ?? regionMap.get("us")

    return region
  } catch {
    return null
  }
}

export const listRegionCountryCodes = cache(async () => {
  const regions = await listRegions()

  return Array.from(
    new Set(
      regions.flatMap((region) =>
        region.countries?.map((country) => country.iso_2?.toLowerCase() ?? "") ?? []
      )
    )
  ).filter(Boolean)
})
