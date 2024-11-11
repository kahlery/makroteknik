import { create } from "zustand"
import axios from "axios"

export const useUserStore = create((set, get) => ({
    apiUrl: process.env.REACT_APP_API_URL,

    user: {
        username: "",
        token: "",
    },

    login: async (username, password) => {
        try {
            const { apiUrl } = get()
            const response = await axios.post(apiUrl + "/auth/login", {
                username,
                password,
            })
            console.log("Logged in:", response.data)
            set({ username: username, token: response.data.token })
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    },
}))
