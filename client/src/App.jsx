import React, { Component } from "react"

// third
import { BrowserRouter, Routes, Route } from "react-router-dom"

// containers
import LayoutContainer from "./modules/Layout/LayoutContainer"
import HomeContainer from "./modules/Home/HomeContainer"
import AboutContainer from "./modules/About/AboutContainer"
import ProductsContainer from "./modules/Products/ProductsContainer"
import CartContainer from "./modules/Cart/CartContainer"
import NotFoundContainer from "./modules/Common/components/NotFoundContainer"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutContainer />}>
                        <Route path="" element={<HomeContainer />} />
                        <Route path="about" element={<AboutContainer />} />
                        <Route
                            path="products"
                            element={<ProductsContainer />}
                        />
                        <Route path="cart" element={<CartContainer />} />
                        <Route path="*" element={<NotFoundContainer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App
