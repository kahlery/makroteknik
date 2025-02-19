import { useEffect, useState } from "react"

// components
import { LoginForm } from "./components/LoginForm"
import { Panel } from "./components/Panel"
import { Outlet } from "react-router-dom"

export const AdminContainer = ({ className }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log(".isLoggedIn:", isLoggedIn)
    })

    return (
        <div
            className={` flex min-h-screen justify-center bg-gray-100 ${className}`}
        >
            <Outlet />
            {/* {!isLoggedIn ? (
                <LoginForm
                    setIsLoggedIn={setIsLoggedIn}
                />
            ) : (
                <Panel />
            )} */}
        </div>
    )
}
