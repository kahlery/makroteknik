import React from "react"

// icons
import { TbRulerMeasure } from "react-icons/tb"

// stores
import { useCartStore } from "../../cart/stores/CartStore"

const ProductCard = ({
    product,
    isHorizontalNorVertical,
    setSelectedProduct,
    setIsModalOpen,
}) => {
    // stores
    const isCartProduct = useCartStore(
        (state) => state.cartProducts[product._id]
    )

    return (
        <div
            key={product._id}
            className={`
            bg-white 
            md:min-w-[200px] 
            h-90
            relative flex flex-col text-sm
            border border-gray-200
            duration-[1000ms] pb-4
            hover:scale-100 hover:cursor-pointer hover:shadow-2xl
            ${isHorizontalNorVertical ? "w-48" : ""} 
            shadow-2xs
        `}
            onClick={() => {
                setSelectedProduct(product)
                setIsModalOpen(true)
            }}
        >
            {/* In Cart Badge */}
            {isCartProduct && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-[2px] rounded-full shadow-md z-10">
                    In Cart
                </div>
            )}

            <img
                src={product.image_url}
                alt={product.title}
                className="h-36 object-scale-down p-4"
            />
            <hr className="my-3 opacity-0" />
            <div className="px-3 md:px-4 flex flex-col h-full gap-[.30rem]">
                <h2 className="text-xs h-4 text-black font-bold line-clamp-4">
                    {product.title}
                </h2>
                <p className="text-xs text-black text-opacity-60 mt-auto">
                    {product.product_code}
                </p>
                <div className="text-xs text-black text-opacity-60 flex">
                    {product.size_2_price &&
                    Object.values(product.size_2_price)[1] ? (
                        <div className="flex gap-2">
                            <p className="text-1 py-[1.6px]">from</p>
                            <p className="text-secondary py-[1.6px]">
                                {Object.values(product.size_2_price)[1]}
                            </p>
                        </div>
                    ) : null}
                </div>
                <div className="w-fit text-xs flex">
                    {product.size_2_price &&
                        Object.keys(product.size_2_price).length > 1 && (
                            <p className="text-black text-opacity-80 pt-[1.6px] flex gap-1 items-center">
                                <TbRulerMeasure size={15} />
                                {Object.keys(product.size_2_price).length}{" "}
                                &nbsp;Size Available
                            </p>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
