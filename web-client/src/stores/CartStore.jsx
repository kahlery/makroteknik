import { create } from 'zustand';

export const useCartStore = create((set) => ({
    cartProductIds: [],

    addProducts: (productId) => set((state) => {
        if (!state.cartProductIds.includes(productId)) {
            return {
                cartProductIds: [...state.cartProductIds, productId]
            };
        }
        return state;
    }),

    resetCategories: () => set({ cartProductIds: [] }),

    removeCategories: (productId) => set((state) => {
        return {
            cartProductIds: state.cartProductIds.filter((cartProduct) => cartProduct !== productId)
        };
    }),

    saveCartToLocalStorage: () => {
        localStorage.setItem('cart', JSON.stringify(get().cartProductIds));
    },

    loadCartFromLocalStorage: () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            set({ cartProductIds: JSON.parse(cart) });
        }
    }
}));