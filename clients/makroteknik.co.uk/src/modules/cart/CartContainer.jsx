import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// components
import { CartTable } from "./components/CartTable"

// icons
import { FaRegCopy } from "react-icons/fa"

// stores
import { useCartStore } from "./stores/CartStore"
import { useProductStore } from "../product/stores/ProductStore"

const CartContainer = () => {
    const { cartProducts, loadCartFromLocalStorage, clearCart } = useCartStore()
    const { productsList, getProducts } = useProductStore()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            await loadCartFromLocalStorage()
            await getProducts()
            setLoading(false)
        }
        init()
    }, [loadCartFromLocalStorage, getProducts])

    const getSizeLabelByIndex = (sizeMap, index) => {
        const sizes = Object.keys(sizeMap || {})
        return sizes[index] || `Size-${index}`
    }

    const parsePrice = (price) => {
        const num = parseFloat(price?.toString().replace(/[^0-9.]/g, "") ?? "0")
        return isNaN(num) ? 0 : num
    }

    const getCartDetails = () => {
        return Object.entries(cartProducts)
            .map(([productId, sizes]) => {
                const product = productsList.find(
                    (product) => product._id === productId
                )
                if (!product) return null

                return sizes
                    .map((sizeObj) => {
                        const sizeIndex = Object.keys(sizeObj)[0]
                        const quantity = sizeObj[sizeIndex]
                        const sizeLabel = getSizeLabelByIndex(
                            product.size_2_price,
                            sizeIndex
                        )
                        const sizeKey = Object.keys(product.size_2_price)[
                            sizeIndex
                        ]
                        const price = product.size_2_price[sizeKey] || "0"

                        return `${product.title}\n${product.product_code}
Size: ${sizeLabel}
Quantity: ${quantity}
Price: £${price}`
                    })
                    .join("\n\n")
            })
            .filter(Boolean)
            .join("\n\n")
    }

    const calculateTotalPrice = () => {
        return Object.entries(cartProducts)
            .reduce((acc, [productId, sizes]) => {
                const product = productsList.find((p) => p._id === productId)
                if (!product) return acc

                return (
                    acc +
                    sizes.reduce((subtotal, sizeObj) => {
                        const sizeIndex = Object.keys(sizeObj)[0]
                        const quantity = sizeObj[sizeIndex]
                        const sizeKey = Object.keys(product.size_2_price)[
                            sizeIndex
                        ]
                        const rawPrice = product.size_2_price[sizeKey]
                        const price = parsePrice(rawPrice)
                        return subtotal + quantity * price
                    }, 0)
                )
            }, 0)
            .toFixed(2)
    }

    const sendEmail = () => {
        const subject = encodeURIComponent("Cart Product Details")
        const cartDetails = getCartDetails()
        const total = calculateTotalPrice()

        const body = encodeURIComponent(
            `Hello, I would like to get an offer for the following products:\n\n${cartDetails}\n\nTotal Price: £${total}`
        )

        console.log("wefwefwefwlklkqwd")

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

    const hasProducts = Object.keys(cartProducts).length > 0

    return (
        <div className="relative">
            <div className="w-screen mt-[80px] md:mt-[120px] px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    {hasProducts ? (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 justify-between rounded-2xl">
                                <div>
                                    <h2 className="text-base font-bold">
                                        Your Cart (
                                        {hasProducts ? "Items" : "Empty"})
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
                                            navigator.clipboard.writeText(
                                                getCartDetails()
                                            )
                                            alert(
                                                "Cart details copied to clipboard!" +
                                                    "\n\n" +
                                                    getCartDetails()
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
                        </div>
                    ) : (
                        <div className="text-center text-primary font-bold mt-32">
                            <p>
                                Your cart is empty, add some products to get an
                                offer!
                            </p>
                            <Link
                                to={"/products"}
                                className="text-secondary hover:underline transition duration-300"
                            >
                                go to products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartContainer
