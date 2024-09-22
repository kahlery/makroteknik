import { useUserStore } from "../stores/UserStore"

export const LoginForm = () => {
    // Access the API URL from the environment variables
    const apiUrl = useUserStore((state) => state.apiUrl)

    // Log the API URL to the console
    console.log(apiUrl)

    return <div>Check the console for the API URL.</div>
}
