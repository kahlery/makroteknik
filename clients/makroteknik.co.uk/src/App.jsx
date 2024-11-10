import React, { Component, useEffect } from "react"

// third
import { BrowserRouter, Routes, Route } from "react-router-dom"

// containers
import ProductContainer from "./modules/product/ProductContainer"
import NotFoundContainer from "./modules/common/components/NotFoundContainer"
import { AdminContainer } from "./modules/admin/AdminContainer"
import AboutContainer from "./modules/about/AboutContainer"
import HomeContainer from "./modules/home/HomeContainer"
import LayoutContainer from "./modules/layout/LayoutContainer"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutContainer />}>
                        <Route path="" element={<HomeContainer />} />
                        <Route path="about" element={<AboutContainer />} />
                        <Route path="products" element={<ProductContainer />} />
                        <Route path="cart" element={<CartContainer />} />
                        <Route path="admin" element={<AdminContainer />} />
                        <Route path="*" element={<NotFoundContainer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App
