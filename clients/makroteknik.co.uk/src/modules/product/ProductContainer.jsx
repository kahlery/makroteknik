import React, { useEffect, useState } from "react"

// components
import ListingGrid from "../common/components/ListingGrid"
import CategoryCards from "./components/QuickAccessCategoriesSection"

// icons
import { FaAngleUp } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"

// stores
import { useProductStore } from "./stores/ProductStore"

const ProductContainer = () => {
    // states
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [scrollingUp, setScrollingUp] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // stores
    const productsList = useProductStore((state) => state.productsList)

    useEffect(() => {
        const handleScroll = () => {
            // Detect scroll direction
            if (window.scrollY > lastScrollY) {
                setScrollingUp(false) // Scrolling down
            } else {
                setScrollingUp(true) // Scrolling up
            }
            setLastScrollY(window.scrollY)

            // Show the scroll-to-top button
            setShowScrollToTop(window.scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollY])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Filter products based on search query
    const filteredProductsList = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="h-full w-full bg-fon">
            <div className="md:h-24 pt-20 md:mt-6 bg-fon" />
            {renderSearchBar()}
            <br />
            <br />
            <CategoryCards />
            <div
                className="w-screen mt-4 px-0 md:px-[16rem] 2xl:px-[25rem] 
                pt-4 pb-10 min-h-96 bg-fon"
            >
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

    function renderSearchBar() {
        return (
            <div
                className={`w-full h-12 fixed flex flex-row justify-center bg-white  items-center gap-0 p-0 px-4 md:px-[16rem] 2xl:px-[25rem] 
                text-md border-black border-y border-opacity-40 py-[5px] transition-all duration-500 top-[50px] md:top-[90px]
                ${
                    scrollingUp
                        ? "transform translate-y-0 z-50"
                        : "transform -translate-y-20 z-0"
                }`}
            >
                <FaSearch className="p-1 text-black" size={"25px"} />
                <input
                    type="text"
                    placeholder="search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-1 bg-white  text-black focus:outline-none 
                    placeholder-opacity-100"
                />
            </div>
        )
    }
}

export default ProductContainer
