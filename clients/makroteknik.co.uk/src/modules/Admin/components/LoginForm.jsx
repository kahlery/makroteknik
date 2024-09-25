import { useUserStore } from "../stores/UserStore"

export const LoginForm = ({ setIsLoggedIn }) => {
    // Stores
    const login = useUserStore((state) => state.login)

    const handleLogin = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userName = formData.get("userName")
        const password = formData.get("password")
        if (await login(userName, password)) setIsLoggedIn(true)
    }

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col max-w-52 mx-auto gap-8"
        >
            <input
                type="text"
                className="text-black border-black border-b px-4 py-1"
                name="userName"
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                className="text-black border-black border-b px-4 py-1"
                placeholder="Password"
            />
            <button
                type="submit"
                className="bg-black text-white py-2 rounded-md"
            >
                Login
            </button>
        </form>
    )
}
