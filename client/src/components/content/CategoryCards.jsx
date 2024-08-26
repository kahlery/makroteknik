import React, { useEffect, useState } from "react"

const CategoryCards = () => {
    const [categories, setCategories] = useState([])

    // Array of rainbow colors
    const rainbowColors = ["bg-blue-50", "bg-indigo-50", "bg-sky-50"]

    useEffect(() => {
        fetch("/data/categories.json")
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, [])

    const handleScrollToHeader = (categoryName) => {
        const headers = Array.from(document.querySelectorAll("h2"))
        const header = headers.find((header) =>
            header.textContent.includes(`${categoryName}:`)
        )
        if (header) {
            header.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }

    return (
        <div className="md:px-[16rem] 2xl:px-[25rem] mt-6 px-4">
            <div className="flex flex-wrap gap-4 justify-start no-scrollbar">
                {categories.map((category, index) => (
                    <button
                        key={category.categoryId}
                        className={`p-2 w-[30%] h-11 xl:h-10 sm:w-[22.5%] xl:w-[23.5%] text-[10px] 
                            md:text-[.65rem] hover:opacity-75 bg-white font-bold text-black rounded-full border-black border`}
                        onClick={() =>
                            handleScrollToHeader(category.categoryName)
                        }
                    >
                        {category.categoryName}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryCards
