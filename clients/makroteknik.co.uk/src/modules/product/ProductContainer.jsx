import React, { useEffect, useState } from "react"
import ListingGrid from "../common/components/ListingGrid"
import CategoryCards from "./components/QuickAccessCategoriesSection"
import { FaAngleUp } from "react-icons/fa"
import { useProductStore } from "./stores/ProductStore"

const ProductContainer = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [scrollingUp, setScrollingUp] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const productsList = useProductStore((state) => state.productsList)
    const searchText = useProductStore((state) => state.searchText)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setScrollingUp(false)
            } else {
                setScrollingUp(true)
            }
            setLastScrollY(window.scrollY)
            setShowScrollToTop(window.scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const filteredProductsList = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <div className="bg-fon">
            <div className="my-28 md:my-36"></div>
            <CategoryCards />
            <div className="w-screen mt-4 px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96 bg-fon">
                <br />
                <div className="mx-4 md:mx-0">
                    <ListingGrid passedProductsList={filteredProductsList} />
                </div>
            </div>
            {showScrollToTop && (
                <button
                    className="fixed bottom-20 md:bottom-8 right-6 md:right-64 p-3 rounded-full
                     bg-secondary text-white shadow-lg hover:bg-black hover:scale-125
                     transition-all duration-1000 focus:outline-none z-30"
                    onClick={handleScrollToTop}
                >
                    <FaAngleUp size={25} />
                </button>
            )}
        </div>
    )
}

export default ProductContainer
