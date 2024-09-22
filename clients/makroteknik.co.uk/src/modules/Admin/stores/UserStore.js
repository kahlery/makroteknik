import { create } from "zustand"
import axios from "axios"

export const useUserStore = create((set, get) => ({
    apiUrl: process.env.REACT_APP_API_URL,

    user: {
        userName: "",
        token: "",
    },

    login: async (userName, password) => {
        try {
            const response = await axios.post(apiUrl + "/login", {
                userName,
                password,
            })
            console.log("Logged in:", response.data)
            set({ userName: userName, token: response.data.token })
        } catch (err) {
            console.error(err)
        }
    },
}))
