import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cartProducts: {},

    addProducts: (productId) => set((state) => {
        if (!state.cartProducts[productId]) {
            const newCartProducts = { ...state.cartProducts, [productId]: 1 };
            localStorage.setItem('cart', JSON.stringify(newCartProducts));
            console.log('added product:', productId, 'to the cart');
            return {
                cartProducts: newCartProducts
            };
        }
        return state;
    }),

    incrementProductQuantity: (productId) => set((state) => {
        const newCartProducts = { ...state.cartProducts, [productId]: (state.cartProducts[productId] || 0) + 1 };
        localStorage.setItem('cart', JSON.stringify(newCartProducts));
        return { cartProducts: newCartProducts };
    }),

    decrementProductQuantity: (productId) => set((state) => {
        if (state.cartProducts[productId] > 1) {
            const newCartProducts = { ...state.cartProducts, [productId]: state.cartProducts[productId] - 1 };
            localStorage.setItem('cart', JSON.stringify(newCartProducts));
            return { cartProducts: newCartProducts };
        } else {
            const newCartProducts = { ...state.cartProducts };
            delete newCartProducts[productId];
            localStorage.setItem('cart', JSON.stringify(newCartProducts));
            return { cartProducts: newCartProducts };
        }
    }),

    resetProducts: () => set({ cartProducts: {} }),

    removeProducts: (productId) => set((state) => {
        const newCartProducts = { ...state.cartProducts };
        delete newCartProducts[productId];
        localStorage.setItem('cart', JSON.stringify(newCartProducts));
        console.log('removed product:', productId, 'from the cart');
        return { cartProducts: newCartProducts };
    }),

    clearCart: () => set((state) => {
        localStorage.removeItem('cart');
        return { cartProducts: {} };
    }
    ),

    loadCartFromLocalStorage: () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            set({ cartProducts: JSON.parse(cart) });
            console.log('cart loaded from localStorage:', get().cartProducts);
            return true;
        }
        console.log('cart not loaded from localStorage');
        return false;
    }
}));
