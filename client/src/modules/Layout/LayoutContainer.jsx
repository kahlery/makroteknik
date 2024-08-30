// router v6
import { Outlet } from "react-router-dom"

// components
import TopBar from "./components/TopBar"
import CategoriesTop from "./components/CategoriesTop"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

const LayoutContainer = () => {
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
