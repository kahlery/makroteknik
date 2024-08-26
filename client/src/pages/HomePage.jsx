import React, { useState, useEffect } from "react"

// stores
import { useCartStore } from "../stores/CartStore"

// components
import Hero from "../components/content/Hero"
import LatestNewsGrid from "../components/home/LatestNewsGrid"
import ListingGrid from "../components/content/ListingGrid"

const productsListUrl = process.env.PUBLIC_URL + "/data/products.json"
const videoUrl = process.env.PUBLIC_URL + "/videos/hero.mp4"

const HomePage = () => {
    // stores
    const [loading, setLoading] = useState(true)
    const loadCartFromLocalStorage = useCartStore(
        (state) => state.loadCartFromLocalStorage
    )
    const cartProducts = useCartStore((state) => state.cartProducts)

    // states
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage()
            setLoading(false)
        }
        loadCart()
    }, [loadCartFromLocalStorage])

    useEffect(() => {
        // Ürünleri yükle
        fetch(productsListUrl)
            .then((response) => response.json())
            .then((data) => setProductsList(data))
            .catch((error) => console.error("Error loading products:", error))
    }, [])

    return (
        <div className="text-start flex flex-col gap-8 mb-8">
            <Hero height={96} />
            <div className="text-white pb-12 mx-4 lg:mx-0 md:px-[16rem] 2xl:px-[25rem]">
                {loading ? (
                    <div className="text-center text-lg text-gray-500 my-8">
                        Loading Products...
                    </div>
                ) : (
                    <ListingGrid
                        productsList={productsList}
                        isFeatured={true}
                    />
                )}
            </div>

            <video
                autoPlay
                loop
                muted
                className="overflow-hidden flex mx-auto h-[450px] lg:h-[500px] w-full bg-black shadow-lg"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            {/* <LatestNewsGrid /> */}
        </div>
    )
}

export default HomePage
