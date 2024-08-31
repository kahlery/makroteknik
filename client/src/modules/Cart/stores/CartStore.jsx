import { create } from "zustand"

export const useCartStore = create((set, get) => ({
    cartProducts: [],

    //
    addProducts: (productId, sizeIndex = 0) => {
        set((state) => {
            if (!state.cartProducts[productId]) {
            }
        })
    },
    // set((state) => {
    //     if (!state.cartProducts[productId]) {
    //         const newCartProducts = {
    //             ...state.cartProducts,
    //             [productId]: 1,
    //         }
    //         localStorage.setItem("cart", JSON.stringify(newCartProducts))
    //         console.log("added product:", productId, "to the cart")
    //         return {
    //             cartProducts: newCartProducts,
    //         }
    //     }
    //     return state
    // }),

    setProductQuantity: (productId, quantity) =>
        set((state) => {
            if (quantity > 0) {
                const newCartProducts = {
                    ...state.cartProducts,
                    [productId]: quantity,
                }
                localStorage.setItem("cart", JSON.stringify(newCartProducts))
                return { cartProducts: newCartProducts }
            } else {
                const newCartProducts = { ...state.cartProducts }
                delete newCartProducts[productId]
                localStorage.setItem("cart", JSON.stringify(newCartProducts))
                return { cartProducts: newCartProducts }
            }
        }),

    incrementProductQuantity: (productId) =>
        set((state) => {
            const newCartProducts = {
                ...state.cartProducts,
                [productId]: (state.cartProducts[productId] || 0) + 1,
            }
            localStorage.setItem("cart", JSON.stringify(newCartProducts))
            return { cartProducts: newCartProducts }
        }),

    decrementProductQuantity: (productId) => {
        set((state) => {
            if (state.cartProducts[productId] > 1) {
                const newCartProducts = {
                    ...state.cartProducts,
                    [productId]: state.cartProducts[productId] - 1,
                }
                localStorage.setItem("cart", JSON.stringify(newCartProducts))
                return { cartProducts: newCartProducts }
            } else {
                const newCartProducts = { ...state.cartProducts }
                delete newCartProducts[productId]
                localStorage.setItem("cart", JSON.stringify(newCartProducts))
                return { cartProducts: newCartProducts }
            }
        })
    },

    removeProducts: (productId) => {
        set((state) => {
            const newCartProducts = { ...state.cartProducts }
            delete newCartProducts[productId]
            localStorage.setItem("cart", JSON.stringify(newCartProducts))
            console.log("removed product:", productId, "from the cart")
            return { cartProducts: newCartProducts }
        })
    },

    //
    clearCart: () => {
        localStorage.removeItem("cart")
        set({
            cartProducts: [],
        })
    },

    //
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
