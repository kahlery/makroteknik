// src/product/components/QuickAccessCategoriesSidebar.jsx

import React from "react"
import { useProductStore } from "../stores/ProductStore"

const QuickAccessCategoriesSidebar = () => {
    const categoriesList = useProductStore((state) => state.categoriesList)

    const handleScrollToHeader = (categoryName) => {
        const headers = Array.from(document.querySelectorAll("h2"))
        const header = headers.find((header) =>
            header.textContent.includes(`${categoryName}:`)
        )
        if (header) {
            window.scrollTo({
                top: header.offsetTop - 100,
                behavior: "smooth",
            })
            header.classList.add(
                "border-b-4",
                "border-secondary",
                "bg-secondary",
                "bg-opacity-20"
            )
            setTimeout(() => {
                header.classList.remove(
                    "border-b-4",
                    "border-secondary",
                    "bg-secondary",
                    "bg-opacity-20"
                )
            }, 1500)
        }
    }

    return (
        <div className="sticky top-[120px] left-4 hidden md:block w-52 px-2 py-4 bg-white rounded-xl shadow-md h-fit">
            <h3 className="font-bold mb-4 text-secondary px-3 pt-2 text-sm uppercase tracking-wide">
                Categories
            </h3>
            <div className="flex flex-col gap-3">
                {categoriesList.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleScrollToHeader(category)}
                        className="text-left text-xs text-black px-3 py-2 rounded-md hover:bg-opacity-90 transition"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickAccessCategoriesSidebar
