"use client"

import { useEffect } from "react"

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="en">
            <body className="bg-abyss-background text-abyss-text-light">
                <main className="content-container flex min-h-screen flex-col items-start justify-center gap-6 py-24">
                    <p className="text-sm uppercase tracking-[0.3em] text-abyss-medium-accent">
                        Storefront error
                    </p>
                    <h1 className="text-4xl font-semibold">Something went wrong.</h1>
                    <p className="max-w-xl text-base text-abyss-text-light/80">
                        The storefront hit an unexpected error. Try the request again, or return later if the problem persists.
                    </p>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="rounded-md border border-abyss-medium-accent px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-abyss-light-accent hover:text-abyss-light-accent"
                    >
                        Try again
                    </button>
                </main>
            </body>
        </html>
    )
}