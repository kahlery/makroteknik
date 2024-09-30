import { create } from "zustand"
import axios from "axios"

export const useProductStore = create((set) => ({
    apiUrl: process.env.REACT_APP_API_URL,

    productsList: [],
    categoriesList: [],

    loading: true,

    fetchProducts: async () => {
        try {
            const { apiUrl } = get()
            const response = axios.get(apiUrl + "/product")
            const products = await response.json()
            set({ productsList: products })
        } catch (err) {
            console.error(err)
        }
        const products = await response.json()
        set({ productsList: products, loading: false })
    },

    fetchCategories: async () => {
        try {
            const { apiUrl } = get()
            const response = await axios.get(apiUrl + "/product/category")
            const categories = await response.json()
            set({ categoriesList: categories })
        } catch (err) {
            console.error(err)
        }
    },

    addProcut: async (formData) => {
        try {
            const { apiUrl } = get()
            const response = await axios.post(`${apiUrl}/add/product`, formData, 
                {headers: {
                    "Content-Type": "multipart/form-date"
                },
            })
            const newProducts = response.data
            set((state) => ())
        } catch (err) {
            console.error(err)
        }
    },
}))
