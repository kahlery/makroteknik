import React, { useState } from "react"

// icons
import { ShoppingCart } from "@mui/icons-material"
import { AiOutlineClose } from "react-icons/ai"

// stores
import { useCartStore } from "../../Cart/stores/CartStore"

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
                        className="relative shadow-2xl flex flex-col gap-2 mt-2 rounded-2xl bg-white md:w-fit h-[80%] md:h-fit md:max-h-none p-4 mx-5 md:m-0 overflow-y-scroll"
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
                            <div className="flex flex-col md:w-1/2 md:max-w-[35vw] md:justify-center gap-4 h-full md:ml-8 md:mr-4 my-2 md:my-8">
                                <h2 className="text-xl text-black font-bold text-opacity-70">
                                    {selectedProduct.title}
                                </h2>
                                <p className="text-xs text-black text-opacity-100 mb-2 border-l-4 border-black border-opacity-40 pl-2">
                                    {selectedProduct.productCode}
                                </p>
                                <p className="text-xs text-black text-opacity-60 mb-2 border-black border-opacity-20">
                                    {selectedProduct.description}
                                </p>
                                <p className="text-black font-bold text-[0.8rem] text-opacity-70">
                                    {`Select a size to add to cart: ${
                                        screen.width < 768
                                            ? "(swipe to see more)"
                                            : ""
                                    }`}
                                </p>
                                <div className="relative gap-4 md:gap-2 pb-2 flex overflow-x-scroll md:overflow-clip md:flex-wrap max-w-[80vw] md:max-w-[100%] justify-start mb-4">
                                    {selectedProduct.sizeToPrice ? (
                                        selectedProduct.sizeToPrice.map(
                                            (val, index) => {
                                                const [size, price] =
                                                    Object.entries(val)[0]
                                                return (
                                                    <button
                                                        className={`flex items-center shadow-md rounded-md border p-2 ${
                                                            index ==
                                                            selectedSizeIndex
                                                                ? "border-secondary border-[2.5px]"
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
                                                            <p className="text-black font-bold text-[0.8rem]">
                                                                {size}
                                                            </p>
                                                            <p className="text-green-700 text-nowrap text-[0.8rem]">
                                                                {price}
                                                            </p>
                                                        </div>
                                                    </button>
                                                )
                                            }
                                        )
                                    ) : (
                                        <p className="text-black underline font-bold text-[0.8rem] text-opacity-70">
                                            1 size available, no other size
                                            options to select
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-row -mt-2 gap-4 items-center text-[.8rem] font-bold">
                                    <button className="flex items-center text-nowrap gap-2 text-white bg-secondary bg-opacity-100 py-2 px-4 rounded-full shadow-md">
                                        <ShoppingCart
                                            sx={{
                                                fontSize: "1.2rem",
                                            }}
                                        />
                                        <p>Add to Cart</p>
                                    </button>
                                    <p className="text-black text-opacity-60">
                                        Quantity can be adjusted in the cart
                                        page
                                    </p>
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
                    <div className="flex gap-3 md:hidden rounded-full py-[8px] px-[20px]">
                        <AiOutlineClose
                            size="2rem"
                            fontWeight={"60rem"}
                            className="text-white"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailedProductModal
