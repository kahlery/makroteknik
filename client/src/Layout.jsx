import { Outlet, Link } from "react-router-dom"
import TopBar from "./components/layout/TopBar"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import CategoriesTop from "./components/layout/CategoriesTop"

const Layout = () => {
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

export default Layout
