import React, { useEffect, useState } from "react"

// components
import { CartTable } from "./components/CartTable"

// stores

// icons
import { FaRegCopy } from "react-icons/fa"
import { useCartStore } from "./stores/CartStore"
import { useProductStore } from "../product/stores/ProductStore"

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
    const productsLoaded = productsList.length > 0

    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage()
            setLoading(false)
        }
        loadCart()
    }, [loadCartFromLocalStorage])

    const getCartDetails = () => {
        return Object.entries(cartProducts)
            .map(([productId, sizes]) => {
                const productDetails = productsList.find(
                    (product) => product._id === productId
                )
                if (!productDetails) return "N/A"

                return sizes.map((sizeObj, _) => {
                    const size = Object.keys(
                        productDetails.sizeToPrice[Object.keys(sizeObj)[0]]
                    )
                    const quantity = Object.values(sizeObj)[0]
                    const price = Object.values(
                        productDetails.sizeToPrice[Object.keys(sizeObj)[0]]
                    )[0]
                    return `${productDetails.title}\n${productDetails.productCode}
                    Size: ${size}
                    Quantity: ${quantity}
                    Price: ${price}`
                })
            })
            .join("\n\n")
    }

    const sendEmail = () => {
        const subject = encodeURIComponent("Cart Product Details")

        const cartDetails = getCartDetails()
        const total = calculateTotalPrice()

        const body = encodeURIComponent(
            `Hello, I would like to get an offer for the following products:\n\n${cartDetails}\n\nTotal Price: £${total}`
        )

        window.location.href = `mailto:garpayyasla@gmail.com?subject=${subject}&body=${body}`
    }

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to empty the cart?")) {
            clearCart()
        }
    }

    const calculateTotalPrice = () => {
        const result = cartProductIds.reduce((acc, _id) => {
            const product = productsList.find((product) => product._id === _id)

            console.log("adding product", product, "'s price to total price")

            if (!product) return acc

            const productTotalPrice = Object.entries(cartProducts[_id]).reduce(
                (acc, [_, sizeIndexToQuantityPair]) => {
                    const sizeIndex = Object.keys(sizeIndexToQuantityPair)[0]
                    const quantity = Object.values(sizeIndexToQuantityPair)[0]
                    const price =
                        Object.values(product.sizeToPrice[sizeIndex] ?? 0)[0] ??
                        0

                    console.log("price:", price)

                    price.toString().replace(/[^0-9.]/g, "")

                    console.log(
                        "price after regex:",
                        price.toString().replace(/[^0-9.]/g, "")
                    )

                    return (
                        acc +
                        quantity * price.toString().replace(/[^0-9.]/g, "")
                    )
                },
                0
            )

            console.log("productTotalPrice:", productTotalPrice)

            return acc + productTotalPrice
        }, 0)

        return result
    }

    if (loading) {
        return (
            <div className="text-center text-lg text-gray-500 mt-32">
                Loading...
            </div>
        )
    }

    if (loading || !productsLoaded) {
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
                                            // Copy the cart details to the clipboard
                                            navigator.clipboard.writeText(
                                                getCartDetails()
                                            )

                                            // Show a toast message
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
                        <div className="text-center text-lg text-gray-500 mt-32">
                            clear Your cart is empty, add some products to get
                            an offer!&nbsp;
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
