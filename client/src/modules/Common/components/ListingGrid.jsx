import React, { useEffect, useState } from "react"

// components
import ProductCard from "./ProductCard"
import DetailedProductModal from "./DetailedProductModal"

// store
import { useProductStore } from "../../Products/stores/ProductStore"

const ListingGrid = ({
    isFeatured,
    categoryId,
    cartProductIds,
    isHorizontalNorVertical,
}) => {
    // States
    const [categories, setCategories] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    // Stores
    const productsList = useProductStore((state) => state.productsList)

    // Load categories only once
    useEffect(() => {
        const categoriesListUrl =
            process.env.PUBLIC_URL + "/data/categories.json"
        fetch(categoriesListUrl)
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error loading categories:", error))
    }, [])

    // cart products
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

    // normal products
    if (!isFeatured) {
        return (
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen}
                    selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen}
                />
                {renderNormalProducts()}
            </div>
        )
    }

    // featured products
    else {
        let featuredProducts = productsList.slice(0, 8)

        return (
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen}
                    selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen}
                />
                {renderFeaturedProducts(featuredProducts)}
            </div>
        )
    }

    function renderFeaturedProducts(featuredProducts) {
        return (
            <div
                className={`${
                    isHorizontalNorVertical
                        ? "flex flex-wrap justify-center overflow-y-scroll gap-5"
                        : "grid grid-cols-2 xl:grid-cols-4 gap-5"
                }`}
            >
                {categoryId == undefined && (
                    <h2 className="text-start text-sm text-black col-span-full">
                        Featured Products:
                    </h2>
                )}
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product.productId}
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
                        : "grid grid-cols-2 xl:grid-cols-4 gap-5"
                } gap-5`}
            >
                {!productsList.length && (
                    <p className="text-start text-sm text-black col-span-full  underline-offset-4">
                        Loading Products...
                    </p>
                )}
                {categories.map((category) => {
                    const categoryProducts = productsList.filter(
                        (product) => product.categoryId === category.categoryId
                    )
                    const shouldHide = categoryProducts.length === 0
                    return (
                        <React.Fragment key={"category_" + category.categoryId}>
                            {!shouldHide && (
                                <h2 className="text-start text-sm text-black col-span-full underline-offset-4 transition-all duration-[1s]">
                                    {category.categoryName}:
                                </h2>
                            )}
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                    isHorizontalNorVertical={
                                        isHorizontalNorVertical
                                    }
                                    setSelectedProduct={setSelectedProduct}
                                    setIsModalOpen={setIsModalOpen}
                                />
                            ))}
                            <hr className="col-span-full border-black border-opacity-20 border-dashed" />
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
                    .filter((product) =>
                        cartProductIds.includes(product.productId)
                    )
                    .map((product) => (
                        <ProductCard
                            key={product.productId}
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
