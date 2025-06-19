"use client"

import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment, useState } from "react"

type Category = {
    id: string
    name: string
    handle: string
    category_children?: Category[]
    parent_category?: any
}

const CategoryItem = ({ category }: { category: Category }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const open = () => setDropdownOpen(true)
    const close = () => setDropdownOpen(false)

    const hasChildren = category.category_children && category.category_children.length > 0

    if (!hasChildren) {
        // Simple link for categories without children
        return (
            <LocalizedClientLink
                className="hover:text-ui-fg-base h-full flex items-center txt-small-plus"
                href={`/categories/${category.handle}`}
                data-testid="category-link"
            >
                {category.name}
            </LocalizedClientLink>
        )
    }

    // Dropdown for categories with children
    return (
        <div
            className="h-full z-50"
            onMouseEnter={open}
            onMouseLeave={close}
        >
            <Popover className="relative h-full">
                <PopoverButton className="h-full">
                    <LocalizedClientLink
                        className="hover:text-ui-fg-base h-full flex items-center txt-small-plus"
                        href={`/categories/${category.handle}`}
                        data-testid="category-link"
                    >
                        {category.name}
                    </LocalizedClientLink>
                </PopoverButton>
                <Transition
                    show={dropdownOpen}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <PopoverPanel
                        static
                        className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[250px] text-ui-fg-base"
                        data-testid="nav-category-dropdown"
                    >
                        <div className="p-4 space-y-2">
                            {category.category_children?.map((child) => (
                                <LocalizedClientLink
                                    key={child.id}
                                    href={`/categories/${child.handle}`}
                                    className="block py-2 px-3 text-small-regular text-ui-fg-subtle hover:text-ui-fg-base hover:bg-gray-50 rounded-md transition-colors"
                                    data-testid="category-child-link"
                                >
                                    {child.name}
                                </LocalizedClientLink>
                            ))}
                        </div>
                    </PopoverPanel>
                </Transition>
            </Popover>
        </div>
    )
}

const CategoriesNavigation = ({
    categories,
}: {
    categories: Category[]
}) => {
    // Filter to only show parent categories (categories without parent_category)
    const parentCategories = categories.filter(category => !category.parent_category)

    if (!parentCategories || parentCategories.length === 0) {
        return null
    }
    return (
        <>
            {parentCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </>
    )
}

export default CategoriesNavigation
