import React, { useState, useEffect } from "react"

// icons
import { ShoppingCart } from "@mui/icons-material"
import { MdOutlineZoomIn } from "react-icons/md"
import { IoIosArrowBack } from "react-icons/io"
import { TbRulerMeasure } from "react-icons/tb"
import { MdOutlineSimCardDownload } from "react-icons/md"

// stores
import { useCartStore } from "../../cart/stores/CartStore"
import { useProductStore } from "../../product/stores/ProductStore"

const DetailedProductModal = ({
    isModalOpen = false,
    selectedProduct = {},
    setIsModalOpen,
}) => {
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [showNotification, setShowNotification] = useState(false)
    const [zoomStyle, setZoomStyle] = useState({})
    const [isZoomed, setIsZoomed] = useState(false)

    // store actions
    const addProduct = useCartStore((state) => state.addProduct)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const isInCart = useCartStore((state) => state.isInCart)
    const getPDF = useProductStore((state) => state.getPDF)

    const handleDownloadClick = () => {
        getPDF(selectedProduct._id)
    }

    const handleAddToCart = () => {
        addProduct(selectedProduct._id, selectedSizeIndex)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
    }

    useEffect(() => {
        const handleESC = (e) => {
            if (e.key === "Escape") {
                setIsModalOpen(false)
            }
        }

        if (isModalOpen) window.addEventListener("keydown", handleESC)
        return () => window.removeEventListener("keydown", handleESC)
    }, [isModalOpen, setIsModalOpen])

    return (
        <div
            className={`fixed left-0 top-0 w-screen h-[100vh] z-[10000] flex flex-col justify-center items-center transition-opacity duration-[.5s] bg-white bg-opacity-100 md:bg-black md:bg-opacity-75 ${
                isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsModalOpen(false)}
        >
            {isModalOpen && selectedProduct && (
                <>
                    <div
                        className="relative shadow-2xl flex flex-col gap-2 bg-white md:w-fit h-full md:h-fit p-4 overflow-y-scroll"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col md:flex-row">
                            <div
                                className="relative w-full md:w-[40vw] h-[50vh] md:h-[66svh] mb-4 bg-no-repeat bg-contain bg-center"
                                style={{
                                    backgroundImage: `url(${
                                        process.env.PUBLIC_URL +
                                        selectedProduct.image_url
                                    })`,
                                    ...zoomStyle,
                                }}
                                onMouseMove={(e) => {
                                    const { left, top, width, height } =
                                        e.currentTarget.getBoundingClientRect()
                                    const x = ((e.clientX - left) / width) * 100
                                    const y = ((e.clientY - top) / height) * 100
                                    setIsZoomed(true)
                                    setZoomStyle({
                                        backgroundSize: "175%",
                                        backgroundPosition: `${x}% ${y}%`,
                                    })
                                }}
                                onMouseLeave={() => {
                                    setIsZoomed(false)
                                    setZoomStyle({
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                    })
                                }}
                            >
                                {isZoomed && (
                                    <div className="absolute top-4 right-4 bg-white bg-opacity-70 rounded-full p-1 shadow-md transition-opacity duration-200">
                                        <MdOutlineZoomIn
                                            className="text-black"
                                            size={50}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:w-1/2 md:max-w-[35vw] overflow-y-scroll gap-4 md:ml-8 md:mr-4">
                                <button
                                    className="flex items-center w-fit font-bold text-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <IoIosArrowBack size="1.3rem" />
                                    <p className="text-[1rem]">Back</p>
                                </button>

                                <h2 className="text-xl text-black font-bold text-opacity-70">
                                    {selectedProduct.title}
                                </h2>
                                <p className="text-secondary font-bold px-2 bg-secondary bg-opacity-10 text-[0.8rem] text-opacity-60">
                                    {selectedProduct.product_code}
                                </p>

                                <hr className="border-black border-opacity-20" />

                                <div className="flex gap-2 items-center">
                                    <TbRulerMeasure
                                        className="text-black"
                                        size="1.2rem"
                                    />
                                    <p className="text-black font-bold text-[0.8rem] text-opacity-70">
                                        {`Select a size: ${
                                            screen.width < 768
                                                ? "(swipe to see more)"
                                                : ""
                                        }`}
                                    </p>
                                </div>

                                <div className="relative gap-4 md:gap-2 pb-2 flex overflow-x-scroll md:overflow-clip md:flex-wrap max-w-[85vw] md:max-w-full justify-start mb-4">
                                    {selectedProduct.size_2_price &&
                                    Object.keys(selectedProduct.size_2_price)
                                        .length > 0 ? (
                                        Object.entries(
                                            selectedProduct.size_2_price
                                        ).map(([size, price], index) => (
                                            <button
                                                key={index}
                                                className={`flex items-center rounded-md border p-2 ${
                                                    index === selectedSizeIndex
                                                        ? "border-[3px] border-black border-opacity-100"
                                                        : "border-black border-opacity-20"
                                                }`}
                                                onClick={() =>
                                                    setSelectedSizeIndex(index)
                                                }
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
                                        ))
                                    ) : (
                                        <p className="text-secondary font-bold px-2 bg-secondary bg-opacity-10 border-secondary text-[0.8rem] text-opacity-60">
                                            1 size available, no other size
                                            options to select
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-row gap-4 items-center text-[.7rem] font-bold">
                                    {!isInCart(
                                        selectedProduct._id,
                                        selectedSizeIndex
                                    ) ? (
                                        <button
                                            className="flex items-center text-white gap-2 bg-secondary py-2 px-4 rounded-full"
                                            onClick={handleAddToCart}
                                        >
                                            <ShoppingCart
                                                sx={{ fontSize: "1.1rem" }}
                                            />
                                            <p>Add to Cart</p>
                                        </button>
                                    ) : (
                                        <button
                                            className="flex items-center text-black border border-black gap-2 bg-white py-2 px-4 rounded-full"
                                            onClick={() =>
                                                removeProduct(
                                                    selectedProduct._id.toString(),
                                                    selectedSizeIndex.toString()
                                                )
                                            }
                                        >
                                            <ShoppingCart
                                                sx={{ fontSize: "1.1rem" }}
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
                                    className="flex w-fit items-center text-xs font-bold text-black border border-black gap-2 bg-white py-2 px-4 rounded-full"
                                    onClick={handleDownloadClick}
                                >
                                    <MdOutlineSimCardDownload className="text-xl" />
                                    <p>Download PDF</p>
                                </button>

                                <p className="text-xs text-black py-2 mb-16">
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
