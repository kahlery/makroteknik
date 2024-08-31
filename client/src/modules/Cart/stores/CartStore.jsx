import { create } from "zustand"

export const useCartStore = create((set, get) => ({
    cartProducts: {},

    addProduct: (productId, sizeIndex = 0, quantity = 1) => {
        set((state) => {
            const cartProducts = { ...state.cartProducts }

            // initialize the product if it doesn't exist in the cart
            if (!cartProducts[productId]) {
                cartProducts[productId] = []
            }

            // check if the sizeIndex already exists for the product
            const existingSizeIndex = cartProducts[productId].findIndex(
                (item) => item[sizeIndex] !== undefined
            )

            if (existingSizeIndex !== -1) {
                // update the quantity for the existing size
                cartProducts[productId][existingSizeIndex][sizeIndex] +=
                    quantity
            } else {
                // add new size and quantity
                cartProducts[productId].push({ [sizeIndex]: quantity })
            }

            // save the updated cart to local storage
            localStorage.setItem("cart", JSON.stringify(cartProducts))

            return { cartProducts }
        })
    },

    removeProduct: (productId, sizeIndex = 0) => {
        set((state) => {
            let cartProducts = { ...state.cartProducts }

            if (cartProducts[productId]) {
                // Find the index of the size to be removed
                const existingSizeIndex = cartProducts[productId].findIndex(
                    (item) => item[sizeIndex] !== undefined
                )

                if (existingSizeIndex !== -1) {
                    console.log("removing product:", productId, sizeIndex)

                    // Remove the size
                    cartProducts[productId].splice(existingSizeIndex, 1)

                    // If no sizes left for the product, remove the product itself from the list
                    if (cartProducts[productId].length === 0) {
                        cartProducts = Object.fromEntries(
                            Object.entries(cartProducts).filter(
                                ([key]) => key !== productId
                            )
                        )
                    }

                    // Update local storage
                    localStorage.setItem("cart", JSON.stringify(cartProducts))

                    return { cartProducts }
                }
            }

            return state // No changes if the product/size was not found
        })
    },

    setSizeQuantity: (productId, sizeIndex = 0, quantity) => {
        if (quantity <= 0) {
            if (window.confirm("Do you want to remove this item?")) {
                get().removeProduct(productId, sizeIndex)
            }
            return
        }

        set((state) => {
            const cartProducts = { ...state.cartProducts }

            if (cartProducts[productId]) {
                const existingSizeIndex = cartProducts[productId].findIndex(
                    (item) => item[sizeIndex] !== undefined
                )

                if (existingSizeIndex !== -1) {
                    cartProducts[productId][existingSizeIndex][sizeIndex] =
                        quantity
                    localStorage.setItem("cart", JSON.stringify(cartProducts))
                    return { cartProducts }
                }
            }

            return state
        })
    },

    isInCart: (productId, sizeIndex = 0) => {
        return !!get().cartProducts[productId]?.find(
            (item) => item[sizeIndex] !== undefined
        )
    },

    clearCart: () => {
        localStorage.removeItem("cart")
        set({
            cartProducts: {},
        })
    },

    loadCartFromLocalStorage: () => {
        const cart = localStorage.getItem("cart")
        if (cart) {
            set({ cartProducts: JSON.parse(cart) })
            console.log("cart loaded from localStorage:", get().cartProducts)
            return true
        }
        console.log("cart not loaded from localStorage")
        return false
    },
}))
