import { React, useEffect } from "react"

// router v6
import { Outlet } from "react-router-dom"

// Components
import TopBar from "./components/TopBar"
import CategoriesTop from "./components/CategoriesTop"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

// Stores
import { useProductStore } from "../product/stores/ProductStore"

const LayoutContainer = () => {
    // Stores
    const getProducts = useProductStore((state) => state.getProducts)
    const productsList = useProductStore((state) => state.productsList)
    const loading = useProductStore((state) => state.loading)

    // Effects
    useEffect(() => {
        getProducts().then(() => {
            console.log("products fetched first time.")
        })
    }, [])

    // Templates
    if (loading > 0) {
        return (
            <div
                className="
                text-secondary
                absolute left-1/2 top-1/2
                h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        )
    }

    console.log("productsList:", productsList)

    return (
        <main className="relative">
            {!document.URL.includes("admin") && <TopBar />}
            {!document.URL.includes("admin") && <CategoriesTop />}
            {!document.URL.includes("admin") && <NavBar />}
            <Outlet />
            {!document.URL.includes("admin") && <Footer />}
        </main>
    )
}

export default LayoutContainer
