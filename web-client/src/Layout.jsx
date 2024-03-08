import { Outlet, Link } from "react-router-dom";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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