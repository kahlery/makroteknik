import React, { useEffect, useState } from "react"
import { useProductStore } from "../stores/ProductStore"

const CategoriesBarMobile = ({ isOpen, onClose }) => {
    const categoriesList = useProductStore((state) => state.categoriesList)
    const [activeCategory, setActiveCategory] = useState(null)

    if (!isOpen) return null

    const handleScrollToHeader = (categoryName) => {
        const headers = Array.from(document.querySelectorAll("h2"))
        const header = headers.find((header) =>
            header.textContent.includes(`${categoryName}`)
        )
        if (header) {
            window.scrollTo({
                top: header.offsetTop - 100,
                behavior: "smooth",
            })
            setActiveCategory(categoryName)
            onClose() // Close the mobile bar after selection
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        >
            <div
                className="fixed top-0 left-0 w-64 h-full bg-white z-50 p-4 overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="mb-4 px-3 py-2 bg-gray-200 rounded"
                >
                    Close
                </button>
                <div className="flex flex-col space-y-2">
                    {categoriesList.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleScrollToHeader(category)}
                            className={`text-left px-3 py-2 border-l-4 transition ${
                                activeCategory === category
                                    ? "border-secondary bg-secondary/10 font-bold"
                                    : "border-transparent hover:border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesBarMobile
