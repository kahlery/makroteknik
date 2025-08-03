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
                ${isHorizontalNorVertical ? "w-48" : ""} ${
                isCartProduct
                    ? " shadow-[_5px_5px_rgba(0,_98,_90,_0.2),_10px_10px_rgba(0,_98,_90,_0.1),_15px_15px_rgba(0,_98,_90,_0.05)]"
                    : "shadow-2xs"
            }`}
            onClick={() => {
                // show product detail in a modal
                console.log("product detail:", product._id)
                setSelectedProduct(product)
                setIsModalOpen(true)
            }}
        >
            <img
                src={product.image_url}
                alt={product.title}
                className="

                object-cover 
                p-4
                "
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
                    ) : (
                        <></>
                    )}
                </div>
                <div className="w-fit text-xs flex">
                    <p className="text-black text-opacity-80 pt-[1.6px] flex gap-1 items-center">
                        <TbRulerMeasure size={15} />
                        {product.size_2_price
                            ? Object.keys(product.size_2_price).length
                            : 1}
                        &nbsp;Size Available
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
