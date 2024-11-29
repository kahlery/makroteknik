import { create } from "zustand"
import axios from "axios"

export const useProductStore = create((set, get) => ({
    apiUrl: process.env.REACT_APP_API_URL,
    productsList: [],
    categoriesList: [],
    loading: 2,

    getProducts: async () => {
        try {
            const { apiUrl } = get()
            const response = await axios.get(`${apiUrl}/product`)
            set({
                productsList: response.data.products,
                loading: get().loading - 1,
            }) // Set products and stop loading
        } catch (err) {
            console.error(err)
        }
    },

    getCategories: async () => {
        try {
            const { apiUrl } = get()
            const response = await axios.get(`${apiUrl}/category`)
            set({
                categoriesList: response.data.categories,
                loading: get().loading - 1,
            }) // Assuming categories are directly in the response
        } catch (err) {
            console.error(err)
            set({ categoriesList: [] }) // Set empty categories on error
        }
    },

    postProduct: async (formData) => {
        try {
            const { apiUrl } = get()

            if (
                formData.categoryID === undefined ||
                formData.categoryID === 0
            ) {
                formData.categoryID = "0"
            }

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

    getPDF: async (id) => {
        try {
            const { apiUrl } = get()

            // make an API call to get the PDF from the backend
            const res = await axios.get(`${apiUrl}/static/pdf/${id}`, {
                responseType: "blob",
            })

            // create a URL for the PDF blob
            const PDFURL = window.URL.createObjectURL(new Blob([res.data]))

            // create a link element, set the URL as the href, and simulate a click to download
            const link = document.createElement("a")
            link.href = PDFURL
            link.setAttribute("download", `${id}.pdf`) // set a filename
            document.body.appendChild(link)

            link.click() // trigger the download

            // clean up after the download
            document.body.removeChild(link)
            window.URL.revokeObjectURL(PDFURL)
        } catch (err) {
            console.error("error downloading the pdf:", err)
        }
    },

    // isPDFExist: async (id) => {
    //     try {
    //         const {apiUrl} = get()
    //         const res = await axios.get(`${apiUrl}/pdf/is-exist/${id}`)
    //         res = res.data.isPDFExist

    //         const {productsList} =get()
    //         const product = productsList.filter(
    //             (product) => product._id === id
    //         )

    //         set(()=> {
    //             productsList: productsList.
    //         })
    //     }
    // },

    // getPDF: async (id) => {
    //     try {
    //         const {apiUrl}= get()
    //         await axios.get()
    //     }
    // },
}))
