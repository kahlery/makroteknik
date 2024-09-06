import { create } from "zustand"

export const useProductStore = create((set) => ({
    productsList: [],
    categoriesList: [],

    loading: true,

    fetchProducts: async () => {
        const response = await fetch("/data/makroteknik.products.json")
        const products = await response.json()
        set({ productsList: products, loading: false })
    },

    fetchCategories: async () => {
        const response = await fetch("/data/makroteknik.categories.json")
        const categories = await response.json()
        set({ categoriesList: categories })
    },
}))
