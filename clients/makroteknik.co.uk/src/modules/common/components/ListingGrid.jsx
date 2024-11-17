import React, { useEffect, useState } from "react"

// components
import ProductCard from "./ProductCard"
import DetailedProductModal from "./DetailedProductModal"

// store
import { useProductStore } from "../../product/stores/ProductStore"

const ListingGrid = ({
    isFeatured,
    categoryID,
    cartProductIds,
    isHorizontalNorVertical,
    passedProductsList, // Renamed to avoid conflict
}) => {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // Stores
    const productsList =
        passedProductsList ?? useProductStore((state) => state.productsList)
    const categoriesList = useProductStore((state) => state.categoriesList)

    // Render Cart Products
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
    const featuredProducts = isFeatured
        ? renderFeaturedProducts(
              isHorizontalNorVertical
                  ? productsList.filter(
                        (product) => product.categoryID === categoryID
                    )
                  : productsList.slice(0, 8)
          )
        : renderNormalProducts()

    return (
        <div>
            <DetailedProductModal
                isModalOpen={isModalOpen}
                selectedProduct={selectedProduct}
                setIsModalOpen={setIsModalOpen}
            />
            {featuredProducts}
        </div>
    )

    function renderFeaturedProducts(featuredProducts) {
        return (
            <div
                className={`${
                    isHorizontalNorVertical
                        ? "flex flex-wrap justify-center overflow-y-scroll gap-5"
                        : "grid grid-cols-2 xl:grid-cols-4 gap-5"
                }`}
            >
                {categoryID == undefined && (
                    <h2 className="text-start text-sm text-black font-bold col-span-full">
                        Featured Products:
                    </h2>
                )}
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
                } gap-5`}
            >
                {!productsList.length && (
                    <p className="text-start text-sm text-black col-span-full underline-offset-4">
                        No products matched
                    </p>
                )}
                {categoriesList.map((category) => {
                    const categoryProducts = productsList.filter(
                        (product) => product.categoryID === category._id
                    )
                    return (
                        <React.Fragment key={"category_" + category._id}>
                            {!!categoryProducts.length && (
                                <h2 className="text-start text-sm text-black col-span-full underline-offset-4 font-bold">
                                    {category.categoryName}:
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
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
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
