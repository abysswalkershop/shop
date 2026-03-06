"use client"

import { createContext, useContext } from "react"
import { useParams } from "next/navigation"

type CountryContextValue = {
    countryCode: string
}

const CountryContext = createContext<CountryContextValue | null>(null)

type CountryProviderProps = {
    children: React.ReactNode
    countryCode: string
}

export const CountryProvider = ({
    children,
    countryCode,
}: CountryProviderProps) => {
    return (
        <CountryContext.Provider value={{ countryCode }}>
            {children}
        </CountryContext.Provider>
    )
}

export const useCountryCode = () => {
    const context = useContext(CountryContext)
    const params = useParams<{ countryCode: string | string[] }>()

    if (context) {
        return context.countryCode
    }

    return typeof params.countryCode === "string" ? params.countryCode : ""
}