import { listCategories } from "@lib/data/categories"
import { toCategoryNavigation } from "@lib/util/category-navigation"

import RefinementList from "."
import { SortOptions } from "./sort-products"

export default async function ServerRefinementList({
    sortBy,
    countryCode,
}: {
    sortBy: SortOptions
    countryCode?: string
}) {
    const categories = await listCategories()

    return (
        <RefinementList
            sortBy={sortBy}
            categories={categories.map(toCategoryNavigation)}
            countryCode={countryCode}
        />
    )
}
