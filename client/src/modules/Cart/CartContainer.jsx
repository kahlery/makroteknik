import React, { useEffect, useState } from "react"

// components
import ListingGrid from "../Common/components/ListingGrid"

// stores
import { useCartStore } from "./stores/CartStore"
import { CartTable } from "./components/CartTable"

// icons
import { FaRegCopy } from "react-icons/fa"

const CartContainer = () => {
    // stores
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
        const subject = encodeURIComponent("Cart Product IDs")
        const body = encodeURIComponent(
            `Here are the product IDs in the cart: ${cartProductIds}`
        )
        window.location.href = `mailto:garpayyasla@gmail.com?subject=${subject}&body=${body}`
    }

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to empty the cart?")) {
            clearCart()
        }
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
                                    <button className="text-[.8rem] text-black text-opacity-60 underline">
                                        Copy the cart records
                                        <FaRegCopy className="inline-block ml-1 text-[1rem] text-black text-opacity-60" />
                                    </button>
                                </div>
                                <div className="flex gap-4 text-[.7rem] items-center">
                                    <button className="bg-white px-4 py-2 font-bold text-black border border-black rounded-full">
                                        Get an Offer With Cart
                                    </button>
                                    <button className="bg-red-500 bg-opacity-10 px-4 py-2 h-fit font-bold text-red-500 rounded-full">
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
