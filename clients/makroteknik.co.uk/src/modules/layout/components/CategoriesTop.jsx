import React, { useState, useEffect } from "react"

// router v6
import { useLocation } from "react-router-dom"

// icons
import { Swipe } from "@mui/icons-material"
import { FaAngleDown } from "react-icons/fa"

// stores
import { useProductStore } from "../../product/stores/ProductStore"

// components
import ListingGrid from "../../common/components/ListingGrid"

const CategoriesTop = () => {
    // states
    const [hoveredcategoryID, setHoveredcategoryID] = useState(null)
    const [hoverTimeout, setHoverTimeout] = useState(null)

    // stores
    const categoriesList = useProductStore((state) => state.categoriesList)

    // hooks
    const location = useLocation()

    // start opacity-0 to opacity-100
    useEffect(() => {
        const hoverDropdown = document.getElementById("hover-dropdown")

        // get all category buttons
        const categoryButtons = document.querySelectorAll(".category-button")

        if (hoverDropdown) {
            hoverDropdown.style.opacity = 1
            categoryButtons.forEach((button) => {
                button.style.opacity = 0
            })
        } else {
            categoryButtons.forEach((button) => {
                button.style.opacity = 1
            })
        }
    }, [hoveredcategoryID])

    const handleMouseEnter = (categoryID) => {
        const timeout = setTimeout(() => {
            setHoveredcategoryID(categoryID)
        }, 200)
        setHoverTimeout(timeout)
    }

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
        }
        setHoveredcategoryID(null)
    }

    const isCategoryHovered = (categoryID) => {
        return categoryID === hoveredcategoryID
    }

    if (
        !location.pathname.endsWith("/products") &&
        !location.pathname.endsWith("/about") &&
        !location.pathname.endsWith("/cart")
    ) {
        return (
            <>
                <div
                    className="h-fit bg-secondary shadow-md fixed top-[50px] sm:top-[90px] z-50 w-screen text-[10.2px] cursor-pointer"
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="grid md:grid-rows-2 grid-flow-col md:flex
                         md:flex-wrap text-center md:justify-center gap-x-6 gap-y-2 
                         py-[8px] overflow-x-scroll md:overflow-x-clip px-4 md:px-[16rem] 2xl:px-[25rem]"
                    >
                        {categoriesList.map((category) => (
                            <div
                                key={category._id}
                                className="static z-40 flex items-center gap-[1px]"
                            >
                                {/* Hover dropdown */}
                                {isCategoryHovered(category._id) &&
                                    !location.pathname.endsWith(
                                        "/products"
                                    ) && (
                                        <div
                                            id="hover-dropdown"
                                            className="fixed top-[85px] md:top-[90px] h-full 2xl:top-[90px] left-0 flex flex-wrap w-screen z-[999]"
                                        >
                                            <div
                                                className="text-black overflow-y-scroll text-left
                                            items-center w-screen border-t border-black border-opacity-20 bg-[999] bg-fon
                                             bg-opacity-[95%] shadow-lg px-4 md:px-4 py-4
                                            h-[calc(100vh-100px)]
                                            "
                                            >
                                                <div className="flex flex-col gap-4">
                                                    {/* Dropdown menu content */}
                                                    {/* <button
                                                        className="flex mx-auto w-fit rounded-full bg-red-500 bg-opacity-100"
                                                        onClick={() =>
                                                            setHoveredcategoryID(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <span className="text-red-700 text-xs px-4 py-2 rounded-full font-bold">
                                                            Close
                                                        </span>
                                                    </button> */}
                                                    <div>
                                                        <ListingGrid
                                                            categoryID={
                                                                category._id
                                                            }
                                                            isFeatured={true}
                                                            isHorizontalNorVertical={
                                                                true
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                <button
                                    className={
                                        "category-button hover:scale-105 select-none duration-500 text-white py-[5px] text-nowrap border-black border-opacity-20 font-semibold"
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter(category._id)
                                    }
                                    onMouseLeave={() => {
                                        if (hoverTimeout) {
                                            clearTimeout(hoverTimeout)
                                        }
                                    }}
                                >
                                    {category.categoryName}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div
                        className="category-button absolute top-[25px] sm:top-48 md:hidden right-4
                         md:right-64 md:-rotate-12 items-center gap-2 text-xs
                    z-40 text-black text-opacity-50 p-2 pointer-events-none"
                    >
                        {/* <span className="md:hidden">Swipe to see more</span> */}
                        <Swipe className="mx-1" />
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
}

export default CategoriesTop
