import React, { useState } from "react"
import { ShoppingCart, Close } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import { useCartStore } from "../../stores/CartStore"

const DetailedProductModal = ({
    isModalOpen,
    selectedProduct,
    setIsModalOpen,
}) => {
    // states
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)

    // stores
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
            className={`fixed left-0 top-0 w-screen h-[100svh] z-[10000] flex flex-col justify-center items-center transition-opacity duration-[.5s] gap-8 bg-black bg-opacity-70
                 ${
                     isModalOpen
                         ? "opacity-100"
                         : "opacity-0 pointer-events-none"
                 }`}
            onClick={() => {
                setIsModalOpen(false)
            }}
        >
            {isModalOpen && selectedProduct && (
                <>
                    <div
                        className="relative flex flex-col gap-2 mt-2 rounded-xl bg-white md:w-fit h-[80%] md:h-fit md:max-h-none p-4 mx-5 md:m-0 overflow-y-scroll"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row items-center h-fit">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    selectedProduct.imageUrl
                                }
                                alt={selectedProduct.title}
                                className="hidden md:flex md:w-[30vw] object-cover mr-0 mb-4 md:my-0 rounded-md border border-black border-opacity-20 shadow-md"
                            />
                            <div className="flex flex-col md:w-1/2 md:max-w-[35vw] md:justify-center gap-2 h-full md:ml-8 md:mr-4 my-2 md:my-8">
                                <h2 className="text-xl text-black font-bold mb-2">
                                    {selectedProduct.title}
                                </h2>
                                <p className="text-xs text-black text-opacity-60 mb-2">
                                    {selectedProduct.description}
                                </p>
                                <hr className="border-gray-200 shadow-md mt-2 md:mt-0 mb-3" />
                                <div className="relative gap-4 md:gap-2 flex overflow-x-scroll max-w-[80vw] md:max-w-[100%] justify-start mb-4">
                                    {selectedProduct.sizeToPrice.map(
                                        (val, index) => {
                                            const [size, price] =
                                                Object.entries(val)[0]
                                            return (
                                                <button
                                                    className={`flex items-center shadow-md rounded-md border p-2 ${
                                                        index ==
                                                        selectedSizeIndex
                                                            ? "border-secondary border-2"
                                                            : ""
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedSizeIndex(
                                                            index
                                                        )
                                                    }}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <p className="text-black text-[0.8rem]">
                                                            {size}
                                                        </p>
                                                        <p className="text-black font-bold text-nowrap text-[0.8rem]">
                                                            {price}
                                                        </p>
                                                    </div>
                                                </button>
                                            )
                                        }
                                    )}
                                </div>
                                <div className="text-black text-base flex flex-col gap-4 items-start text-[.7rem] font-bold">
                                    <button className="flex items-center gap-2 text-white bg-secondary bg-opacity-100 py-2 px-4 rounded-full shadow-md">
                                        <ShoppingCart
                                            sx={{
                                                fontSize: "1.3rem",
                                                "@media (max-width: 1024px)": {
                                                    fontSize: "1.5rem",
                                                },
                                            }}
                                        />
                                        <p>Add to Cart</p>
                                    </button>
                                </div>
                            </div>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    selectedProduct.imageUrl
                                }
                                alt={selectedProduct.title}
                                className="flex md:hidden mt-4 object-cover mb-4 md:my-0 rounded-md border border-black border-opacity-20 shadow-md"
                            />
                        </div>
                    </div>
                    <div className="flex md:hidden rounded-full bg-white">
                        <IconButton
                            className="absolute w-16 h-12 ml-auto text-white "
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        >
                            <Close />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailedProductModal
