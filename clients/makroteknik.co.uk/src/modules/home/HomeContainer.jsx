import React, { useState, useEffect } from "react"

// Stores
import { useCartStore } from "../cart/stores/CartStore"
import { useProductStore } from "../product/stores/ProductStore"

// Components
import Hero from "./components/Hero"
import LatestNewsGrid from "./components/LatestNewsGrid"
import ListingGrid from "../common/components/ListingGrid"

const videoUrl = process.env.PUBLIC_URL + "/videos/hero.mp4"

const HomeContainer = () => {
    // Stores
    const [loading, setLoading] = useState(true)
    const loadCartFromLocalStorage = useCartStore(
        (state) => state.loadCartFromLocalStorage
    )
    const cartProducts = useCartStore((state) => state.cartProducts)
    const productsList = useProductStore((state) => state.productsList)

    // Effects
    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage()
            setLoading(false)
        }
        loadCart()
    }, [loadCartFromLocalStorage])

    // Templates
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
                {/* <h1 className="text-start text-sm text-black col-span-full font-bold">
                    Industrial Footage:
                </h1>
                <iframe
                    className="shadow-2xl"
                    width=""
                    height="500"
                    src="https://www.youtube.com/embed/XtXtj9wkfo4?si=uhQlZTYFLTbPozvy"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe> */}

                <h1 className="text-start text-sm text-black col-span-full font-bold">
                    Physical Location:
                </h1>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8949248855433!2d-0.07130325069532596!3d51.606546596438946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761fd4262f50d3%3A0xc4e9ed421c7d91d6!2sMakro%20Tech%20Ltd!5e0!3m2!1sen!2str!4v1724669133510!5m2!1sen!2str"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="shadow-lg"
                ></iframe>
                <address className="flex flex-col gap-4 border-secondary pl-4 text-[0.8rem]">
                    <strong>
                        Makro Tech LTD,{" "}
                        <span className="font-normal">
                            trading as Makro Teknik
                        </span>
                    </strong>
                    <span className="flex flex-col font-bold">
                        Warehouse Address:
                        <span className="font-normal">
                            Unit 19a Peacock Industrial Estate, White Hart Lane,
                            London, Tottenham, N17 8DT.
                        </span>
                    </span>
                    <span className="flex flex-col font-bold">
                        Office Address:
                        <span className="font-normal">
                            Unit 32 Peacock Industrial Estate, White Hart Lane,
                            London, Tottenham, N17 8DT.
                        </span>
                    </span>
                    <span>
                        Registered in England and Wales (registered number:
                        11757043)
                    </span>
                </address>
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
