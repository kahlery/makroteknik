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
    const getProducts = useProductStore((state) => state.getProducts)
    const getCategories = useProductStore((state) => state.getCategories)

    useEffect(() => {
        getProducts().then(() => {
            console.log("Products fetched")
        })
        getCategories().then(() => {
            console.log("Categories fetched")
        })
    }, [getProducts, getCategories])

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
