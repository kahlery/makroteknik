import { useEffect, useState } from "react"

// components
import { LoginForm } from "./components/LoginForm"
import { Panel } from "./components/Panel"

export const AdminContainer = ({ className }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log(".isLoggedIn:", isLoggedIn)
    })

    return (
        <div
            className={` flex min-h-screen justify-center bg-gray-200 ${className}`}
        >
            {!isLoggedIn ? (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Panel />
            )}
        </div>
    )
}
