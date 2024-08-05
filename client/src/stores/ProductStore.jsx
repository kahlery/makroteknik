import { create } from 'zustand';

export const useProductStore = create((set) => ({
    // fetch from /data/products.json at the start
    productsList: [],

    fetchProducts: async () => {
        const response = await fetch('/data/products.json');
        const products = await response.json();
        console.log('products in store function:', products);
        set({ productsList: products });
    }
}));