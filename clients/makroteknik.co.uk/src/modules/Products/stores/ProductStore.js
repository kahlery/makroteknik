import { create } from "zustand"
import axios from "axios"

export const useProductStore = create((set, get) => ({
    apiUrl: process.env.REACT_APP_API_URL,
    productsList: [],
    categoriesList: [],
    loading: false,

    getProducts: async () => {
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

    getCategories: async () => {
        try {
            const { apiUrl } = get()
            const response = await axios.get(`${apiUrl}/category`)
            set({ categoriesList: response.data.categories, loading: false }) // Assuming categories are directly in the response
        } catch (err) {
            console.error(err)
            set({ categoriesList: [] }) // Set empty categories on error
            set({ loading: false }) // Stop loading on error
        }
    },

    postProduct: async (formData) => {
        try {
            const { apiUrl } = get()
            const response = await axios.post(
                `${apiUrl}/product/post`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json", // Adjust as needed
                    },
                }
            )
            set((state) => ({
                productsList: [...state.productsList, formData],
                loading: false,
            })) // Add new product
        } catch (err) {
            console.error(err)
        }
    },

    patchProduct: async (id, formData) => {
        try {
            const { apiUrl } = get()
            console.log(formData)
            const response = await axios.patch(
                `${apiUrl}/product/patch/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json", // Adjust as needed
                    },
                }
            )
            console.log(response)
            set((state) => ({
                productsList: state.productsList.map((product) =>
                    product._id === id ? formData : product
                ),
                loading: false,
            })) // Update product
        } catch (err) {
            console.error(err)
            console.log("Error response:", err.response)
        }
    },

    deleteProduct: async (id) => {
        try {
            const { apiUrl } = get()
            await axios.delete(`${apiUrl}/product/delete/${id}`)
            set((state) => ({
                productsList: state.productsList.filter(
                    (product) => product._id !== id
                ),
            })) // Remove product
        } catch (err) {
            console.error(err)
        }
    },
}))
