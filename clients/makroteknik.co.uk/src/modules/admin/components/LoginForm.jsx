// stores
import { useUserStore } from "../stores/UserStore"

// icons
import { IoMdLogIn } from "react-icons/io"

export const LoginForm = ({ setIsLoggedIn }) => {
    // stores
    const login = useUserStore((state) => state.login)

    const handleLogin = async (e) => {
        setIsLoggedIn(true)

        e.preventDefault()
        const formData = new FormData(e.target)
        const userName = formData.get("userName")
        const password = formData.get("password")
        if (await login(userName, password)) setIsLoggedIn(true)
        else alert("Invalid credentials!")
    }

    return (
        <div className="flex flex-col gap-12 my-auto">
            <form
                onSubmit={handleLogin}
                className="flex flex-col mx-auto gap-6 w-72"
            >
                <img
                    src="/logo.png"
                    alt="makroteknik logo"
                    className="w-36 mx-auto"
                />
                <h1 className="text-lg font-bold mx-auto text-primary">
                    makroteknik.co.uk/admin
                </h1>
                <input
                    type="text"
                    className="text-primary border-primary border border-opacity-20 px-6 py-2 "
                    name="userName"
                    placeholder="username"
                />
                <input
                    type="password"
                    name="password"
                    className="text-primary border-primary border border-opacity-20 px-6 py-2  "
                    placeholder="password"
                />
                <button
                    type="submit"
                    className="bg-primary text-white py-2 font-bold flex justify-center items-center gap-2"
                >
                    login <IoMdLogIn className="text-[1.5rem]" />
                </button>
            </form>
        </div>
    )
}
