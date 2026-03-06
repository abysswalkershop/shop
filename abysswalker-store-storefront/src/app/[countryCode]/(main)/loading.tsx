export default function MainLoading() {
    return (
        <main className="content-container py-16">
            <div className="space-y-6">
                <div className="h-8 w-48 animate-pulse rounded bg-abyss-dark-accent" />
                <div className="grid gap-4 small:grid-cols-2 xl:grid-cols-3">
                    <div className="aspect-[4/5] animate-pulse rounded bg-abyss-dark-accent" />
                    <div className="aspect-[4/5] animate-pulse rounded bg-abyss-dark-accent" />
                    <div className="aspect-[4/5] animate-pulse rounded bg-abyss-dark-accent" />
                </div>
            </div>
        </main>
    )
}