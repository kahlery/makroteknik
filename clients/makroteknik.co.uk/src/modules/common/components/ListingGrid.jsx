import React, { useEffect, useState } from "react"

import { Box, Typography, Grid } from "@mui/material"

// components
import ProductCard from "./ProductCard"
import DetailedProductModal from "./DetailedProductModal"

// store
import { useProductStore } from "../../product/stores/ProductStore"

const ListingGrid = ({
    isFeatured,
    cartProductIds,
    isHorizontalNorVertical,
    passedProductsList, // Renamed to avoid conflict
    filteredCategory,
}) => {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // Stores
    const productsList =
        passedProductsList ?? useProductStore((state) => state.productsList)
    const categoriesList = useProductStore((state) => state.categoriesList)

    // --------------------------------------------------------------------

    // Templates
    // 1. cart
    if (cartProductIds) {
        return (
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen}
                    selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen}
                />
                {renderCartProducts()}
            </div>
        )
    }

    // Render Featured or Normal Products
    const finalProducts = isFeatured
        ? renderFeaturedProducts(
              isHorizontalNorVertical
                  ? productsList.filter(
                        (product) => product.category === filteredCategory
                    )
                  : productsList.slice(0, 8)
          )
        : renderNormalProducts()

    // 2. featured | normal
    return (
        <div>
            <DetailedProductModal
                isModalOpen={isModalOpen}
                selectedProduct={selectedProduct}
                setIsModalOpen={setIsModalOpen}
            />
            {finalProducts}
        </div>
    )

    // --------------------------------------------------------------------

    function renderFeaturedProducts(featuredProducts) {
        return (
            <div
                className={`${
                    isHorizontalNorVertical
                        ? "flex flex-wrap justify-center overflow-y-scroll gap-8"
                        : "grid grid-cols-2 xl:grid-cols-4 gap-8"
                }`}
            >
                {/* {category == undefined && (
                    <h2 className="text-start text-sm text-black font-bold col-span-full">
                        Featured Products:
                    </h2>
                )} */}
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        isHorizontalNorVertical={isHorizontalNorVertical}
                        setSelectedProduct={setSelectedProduct}
                        setIsModalOpen={setIsModalOpen}
                    />
                ))}
            </div>
        )
    }

    function renderNormalProducts() {
        return (
            <div
                className={`${
                    isHorizontalNorVertical
                        ? "flex flex-nowrap"
                        : "grid grid-cols-2 xl:grid-cols-4"
                } gap-8`}
            >
                {!productsList.length && (
                    <p className="text-start text-sm text-black col-span-full underline-offset-4">
                        No products matched
                    </p>
                )}
                {categoriesList.map((category) => {
                    const categoryProducts = productsList.filter(
                        (product) => product.category === category
                    )
                    return (
                        <React.Fragment key={category}>
                            {!!categoryProducts.length && (
                                <h2
                                    className="
                                    text-center text-lg bg-secondary text-white
py-1 sticky px-4  col-span-full underline-offset-4 font-bold"
                                >
                                    {category}
                                </h2>
                            )}
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    isHorizontalNorVertical={
                                        isHorizontalNorVertical
                                    }
                                    setSelectedProduct={setSelectedProduct}
                                    setIsModalOpen={setIsModalOpen}
                                />
                            ))}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }

    function renderCartProducts() {
        return (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
                {productsList
                    .filter((product) => cartProductIds.includes(product._id))
                    .map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isHorizontalNorVertical={isHorizontalNorVertical}
                            setSelectedProduct={setSelectedProduct}
                            setIsModalOpen={setIsModalOpen}
                            isCartProduct={true}
                        />
                    ))}
            </div>
        )
    }
}

export default ListingGrid
