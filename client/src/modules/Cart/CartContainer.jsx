import React, { useEffect, useState } from "react"

// components
import { CartTable } from "./components/CartTable"

// stores
import { useCartStore } from "./stores/CartStore"
import { useProductStore } from "../Products/stores/ProductStore"

// icons
import { FaRegCopy } from "react-icons/fa"

const CartContainer = () => {
    // stores
    const productsList = useProductStore((state) => state.productsList)
    const cartProducts = useCartStore((state) => state.cartProducts)
    const loadCartFromLocalStorage = useCartStore(
        (state) => state.loadCartFromLocalStorage
    )
    const clearCart = useCartStore((state) => state.clearCart)

    // constants
    const cartProductIds = Object.keys(cartProducts)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage()
            setLoading(false)
        }
        loadCart()
    }, [loadCartFromLocalStorage])

    const sendEmail = () => {
        const subject = encodeURIComponent("Cart Product Details")

        // Construct the body of the email with cart product details
        const cartDetails = Object.entries(cartProducts)
            .map(([productId, sizes]) => {
                const productDetails = productsList.find(
                    (product) => product.productId === parseInt(productId, 10)
                )
                if (!productDetails) return ""

                return sizes
                    .map((sizeObj, index) => {
                        const size = Object.keys(sizeObj)[0]
                        const quantity = sizeObj[size]
                        const price = productDetails.sizeToPrice[size]
                            ? Object.values(productDetails.sizeToPrice[size])[0]
                            : "N/A"
                        return `
    Product: ${productDetails.title || "Unknown"}
    Product Code: ${productDetails.productCode || "Unknown"}
    Size: ${size}
    Price: ${price}
    Quantity: ${quantity}
                    `.trim()
                    })
                    .join("\n\n")
            })
            .join("\n\n")

        const body = encodeURIComponent(cartDetails)
        window.location.href = `mailto:garpayyasla@gmail.com?subject=${subject}&body=${body}`
    }

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to empty the cart?")) {
            clearCart()
        }
    }

    const calculateTotalPrice = () => {
        return cartProductIds.reduce((acc, productId) => {
            const product = productsList.find(
                (product) => product.productId === parseInt(productId, 10)
            )
            if (!product) return acc

            const productPrice = Object.entries(cartProducts[productId]).reduce(
                (acc, [size, quantity]) => {
                    const price = product.sizeToPrice[size]
                        ? Object.values(product.sizeToPrice[size])[0]
                        : 0
                    return acc + price * quantity
                },
                0
            )
            return acc + productPrice
        }, 0)
    }

    if (loading) {
        return (
            <div className="text-center text-lg text-gray-500 mt-32">
                Loading...
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="w-screen max-w-[vw] mt-[100px] md:mt-[190px] px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    {Object.keys(cartProducts).length > 0 ? (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 justify-between rounded-2xl">
                                <div>
                                    <h2 className="text-base font-bold">
                                        Your Cart ({cartProductIds.length}{" "}
                                        Products)
                                    </h2>
                                    <p className="text-[.8rem] text-black text-opacity-60">
                                        The cart will be sent to provider for an
                                        offer.
                                    </p>
                                    <p className="text-[.8rem] text-secondary text-opacity-60">
                                        Total Price:{" "}
                                        <span className="font-bold">
                                            £{calculateTotalPrice()}
                                        </span>
                                    </p>
                                    <button
                                        className="text-[.8rem] text-black text-opacity-60 underline"
                                        onClick={() => {
                                            // Show a toast message
                                            alert(
                                                "The cart product IDs have been copied to the clipboard."
                                            )
                                        }}
                                    >
                                        Copy the cart records
                                        <FaRegCopy className="inline-block ml-1 text-[1rem] text-black text-opacity-60" />
                                    </button>
                                </div>
                                <div className="flex gap-4 text-[.7rem] items-center">
                                    <button
                                        className="bg-secondary px-4 py-2 font-bold text-white rounded-full"
                                        onClick={sendEmail}
                                    >
                                        Get an Offer With Cart
                                    </button>
                                    <button
                                        className="bg-white px-4 py-2 font-bold text-black border border-black rounded-full"
                                        onClick={handleClearCart}
                                    >
                                        Reset the Cart
                                    </button>
                                </div>
                            </div>
                            <CartTable />
                            {/* <ListingGrid
                                key="cart"
                                cartProductIds={Object.keys(cartProducts).map(
                                    (productId) => parseInt(productId)
                                )}
                            /> */}
                        </div>
                    ) : (
                        <div className="text-center text-lg text-gray-500 mt-32">
                            Your cart is empty, add some products to get an
                            offer!&nbsp;
                            <button
                                onClick={() =>
                                    window.location.replace(
                                        process.env.PUBLIC_URL + "/products"
                                    )
                                }
                                className="text-secondary hover:underline transition duration-300"
                            >
                                Go to Products
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartContainer
