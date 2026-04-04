"use client"

import { useEffect } from "react"

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function MainError({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="content-container flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24 text-abyss-text-light">
            <p className="text-sm uppercase tracking-[0.3em] text-abyss-medium-accent">
                Storefront error
            </p>
            <h1 className="text-4xl font-semibold">This page could not be loaded.</h1>
            <p className="max-w-xl text-base text-abyss-text-light/80">
                The request failed inside the main storefront routes. Retry the page, or come back later if the problem persists.
            </p>
            <button
                type="button"
                onClick={() => reset()}
                className="rounded-md border border-abyss-medium-accent px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-abyss-light-accent hover:text-abyss-light-accent"
            >
                Try again
            </button>
        </main>
    )
}