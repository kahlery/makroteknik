import { create } from "zustand"

export const useProductStore = create((set) => ({
    // fetch from /data/products.json at the start
    productsList: [],

    loading: true,

    fetchProducts: async () => {
        const response = await fetch("/data/products.json")
        const products = await response.json()
        set({ productsList: products, loading: false })
    },
}))
