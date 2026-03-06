"use client"

import { clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryTreeNode = {
    id: string
    name: string
    handle: string
    parent_category?: {
        id?: string
    } | null
    category_children?: CategoryTreeNode[] | null
}

type CategoryTreeProps = {
    categories: CategoryTreeNode[]
    className?: string
    nestedClassName?: string
    itemClassName?: string
    linkClassName?: string
    parentLinkClassName?: string
    nestedItemClassName?: string
    dataTestId?: string
}

const CategoryTree = ({
    categories,
    className,
    nestedClassName,
    itemClassName,
    linkClassName,
    parentLinkClassName,
    nestedItemClassName,
    dataTestId,
}: CategoryTreeProps) => {
    const rootCategories = categories.filter((category) => !category.parent_category)

    if (!rootCategories.length) {
        return null
    }

    const renderCategoryNodes = (
        nodes: CategoryTreeNode[],
        depth = 0
    ): React.ReactNode => {
        return (
            <ul
                className={depth === 0 ? className : nestedClassName}
                data-testid={depth === 0 ? dataTestId : undefined}
            >
                {nodes.map((category) => {
                    const children = category.category_children?.filter(Boolean) ?? []
                    const hasChildren = children.length > 0

                    return (
                        <li
                            className={clx(
                                itemClassName,
                                depth > 0 && nestedItemClassName
                            )}
                            key={category.id}
                        >
                            <LocalizedClientLink
                                className={clx(
                                    linkClassName,
                                    depth === 0 && hasChildren && parentLinkClassName
                                )}
                                href={`/categories/${category.handle}`}
                                data-testid="category-link"
                            >
                                {category.name}
                            </LocalizedClientLink>
                            {hasChildren && renderCategoryNodes(children, depth + 1)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return renderCategoryNodes(rootCategories)
}

export default CategoryTree