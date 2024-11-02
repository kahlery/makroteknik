import React, { useEffect, useState } from "react"

// components
import ListingGrid from "../Common/components/ListingGrid"
import CategoryCards from "./components/QuickAccessCategoriesSection"

// icons
import { FaAngleUp } from "react-icons/fa"

// stores
import { useProductStore } from "./stores/ProductStore"

const ProductsContainer = () => {
    // states
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // stores
    const productsList = useProductStore((state) => state.productsList)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Filter products based on search query
    const filteredProductsList = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            <div className="h-12 md:h-24" />
            {/* Search Bar */}
            <div className="w-full bg-white p-4 shadow-md z-10">
                <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <CategoryCards />
            <div className="w-screen mt-4 px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    <ListingGrid passedProductsList={filteredProductsList} />
                </div>
            </div>
            {showScrollToTop && (
                <button
                    className="fixed bottom-20 md:bottom-8 right-6 md:right-64 p-3 rounded-full bg-secondary text-white shadow-lg hover:bg-black hover:scale-125 transition-all duration-1000 focus:outline-none z-30"
                    onClick={handleScrollToTop}
                >
                    <FaAngleUp size={25} />
                </button>
            )}
        </div>
    )
}

export default ProductsContainer
