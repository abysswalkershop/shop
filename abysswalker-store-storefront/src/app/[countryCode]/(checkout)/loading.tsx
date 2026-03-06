export default function CheckoutLoading() {
    return (
        <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
            <div className="space-y-6">
                <div className="h-8 w-40 animate-pulse rounded bg-abyss-dark-accent" />
                <div className="h-56 animate-pulse rounded bg-abyss-dark-accent" />
                <div className="h-48 animate-pulse rounded bg-abyss-dark-accent" />
            </div>
            <div className="h-96 animate-pulse rounded bg-abyss-dark-accent" />
        </div>
    )
}