import React, { useEffect, useState } from "react"

// stores
import { useProductStore } from "../stores/ProductStore"

// icons
import { FaAngleRight } from "react-icons/fa"

const QuickAccessCategoriesSection = () => {
    const categoriesList = useProductStore((state) => state.categoriesList)

    const handleScrollToHeader = (categoryName) => {
        const headers = Array.from(document.querySelectorAll("h2"))
        const header = headers.find((header) =>
            header.textContent.includes(`${categoryName}:`)
        )
        if (header) {
            // scroll to the header smoothly but add 100px offset
            window.scrollTo({
                top: header.offsetTop - 100,
                behavior: "smooth",
            })

            // highlight the category
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
        <div className="md:px-[16rem] 2xl:px-[25rem] mt-6 px-4">
            <div className="flex flex-wrap gap-4 justify-start no-scrollbar">
                {categoriesList.map((category, index) => (
                    <button
                        key={category.categoryId}
                        className={`p-2 w-[30%] h-11 xl:h-10 sm:w-[22.5%] xl:w-[23.5%] text-[10px]
                            md:text-[.65rem] hover:opacity-75 bg-secondary font-bold text-white rounded-full`}
                        onClick={() =>
                            handleScrollToHeader(category.categoryName)
                        }
                    >
                        {category.categoryName}
                        {/* <FaAngleRight className="text-secondary text-[1rem]" /> */}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickAccessCategoriesSection
