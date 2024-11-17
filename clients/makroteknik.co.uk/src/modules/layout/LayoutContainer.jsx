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
            <h1 className="absolute font-bold text-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                Loading...
            </h1>
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
