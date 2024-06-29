import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cartProductIds: [],

    addProducts: (productId) => set((state) => {
        if (!state.cartProductIds.includes(productId)) {
            const newCartProductIds = [...state.cartProductIds, productId];
            localStorage.setItem('cart', JSON.stringify(newCartProductIds));
            console.log('added product:', productId, 'to the cart');
            return {
                cartProductIds: newCartProductIds
            };
        }
        return state;
    }),

    resetProducts: () => set({ cartProductIds: [] }),

    removeProducts: (productId) => set((state) => {
        const newCartProductIds = state.cartProductIds.filter((cartProduct) => cartProduct !== productId);
        localStorage.setItem('cart', JSON.stringify(newCartProductIds));
        console.log('removed product:', productId, 'from the cart');
        return {
            cartProductIds: newCartProductIds
        };
    }),

    loadCartFromLocalStorage: () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            set({ cartProductIds: JSON.parse(cart) });
            console.log('cart loaded from localStorage:', get().cartProductIds);
            return true;
        }
        console.log('cart not loaded from localStorage');
        return false;
    }
}));
