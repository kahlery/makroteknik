import React, { useState, useEffect } from "react"

// icons
import { ShoppingCart } from "@mui/icons-material"
import { IoIosArrowBack } from "react-icons/io"
import { TbRulerMeasure } from "react-icons/tb"
import { MdOutlineSimCardDownload } from "react-icons/md"

// stores
import { useCartStore } from "../../cart/stores/CartStore"
import { useProductStore } from "../../product/stores/ProductStore"

const DetailedProductModal = ({
    isModalOpen = false,
    selectedProduct = 0,
    setIsModalOpen,
}) => {
    // states
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [showNotification, setShowNotification] = useState(false) // New state for notification

    // stores
    const addProduct = useCartStore((state) => state.addProduct) // to add the product's size
    const removeProduct = useCartStore((state) => state.removeProduct) // to remove product's size
    const isInCart = useCartStore((state) => state.isInCart) // to change button from add to remove if size exists in cart
    const getPDF = useProductStore((state) => state.getPDF)

    const handleDownloadClick = () => {
        getPDF(selectedProduct._id)
    }

    const handleAddToCart = () => {
        addProduct(selectedProduct._id, selectedSizeIndex)
        setShowNotification(true) // Show notification
        setTimeout(() => setShowNotification(false), 3000) // Hide notification after 3 seconds
    }

    // close modal on "esc" key press
    useEffect(() => {
        const handleESC = (e) => {
            if (e.key === "Escape") {
                setIsModalOpen(false)
            }
        }

        if (isModalOpen) window.addEventListener("keydown", handleESC)

        return () => {
            window.removeEventListener("keydown", handleESC)
        }
    }, [isModalOpen, setIsModalOpen])

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
                                    selectedProduct.image
                                }
                                alt={selectedProduct.title}
                                className="md:flex max-h-[50vh] md:w-[40vw] md:max-h-[66svh] object-scale-down mr-0 mb-4 md:my-0 "
                            />
                            <hr className="border-black border-opacity-20 mb-4" />
                            <div className="flex flex-col md:w-1/2 md:max-w-[35vw] md:max-h-[64svh] overflow-y-scroll md:justify-start gap-4 h-full md:ml-8 md:mr-4">
                                <button
                                    className="flex items-center bg-opacity-100 h-fit w-fit font-bold bg-white rounded-md"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                    }}
                                >
                                    <IoIosArrowBack
                                        size="1.3rem"
                                        className="text-secondary"
                                    />
                                    <p className="text-secondary text-[1rem]">
                                        Back
                                    </p>
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
                                                        className={`flex items-center rounded-md border p-2 ${
                                                            index ==
                                                            selectedSizeIndex
                                                                ? "border-opacity-100 border-[3px] border-black"
                                                                : "border-opacity-20 border-black"
                                                        }`}
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedSizeIndex(
                                                                index
                                                            )
                                                        }}
                                                    >
                                                        <div className="flex flex-col items-center">
                                                            <p className="text-black text-opacity-60 text-[0.9rem]">
                                                                {size}
                                                            </p>
                                                            <p className="text-secondary text-nowrap text-[0.9rem]">
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
                                    {!isInCart(
                                        selectedProduct._id,
                                        selectedSizeIndex
                                    ) ? (
                                        <button
                                            className="flex items-center text-nowrap text-white gap-2 bg-secondary bg-opacity-100 py-2 px-4 rounded-full"
                                            onClick={handleAddToCart} // Updated to use handleAddToCart
                                        >
                                            <ShoppingCart
                                                sx={{
                                                    fontSize: "1.1rem",
                                                }}
                                            />
                                            <p>Add to Cart</p>
                                        </button>
                                    ) : (
                                        <button
                                            className="flex items-center text-nowrap text-black border-black border gap-2 bg-white bg-opacity-100 py-2 px-4 rounded-full"
                                            onClick={() => {
                                                removeProduct(
                                                    selectedProduct._id.toString(),
                                                    selectedSizeIndex.toString()
                                                )
                                            }}
                                        >
                                            <ShoppingCart
                                                sx={{
                                                    fontSize: "1.1rem",
                                                }}
                                            />
                                            <p>Remove from Cart</p>
                                        </button>
                                    )}
                                    <p className="text-black text-opacity-60">
                                        Quantity can be adjusted in the cart
                                        page
                                    </p>
                                </div>
                                <hr className="border-black border-opacity-20" />
                                <p className="text-black font-bold text-[0.8rem] text-opacity-70">
                                    Description:
                                </p>
                                <button
                                    className="flex w-fit items-center text-xs font-bold text-nowrap text-black border-black
                                     border gap-2 bg-white bg-opacity-100 py-2 px-4 rounded-full"
                                    onClick={handleDownloadClick}
                                >
                                    <MdOutlineSimCardDownload className="text-xl font-bold" />
                                    <p>download PDF</p>
                                </button>
                                <p className="text-xs text-black text-opacity-100 py-2 mb-16">
                                    {selectedProduct.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    {showNotification && (
                        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                            Item added to cart!
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DetailedProductModal
