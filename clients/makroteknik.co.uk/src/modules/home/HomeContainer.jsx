import React, { useState, useEffect } from "react"

// stores
import { useCartStore } from "../cart/stores/CartStore"
import { useProductStore } from "../product/stores/ProductStore"

// components
import Hero from "./components/Hero"
import LatestNewsGrid from "./components/LatestNewsGrid"
import ListingGrid from "../common/components/ListingGrid"

const videoUrl = process.env.PUBLIC_URL + "/videos/hero.mp4"

const HomeContainer = () => {
    // stores
    const [loading, setLoading] = useState(true)
    const loadCartFromLocalStorage = useCartStore(
        (state) => state.loadCartFromLocalStorage
    )
    const cartProducts = useCartStore((state) => state.cartProducts)
    const productsList = useProductStore((state) => state.productsList)

    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage()
            setLoading(false)
        }
        loadCart()
    }, [loadCartFromLocalStorage])

    return (
        <div className="text-start flex flex-col gap-8 pb-16 bg-fon">
            <Hero height={128} />
            <div className="text-white mx-4 lg:mx-1 md:px-[16rem] 2xl:px-[25rem]">
                {loading ? (
                    <div className="text-center text-lg  text-primary font-bold my-8">
                        Loading...
                    </div>
                ) : (
                    <ListingGrid
                        productsList={productsList}
                        isFeatured={true}
                    />
                )}
            </div>

            <div className="px-4 md:px-[16rem] 2xl:px-[25rem] gap-8 flex flex-col w-screen">
                <h1 className="text-start text-sm text-black col-span-full font-bold">
                    Industrial Footage:
                </h1>
                <iframe
                    className=""
                    width=""
                    height="500"
                    src="https://www.youtube.com/embed/XtXtj9wkfo4?si=uhQlZTYFLTbPozvy"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
            </div>

            {/* <LatestNewsGrid /> */}

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
