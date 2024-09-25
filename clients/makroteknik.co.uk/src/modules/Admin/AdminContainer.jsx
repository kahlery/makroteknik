import { useEffect, useState } from "react"
import { LoginForm } from "./components/LoginForm"
import { Panel } from "./components/Panel"

export const AdminContainer = ({ className }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn)
    })

    return (
        <div className={`h-fit flex justify-center p-8 mb-8 ${className}`}>
            {!isLoggedIn ? (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Panel />
            )}
        </div>
    )
}
