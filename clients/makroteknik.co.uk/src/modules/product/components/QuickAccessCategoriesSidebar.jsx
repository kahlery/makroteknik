import React, { useEffect, useState } from "react"
import { useProductStore } from "../stores/ProductStore"

const QuickAccessCategoriesSidebar = () => {
    const categoriesList = useProductStore((state) => state.categoriesList)
    const [activeCategory, setActiveCategory] = useState(null)

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
        }
    }

    // Track which header is closest to top of viewport
    useEffect(() => {
        const handleScroll = () => {
            const headers = Array.from(document.querySelectorAll("h2"))
            let closestHeader = null
            let minDistance = Infinity

            headers.forEach((header) => {
                const rect = header.getBoundingClientRect()
                const distance = Math.abs(rect.top - 100) // 100 is offset to account for sticky header

                if (rect.top <= 150 && distance < minDistance) {
                    minDistance = distance
                    closestHeader = header
                }
            })

            if (closestHeader) {
                const closestCategory = categoriesList.find((category) =>
                    closestHeader.textContent.includes(category)
                )
                if (closestCategory && closestCategory !== activeCategory) {
                    setActiveCategory(closestCategory)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [categoriesList, activeCategory])

    return (
        <div className="z-50 sticky top-[130px] h-0 left-0 xl:left-[25px] 2xl:left-[160px] hidden md:block w-52 px-2 py-4 text-end">
            <div className="flex flex-col">
                {categoriesList.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleScrollToHeader(category)}
                        className={`text-xs border-r-4 px-3 py-[14px] text-end transition text-black ${
                            activeCategory === category
                                ? "border-secondary bg-secondary/10 font-bold text-lg"
                                : "border-black/10 hover:bg-black/5"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuickAccessCategoriesSidebar
