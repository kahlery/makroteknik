import React from "react"
import { ShoppingCart } from "@mui/icons-material"
import { TbRulerMeasure } from "react-icons/tb"

// stores
import { useCartStore } from "../../Cart/stores/CartStore"

const ProductCard = ({
    product,
    isHorizontalNorVertical,
    setSelectedProduct,
    setIsModalOpen,
}) => {
    // stores
    const isCartProduct = useCartStore(
        (state) => state.cartProducts[product.productId]
    )

    return (
        <div
            key={product.productId}
            className={`bg-white md:min-w-[200px] rounded-md relative flex flex-col text-sm duration-1000 h-90 border-black border-opacity-20 border shadow-sm pb-4
            hover:scale-100 hover:cursor-pointer hover:border-black
            ${isHorizontalNorVertical ? "w-48" : ""} ${
                isCartProduct
                    ? " shadow-[_5px_5px_rgba(0,_98,_90,_0.2),_10px_10px_rgba(0,_98,_90,_0.1),_15px_15px_rgba(0,_98,_90,_0.05)]"
                    : " "
            }`}
            onClick={() => {
                // show product detail in a modal
                console.log("product detail:", product.productId)
                setSelectedProduct(product)
                setIsModalOpen(true)
            }}
        >
            <img
                src={process.env.PUBLIC_URL + product.imageUrl}
                alt={product.title}
                className="h-36 object-scale-down p-4 min-h-32"
            />
            <hr className="border-gray-200 shadow-md my-3 mx-4" />
            <div className="px-3 md:px-4 flex flex-col h-full gap-[.35rem]">
                <h2 className="text-xs h-4 text-black font-bold line-clamp-4">
                    {product.title}
                </h2>
                <p className="text-xs text-black text-opacity-60 mt-auto">
                    {product.productCode}
                </p>
                <div className="text-xs text-black text-opacity-60 flex">
                    {product.sizeToPrice && product.sizeToPrice.length > 0 ? (
                        (() => {
                            const [_, price] = Object.entries(
                                product.sizeToPrice[0]
                            )[0] // Extract size and price from the first entry
                            return (
                                <p className="text-green-700 py-[1.6px]">
                                    {price}
                                </p>
                            )
                        })()
                    ) : (
                        <p className="text-red-700 py-[1.6px]">
                            No Prices Available
                        </p>
                    )}
                </div>
                <div className="bg-secondary bg-opacity-10 w-fit text-xs flex">
                    <p className="text-black pt-[1.6px] flex gap-1 items-center">
                        <TbRulerMeasure size={15} />
                        {product.sizeToPrice ? product.sizeToPrice.length : 1}
                        &nbsp;Size(s) Available
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
