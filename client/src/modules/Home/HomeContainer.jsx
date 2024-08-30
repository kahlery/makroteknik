import React, { useState, useEffect } from "react"

// stores
import { useCartStore } from "../Cart/stores/CartStore"

// components
import Hero from "./components/Hero"
import LatestNewsGrid from "./components/LatestNewsGrid"
import ListingGrid from "../Common/components/ListingGrid"

const productsListUrl = process.env.PUBLIC_URL + "/data/products.json"
const videoUrl = process.env.PUBLIC_URL + "/videos/hero.mp4"

const HomeContainer = () => {
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
            <div className="text-white mx-4 lg:mx-0 md:px-[16rem] 2xl:px-[25rem]">
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

            <div className="px-4 md:px-[16rem] 2xl:px-[25rem] gap-4 flex flex-col w-screen">
                <h1 className="text-start text-sm text-black col-span-full">
                    Industrial Footage:
                </h1>
                <iframe
                    className="rounded-xl outline-8 outline-black"
                    width=""
                    height="490"
                    src="https://www.youtube.com/embed/XtXtj9wkfo4?si=uhQlZTYFLTbPozvy"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>

            <LatestNewsGrid />

            {/* <video
                autoPlay
                loop
                muted
                className="overflow-hidden object-cover flex mx-auto h-[450px] lg:h-[500px] w-full bg-black shadow-lg"
            >
                <source src={videoUrl} type="video/mp4" />
            </video> */}
        </div>
    )
}

export default HomeContainer
