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

    useEffect(() => {
        fetchProducts().then(() => {
            console.log("Products fetched")
        })
    }, [fetchProducts])

    return (
        <main className="relative">
            <TopBar />
            <CategoriesTop />
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default LayoutContainer
