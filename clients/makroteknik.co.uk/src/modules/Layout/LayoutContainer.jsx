import { React, useEffect } from "react"

// router v6
import { Outlet } from "react-router-dom"

// components
import TopBar from "./components/TopBar"
import CategoriesTop from "./components/CategoriesTop"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

// stores
import { useProductStore } from "../Products/stores/ProductStore"

const LayoutContainer = () => {
    const fetchProducts = useProductStore((state) => state.fetchProducts)
    const fetchCategories = useProductStore((state) => state.fetchCategories)

    useEffect(() => {
        fetchProducts().then(() => {
            console.log("Products fetched")
        })
        fetchCategories().then(() => {
            console.log("Categories fetched")
        })
    }, [fetchProducts, fetchCategories])

    return (
        <main className="relative">
            {!document.URL.endsWith("admin") && <TopBar />}
            {!document.URL.endsWith("admin") && <CategoriesTop />}
            {!document.URL.endsWith("admin") && <NavBar />}
            <Outlet />
            <Footer />
        </main>
    )
}

export default LayoutContainer
