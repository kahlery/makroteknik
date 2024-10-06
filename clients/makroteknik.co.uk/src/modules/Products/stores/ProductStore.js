import { create } from "zustand"
import axios from "axios"

export const useProductStore = create((set, get) => ({
    apiUrl: process.env.REACT_APP_API_URL,
    productsList: [],
    categoriesList: [],
    loading: false,

    fetchProducts: async () => {
        console.log(get().apiUrl)
        set({ loading: true }) // Start loading
        try {
            const { apiUrl } = get()
            const response = await axios.get(`${apiUrl}/product`)
            set({ productsList: response.data.products, loading: false }) // Set products and stop loading
        } catch (err) {
            console.error(err)
            set({ loading: false }) // Stop loading on error
        }
    },

    fetchCategories: async () => {
        try {
            const { apiUrl } = get()
            const response = await axios.get(`${apiUrl}/category`)
            set({ categoriesList: response.data }) // Assuming categories are directly in the response
        } catch (err) {
            console.error(err)
        }
    },

    addProduct: async (formData) => {
        try {
            const { apiUrl } = get()
            const response = await axios.post(
                `${apiUrl}/product/add`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            set((state) => ({
                productsList: [...state.productsList, response.data],
            })) // Add new product
        } catch (err) {
            console.error(err)
        }
    },
}))
