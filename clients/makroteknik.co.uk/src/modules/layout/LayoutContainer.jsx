import { React, useEffect } from "react"

// router v6
import { Outlet } from "react-router-dom"

// components
import TopBar from "./components/TopBar"
import CategoriesTop from "./components/CategoriesTop"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

// stores
import { useProductStore } from "../product/stores/ProductStore"

const LayoutContainer = () => {
    // Stores
    const getProducts = useProductStore((state) => state.getProducts)
    const getCategories = useProductStore((state) => state.getCategories)
    const productsList = useProductStore((state) => state.productsList)
    const categoriesList = useProductStore((state) => state.categoriesList)
    const loading = useProductStore((state) => state.loading)

    useEffect(() => {
        getProducts().then(() => {
            console.log("products fetched first time.")
        })
        getCategories().then(() => {
            console.log("categories fetched first time")
        })
    }, [])

    if (loading > 0) {
        return (
            <div
                class="
                text-secondary
                absolute left-1/2 top-1/2
                h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
            >
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        )
    }

    console.log("productsList:", productsList, "categoriesList", categoriesList)

    return (
        <main className="relative">
            {!document.URL.endsWith("admin") && <TopBar />}
            {!document.URL.endsWith("admin") && <CategoriesTop />}
            {!document.URL.endsWith("admin") && <NavBar />}
            <Outlet />
            {!document.URL.endsWith("admin") && <Footer />}
        </main>
    )
}

export default LayoutContainer
