import React, { useState } from "react"

// icons
import { ShoppingCart } from "@mui/icons-material"
import { IoIosArrowBack } from "react-icons/io"
import { TbRulerMeasure } from "react-icons/tb"

// stores
import { useCartStore } from "../../Cart/stores/CartStore"

const DetailedProductModal = ({
    isModalOpen = false,
    selectedProduct,
    setIsModalOpen,
}) => {
    // states
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)

    // stores
    const addProducts = useCartStore((state) => state.addProducts) // to add the product with its size
    const cartProducts = useCartStore((state) => state.cartProducts) // to check if the product and size added

    if (!selectedProduct) return null

    const isCartProduct = cartProducts[selectedProduct.productId]
    const quantity = isCartProduct || 0

    return (
        <div
            className={`fixed left-0 top-0 w-screen h-[100vh] z-[10000] flex flex-col justify-center 
                items-center transition-opacity duration-[.5s] bg-white bg-opacity-100 md:bg-black md:bg-opacity-75
                opacity-0 
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
                        className="relative shadow-2xl flex flex-col gap-2 bg-white md:w-fit h-[100%] md:h-fit md:max-h-none p-4 md:m-0 overflow-y-scroll"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row h-fit">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    selectedProduct.imageUrl
                                }
                                alt={selectedProduct.title}
                                className="md:flex max-h-[50vh] md:w-[40vw] md:max-h-[66svh] object-scale-down mr-0 mb-4 md:my-0 rounded-md border border-black border-opacity-20 shadow-md"
                            />
                            <div className="flex flex-col md:w-1/2 md:max-w-[35vw] md:max-h-[64svh] overflow-y-scroll md:justify-start gap-4 h-full md:ml-8 md:mr-4">
                                <button
                                    className="md:hidden bg-red-500 flex bg-opacity-10 px-2 py-1 h-fit w-fit font-bold text-red-500"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                    }}
                                >
                                    <IoIosArrowBack size="1.5rem" />
                                    <p>Close</p>
                                </button>
                                <h2 className="text-xl text-black font-bold text-opacity-70">
                                    {selectedProduct.title}
                                </h2>
                                <p className="text-secondary font-bold border-l-4 px-2 bg-secondary bg-opacity-10 border-secondary text-[0.8rem] text-opacity-60">
                                    {selectedProduct.productCode}
                                </p>
                                <hr className="border-black border-opacity-20" />
                                <div className="flex gap-2 items-center">
                                    <TbRulerMeasure
                                        className="text-black"
                                        size={"1.2rem"}
                                    />
                                    <p className="text-black font-bold text-[0.8rem] text-opacity-70">
                                        {`Select a size: ${
                                            screen.width < 768
                                                ? "(swipe to see more)"
                                                : ""
                                        }`}
                                    </p>
                                </div>
                                <div className="relative gap-4 md:gap-2 pb-2 flex overflow-x-scroll md:overflow-clip md:flex-wrap max-w-[85vw] md:max-w-[100%] justify-start mb-4">
                                    {selectedProduct.sizeToPrice.length > 1 ? (
                                        selectedProduct.sizeToPrice.map(
                                            (val, index) => {
                                                const [size, price] =
                                                    Object.entries(val)[0]
                                                return (
                                                    <button
                                                        className={`flex items-center rounded-md border border-black p-2 ${
                                                            index ==
                                                            selectedSizeIndex
                                                                ? "border-opacity-100 border-[3px]"
                                                                : "border-opacity-20"
                                                        }`}
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedSizeIndex(
                                                                index
                                                            )
                                                        }}
                                                    >
                                                        <div className="flex flex-col items-center">
                                                            <p className="text-black text-opacity-60 text-[0.8rem]">
                                                                {size}
                                                            </p>
                                                            <p className="text-secondary text-nowrap text-[0.8rem]">
                                                                {price}
                                                            </p>
                                                        </div>
                                                    </button>
                                                )
                                            }
                                        )
                                    ) : (
                                        <p className="text-secondary font-bold border-l-4 px-2 bg-secondary bg-opacity-10 border-secondary text-[0.8rem] text-opacity-60">
                                            1 size available, no other size
                                            options to select
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-row -mt-4 gap-4 items-center text-[.7rem] font-bold">
                                    <button className="flex items-center text-nowrap text-white gap-2 bg-secondary bg-opacity-100 py-2 px-4 rounded-full">
                                        <ShoppingCart
                                            sx={{
                                                fontSize: "1.1rem",
                                            }}
                                        />
                                        <p>Add to Cart</p>
                                    </button>
                                    <p className="text-black text-opacity-60">
                                        Quantity can be adjusted in the cart
                                        page
                                    </p>
                                </div>
                                <hr className="border-black border-opacity-20" />
                                <p className="text-black font-bold text-[0.8rem] text-opacity-70">
                                    Details:
                                </p>
                                <p className="text-xs text-black text-opacity-100 py-2 mb-16">
                                    {selectedProduct.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailedProductModal
