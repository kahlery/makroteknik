import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CartTable } from "./components/CartTable"
import { FaRegCopy } from "react-icons/fa"
import { useCartStore } from "./stores/CartStore"
import { useProductStore } from "../product/stores/ProductStore"
import axios from "axios"

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Backdrop,
} from "@mui/material"

const CartContainer = () => {
    const { cartProducts, loadCartFromLocalStorage, clearCart } = useCartStore()
    const { productsList, getProducts } = useProductStore()

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showClearConfirm, setShowClearConfirm] = useState(false)
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false)
    const [askToClearCart, setAskToClearCart] = useState(false)

    // Save timestamp of last successful send (ms)
    const [sentTime, setSentTime] = useState(() => {
        const saved = localStorage.getItem("sentTime")
        return saved ? parseInt(saved, 10) : null
    })

    // Cooldown seconds left for rate limiting
    const [cooldown, setCooldown] = useState(60)

    // Persist sentTime in localStorage
    useEffect(() => {
        if (sentTime) {
            localStorage.setItem("sentTime", sentTime.toString())
        } else {
            localStorage.removeItem("sentTime")
        }
    }, [sentTime])

    // Countdown timer for rate limit dialog
    useEffect(() => {
        let interval

        if (rateLimitExceeded && sentTime) {
            interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - sentTime) / 1000)
                const remaining = 60 - elapsed

                if (remaining <= 0) {
                    setRateLimitExceeded(false)
                    setCooldown(60)
                } else {
                    setCooldown(remaining)
                }
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [rateLimitExceeded, sentTime])

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
                const product = productsList.find((p) => p._id === productId)
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
                        const price = parsePrice(product.size_2_price[sizeKey])
                        return subtotal + quantity * price
                    }, 0)
                )
            }, 0)
            .toFixed(2)
    }

    const sendCart2Backend = async () => {
        const apiUrl = process.env.REACT_APP_API_URL ?? "http://localhost:8090"
        const cartDetails = getCartDetails()
        const total = calculateTotalPrice()

        setSending(true)
        try {
            const response = await axios.post(`${apiUrl}/send-cart-email`, {
                cartDetails,
                total,
                recipientEmail: "garpayyasla@gmail.com",
            })

            if (response.status === 200) {
                setShowSuccess(true)
                setAskToClearCart(true)
                const now = Date.now()
                setSentTime(now)
            } else {
                alert("Something went wrong. Please try again.")
            }
        } catch (error) {
            if (error.response?.status === 429) {
                setRateLimitExceeded(true)
            } else {
                alert("Failed to send request. Please try again later.")
            }
        } finally {
            setSending(false)
        }
    }

    const hasProducts = Object.keys(cartProducts).length > 0

    if (loading) {
        return (
            <div className="text-center text-lg text-gray-500 mt-32">
                Loading...
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="w-screen mt-[80px] md:mt-[120px] px-0 md:px-[16rem] 2xl:px-[25rem] pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    {hasProducts ? (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 justify-between rounded-2xl">
                                <div>
                                    <h2 className="text-base font-bold">
                                        Your Cart
                                    </h2>
                                    <p className="text-sm text-black text-opacity-60">
                                        We’ll send this to providers for offer.
                                    </p>

                                    <button
                                        className="text-[.8rem] text-black text-opacity-60 underline mt-2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                getCartDetails()
                                            )
                                            alert(
                                                "Cart copied to clipboard!\n\n" +
                                                    getCartDetails()
                                            )
                                        }}
                                    >
                                        Copy the cart records
                                        <FaRegCopy className="inline-block ml-1" />
                                    </button>
                                </div>

                                <div className="flex gap-4 text-sm items-center">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={sendCart2Backend}
                                        disabled={sending}
                                    >
                                        Get an Offer With Cart
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            setShowClearConfirm(true)
                                        }
                                    >
                                        Reset the Cart
                                    </Button>
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

            {/* Sending Spinner (Backdrop) */}
            <Backdrop open={sending} style={{ zIndex: 1300, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Snackbar for success */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Offer request sent successfully!
                </Alert>
            </Snackbar>

            {/* Confirm Clear Cart Dialog */}
            <Dialog
                open={showClearConfirm}
                onClose={() => setShowClearConfirm(false)}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    This will remove all items from your cart.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowClearConfirm(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            clearCart()
                            setShowClearConfirm(false)
                        }}
                        color="error"
                    >
                        Yes, Clear
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Rate Limit Dialog */}
            <Dialog
                open={rateLimitExceeded}
                onClose={() => setRateLimitExceeded(false)}
            >
                <DialogTitle>Rate Limit Reached</DialogTitle>
                <DialogContent>
                    <div className="text-sm text-gray-700">
                        You can only send a request once per minute.
                        <br />
                        <strong>
                            Try again in {cooldown} second
                            {cooldown !== 1 ? "s" : ""}.
                        </strong>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRateLimitExceeded(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Ask to clear cart after sending */}
            <Dialog
                open={askToClearCart}
                onClose={() => setAskToClearCart(false)}
            >
                <DialogTitle>Clear Cart?</DialogTitle>
                <DialogContent>
                    Your offer request was sent successfully. Would you like to
                    empty your cart now?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAskToClearCart(false)}>No</Button>
                    <Button
                        onClick={() => {
                            clearCart()
                            setAskToClearCart(false)
                        }}
                        color="primary"
                    >
                        Yes, Clear It
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CartContainer
