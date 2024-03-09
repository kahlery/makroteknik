import { Outlet, Link } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

const Layout = () => {
    return (
        <>
            <TopBar />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;