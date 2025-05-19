import React, { useEffect, useState, useRef } from "react"

// icons
import {
    Home,
    Groups,
    PrecisionManufacturing,
    ShoppingCart,
} from "@mui/icons-material"

// router v6
import { Link } from "react-router-dom"

// stores
import { useCartStore } from "../../cart/stores/CartStore"

const NavBar = () => {
    // stores
    const cartProducts = useCartStore((state) => state.cartProducts)

    return (
        <nav
            className="bg-white font-bold md:bg-white md:bg-opacity-100 flex h-14 lg:mb-4 py-4 pt-4 lg:py-0 px-6 md:px-[16rem] 2xl:px-[25rem] flex-row items-center 
        justify-center md:justify-between  w-full fixed bottom-0 sm:top-[40px] z-40 text-center 
        border-black md:border-b border-t md:border-t-0 border-opacity-20"
            onClick={() => {
                // scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" })
            }}
        >
            <div className="hidden md:flex items-center justify-center md:mx-0 text-secondary">
                <a
                    href="https://www.makroteknik.com.tr"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={process.env.PUBLIC_URL + "/logo.svg"}
                        className="mt-1 h-[42px]"
                        alt="logo"
                    />
                </a>
            </div>

            <li>
                <Link
                    to="/products"
                    className="flex flex-col items-center text-secondary hover:text-primary"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                    </svg>
                    <p className="text-[0.7rem] text-black text-opacity-60">
                        Search
                    </p>
                </Link>
            </li>

            {/* <Link to="">
                <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    className="mt-3 h-[47px] mx-auto"
                    alt="logo"
                />
            </Link> */}
            <div className="w-full md:w-fit flex text-secondary">
                <ul className="flex w-full justify-evenly md:justify-end md:space-x-6">
                    <li>
                        <Link
                            to=""
                            className="flex-row items-center text-secondary hover:text-primary"
                        >
                            <Home
                                className="text-opacity-80"
                                sx={{
                                    fontSize: "1.3rem",
                                    "@media (max-width: 1024px)": {
                                        fontSize: "1.5rem",
                                    },
                                }}
                            />
                            <p className="text-[0.7rem] text-black text-opacity-60">
                                Home
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="flex-row items-center text-secondary hover:text-primary"
                        >
                            <Groups
                                className="text-opacity-80"
                                sx={{
                                    fontSize: "1.3rem",
                                    "@media (max-width: 1024px)": {
                                        fontSize: "1.5rem",
                                    },
                                }}
                            />
                            <p className="text-[0.7rem] text-black text-opacity-60">
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="flex-row items-center text-secondary hover:text-primary"
                            onClick={() => {
                                // scroll to top
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                        >
                            <PrecisionManufacturing
                                className="text-opacity-80"
                                sx={{
                                    fontSize: "1.3rem",
                                    "@media (max-width: 1024px)": {
                                        fontSize: "1.5rem",
                                    },
                                }}
                            />
                            <p className="text-[0.7rem] text-black text-opacity-60">
                                Products
                            </p>
                        </Link>
                    </li>
                    <li className="relative md:static">
                        <Link
                            to="/cart"
                            className="flex-row items-center text-secondary hover:text-primary"
                        >
                            <div className="relative z-50">
                                {Object.keys(cartProducts).length > 0 && (
                                    <div
                                        className="absolute -top-[3px] -right-[3px] rounded-full
                                    text-white flex items-center justify-center"
                                    >
                                        <span className="relative flex h-4 w-4">
                                            <span className="animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                        </span>
                                        <span className="absolute text-[0.65rem]">
                                            {Object.keys(cartProducts).length}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <ShoppingCart
                                className="relative text-opacity-80"
                                sx={{
                                    fontSize: "1.3rem",
                                    "@media (max-width: 1024px)": {
                                        fontSize: "1.5rem",
                                    },
                                }}
                            />
                            <p className="text-[0.7rem] text-black text-opacity-60">
                                Cart
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
