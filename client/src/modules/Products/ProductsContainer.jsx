import React, { useEffect, useState } from "react"

// components
import ListingGrid from "../Common/components/ListingGrid"
import CategoryCards from "./components/QuickAccessCategoriesSection"

// icons
import { FaAngleUp } from "react-icons/fa"

const ProductsContainer = () => {
    // states
    const [productsList, setProductsList] = useState([])
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/products.json")
            .then((response) => response.json())
            .then((data) => setProductsList(data))
            .catch((error) => console.error("Error loading products:", error))

        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollToTop(true)
            } else {
                setShowScrollToTop(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const filteredProductsList = productsList

    return (
        <div>
            <div className="h-12 md:h-24" />
            <CategoryCards />
            <div className="w-screen mt-4 px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    <ListingGrid productsList={filteredProductsList} />
                </div>
            </div>
            {showScrollToTop && (
                <button
                    className="fixed bottom-20 md:bottom-8 right-6 md:right-64 p-3 rounded-full bg-secondary  bg-opacity-100  text-white
                     text-xs shadow-lg hover:bg-black hover:scale-125 transition-all duration-1000 focus:outline-none z-30"
                    onClick={handleScrollToTop}
                >
                    <FaAngleUp size={25} className="text-white" />
                </button>
            )}
        </div>
    )
}

export default ProductsContainer
