import React from "react"
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import ProductsContainer from "../../Products/ProductsContainer"

const Hero = ({ imageIndex, height }) => {
    const index = imageIndex || 55
    // const bgUrl = process.env.PUBLIC_URL + `images/patterns/${index}.png`;
    const bgUrl = process.env.PUBLIC_URL + "images/heros/12.jpeg"
    const chars = process.env.PUBLIC_URL + "images/heros/9.png"

    return (
        <div
            className={`flex relative bg-fon justify-center gap-12 pt-24 md:pt-44
                 2xl:pt-32 h-[370px] md:h-[400px] 2xl:[500px]  px-4
                  border-y border-black border-opacity-20 `}
        >
            {/* <img
                src={bgUrl}
                alt="hero"
                className="absolute inset-0 object-top object-cover w-full h-full z-10 
                brightness-[.75] grayscale-[1]"
            /> */}
            <div
                className="text-center md:text-end flex my-auto py-6 md:border-r border-opacity-20 border-black 
                lg:max-w-[30rem] z-20"
            >
                <div className="flex flex-col justify-center text-black">
                    <img
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        className="md:hidden h-[70px] w-[200px] -mt-2 mx-auto"
                        alt="logo"
                    />
                    <hr className="md:hidden border-black border-opacity-20 my-3" />
                    <h2 className="px-4 sm:px-10 mb-3">
                        It's All About Trust & Years of Experience
                    </h2>
                    <p className="text-[.75rem] mb-4 sm:px-10 text-black text-opacity-60">
                        We are more than just a supplier of HVAC products. We
                        are your partner in creating comfortable, efficient, and
                        sustainable indoor environments.
                    </p>
                    <div className="flex justify-center md:justify-end gap-4 px-6 sm:px-10 text-[.65rem]">
                        <Link
                            to="/products"
                            onClick={() => {
                                // scroll to top
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                        >
                            <button className="rounded-full font-bold text-white text-opacity-100 bg-secondary py-2 px-4 flex gap-2 items-center">
                                <FaSearch /> Inspectate products!
                            </button>
                        </Link>
                        <button className="font-bold rounded-full border border-black py-2 px-4 hover:bg-white hover:text-black transition-colors duration-500">
                            Get An Offer
                        </button>
                    </div>
                </div>
            </div>
            {/* <img
                src={chars}
                alt="hero"
                className="hidden md:flex md:static mt-auto object-scale-down w-fit max-w-64 h-[90%] md:h-[86%] mr-24 z-10"
            /> */}
        </div>
    )
}

export default Hero
