import React, { useEffect, useState } from "react"
import ListingGrid from "../common/components/ListingGrid"
import CategoryCards from "./components/QuickAccessCategoriesSidebar"
import { FaAngleUp } from "react-icons/fa"
import { useProductStore } from "./stores/ProductStore"
import SearchInput from "./components/SearchInput"
import { FilterListSharp } from "@mui/icons-material"
import CategoriesBarMobile from "./components/CategoriesBarMobile"

const ProductContainer = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [scrollingUp, setScrollingUp] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(true)

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

    const filteredProductsList = productsList.filter((product) => {
        const searchLower = searchText.toLowerCase()

        // Match title or product code
        const matchesTitle = product.title?.toLowerCase().includes(searchLower)
        const matchesCode = product.product_code
            ?.toLowerCase()
            .includes(searchLower)

        // Match size–price pairs
        const matchesSizePrice = Object.entries(
            product.size_2_price || {}
        ).some(
            ([size, price]) =>
                size?.toLowerCase().includes(searchLower) ||
                price?.toString().toLowerCase().includes(searchLower)
        )

        return matchesTitle || matchesCode || matchesSizePrice
    })

    // Toggle drawer open/close
    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev)
    }

    return (
        <div className="bg-fon">
            {/* Mobile search bar */}
            <div className="block md:hidden mt-24">
                <SearchInput mobileView={true} />
            </div>

            <CategoryCards />
            {/* Pass drawerOpen and a close handler */}
            <CategoriesBarMobile
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <div className="w-screen -mt-2 md:mt-16 px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96 bg-fon">
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

            <button
                className="fixed top-64 md:hidden left-0 md:right-64 p-3 rounded-r-full
                     bg-black/50 text-white shadow-lg hover:bg-black hover:scale-125
                     transition-all duration-1000 focus:outline-none z-30"
                onClick={toggleDrawer}
            >
                <FilterListSharp size={25} />
            </button>
        </div>
    )
}

export default ProductContainer
