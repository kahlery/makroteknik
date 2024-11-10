import { useEffect, useState } from "react"
import { LoginForm } from "./components/LoginForm"

export const AdminContainer = ({ className }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn)
    })

    return (
        <div className={` flex min-h-screen justify-center ${className}`}>
            {!isLoggedIn ? (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Panel />
            )}
        </div>
    )
}
