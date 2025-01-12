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
        <div className="md:px-[16rem] 2xl:px-[25rem] mt-6 px-4 bg-fon">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-start no-scrollbar">
                {categoriesList.map((category, index) => (
                    <button
                        key={category._id}
                        className={`p-3 h-12 xl:h-12 
                            w-full
                            text-xs
                         hover:opacity-90 bg-gradient-to-r from-secondary to-cyan-600 font-semibold text-white shadow-lg transform transition-transform duration-300 hover:scale-105`}
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
