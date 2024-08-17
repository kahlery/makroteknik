import React from "react"
import { ShoppingCart, Close } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import { useCartStore } from "../../stores/CartStore"
import AdjustCartProduct from "./AdjustCartProduct"
import { set } from "mongoose"

const DetailedProductModal = ({
    isModalOpen,
    selectedProduct,
    setIsModalOpen,
}) => {
    const addProducts = useCartStore((state) => state.addProducts)
    const removeProducts = useCartStore((state) => state.removeProducts)
    const incrementProductQuantity = useCartStore(
        (state) => state.incrementProductQuantity
    )
    const decrementProductQuantity = useCartStore(
        (state) => state.decrementProductQuantity
    )
    const cartProducts = useCartStore((state) => state.cartProducts)

    if (!selectedProduct) return null

    const isCartProduct = cartProducts[selectedProduct.productId]
    const quantity = isCartProduct || 0

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-80 z-50
                flex justify-center items-center
                 ${
                     isModalOpen
                         ? ""
                         : "transition-opacity duration-[1.6s] opacity-0 pointer-events-none"
                 }`}
            onClick={() => {
                setIsModalOpen(false)
            }}
        >
            {isModalOpen && selectedProduct && (
                <div
                    className="relative flex flex-col gap-2 bg-white md:w-fit h-[75%] md:h-fit mt-16 md:max-h-none p-4 m-4 md:m-0 shadow-lg overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="md:absolute fixed right-10 md:right-6 top-[20%] md:top-4 flex rounded-full bg-blue-200 bg-opacity-50">
                        <IconButton
                            className="absolute ml-auto text-black bg-red-500"
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        >
                            <Close />
                        </IconButton>
                    </div>
                    <div className="flex flex-col md:flex-row items-center h-fit">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                selectedProduct.imageUrl
                            }
                            alt={selectedProduct.title}
                            className="md:w-[30vw] object-cover mr-0 mb-4 md:my-0"
                        />
                        <div className="flex flex-col md:w-1/2 justify-between h-full md:ml-8 md:mr-4 my-8">
                            <h2 className="text-2xl text-black font-bold mb-2">
                                {selectedProduct.title}
                            </h2>
                            <hr className="border-gray-200 shadow-md mb-3" />
                            <div className="mb-4 gap-6 flex flex-col overflow-y-scroll max-h-[35vh]">
                                {selectedProduct.sizeToPrice.map(
                                    (sizePrice, index) => {
                                        const [size, price] =
                                            Object.entries(sizePrice)[0]
                                        return (
                                            <div
                                                className="flex items-center"
                                                key={index}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <p className="text-black text-[1rem]">
                                                        {size}
                                                    </p>
                                                    <p className="text-black font-bold text-nowrap text-[1rem] ml-4">
                                                        {price}
                                                    </p>
                                                </div>
                                                <AdjustCartProduct
                                                    productId={
                                                        selectedProduct.productId
                                                    }
                                                    className="ml-8"
                                                    size={size}
                                                    price={price}
                                                />
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                            <button
                                className="bg-black text-white font-bold px-4 py-2 rounded-md w-full shadow-lg mt-auto"
                                onClick={() => {
                                    setIsModalOpen(false)
                                }}
                            >
                                <ShoppingCart
                                    className="text-white mr-2"
                                    sx={{ fontSize: "1rem" }}
                                />
                                Save to Cart
                            </button>
                        </div>
                    </div>
                    {/* <hr className="border-gray-200 shadow-md my-3 mx-4" />
                    <div className="flex flex-col md:flex-row items-center max-w-[65vw] self-center">
                        <p className="text-black text-[1.2rem]">
                            {selectedProduct.description}
                        </p>
                    </div> */}
                </div>
            )}
        </div>
    )
}

export default DetailedProductModal
