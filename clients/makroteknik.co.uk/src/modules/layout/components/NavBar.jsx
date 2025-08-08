import React, { useEffect, useState, useRef } from "react"
import {
    Home,
    Groups,
    PrecisionManufacturing,
    ShoppingCart,
} from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useCartStore } from "../../cart/stores/CartStore"
import { useProductStore } from "../../product/stores/ProductStore"
import { motion } from "framer-motion"

const NavBar = () => {
    const cartProducts = useCartStore((state) => state.cartProducts)
    const products = useProductStore((state) => state.productsList)

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [foundCount, setFoundCount] = useState(0)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const setSearchTextInStore = useProductStore((state) => state.setSearchText)

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchOpen])

    useEffect(() => {
        if (searchText.trim().length > 0) {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(searchText.toLowerCase())
            )
            setFoundCount(filtered.length)
        } else {
            setFoundCount(0)
        }
    }, [searchText, products])

    return (
        <nav
            className="bg-white font-bold md:bg-white md:bg-opacity-100 flex h-14 lg:mb-4 py-4 pt-4 lg:py-0 px-6 md:px-[16rem] 2xl:px-[25rem] flex-row items-center 
            justify-center md:justify-between w-full fixed bottom-0 sm:top-[40px] z-40 text-center 
            border-black md:border-b border-t md:border-t-0 border-opacity-20"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            {/* Logo */}
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

            {/* Search Input/Button */}
            <div className="relative">
                {!searchOpen ? (
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="bg-blue-50 px-4 py-[1.6px] rounded-xl hidden md:block"
                    >
                        <div className="flex flex-col items-center text-secondary hover:text-primary">
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
                                    strokeWidth={3}
                                    d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                                />
                            </svg>
                            <p className="text-[0.7rem] text-black text-opacity-60">
                                Search
                            </p>
                        </div>
                    </button>
                ) : (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 350, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="z-30 absolute -translate-y-1/2  md:-translate-x-1/2 flex items-center bg-white border-yellow-400 border-4 rounded-full py-[7px] px-2"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchText}
                            onChange={(e) => {
                                const value = e.target.value
                                setSearchText(value)
                                setSearchTextInStore(value)
                                if (value.trim().length === 1) {
                                    navigate("/products")
                                }
                            }}
                            placeholder="Search..."
                            className="pl-2 pr-14 w-full text-sm focus:outline-none"
                        />
                        <span className="absolute right-10 text-xs text-gray-500">
                            Found: {foundCount}
                        </span>
                        <button
                            onClick={() => {
                                setSearchOpen(false)
                                setSearchText("")
                                setSearchTextInStore("")
                            }}
                            className="absolute right-3 text-black text-lg font-bold"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Nav Icons */}
            <div
                className="w-full md:w-fit flex text-secondary"
                onClick={() => {
                    setSearchOpen(false)
                    setSearchText("")
                }}
            >
                <ul className="flex w-full justify-evenly md:justify-end md:space-x-6">
                    <li>
                        <Link
                            to="/"
                            className="flex-row items-center text-secondary hover:text-primary"
                        >
                            <Home
                                className="text-opacity-80"
                                sx={{ fontSize: "1.5rem" }}
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
                                sx={{ fontSize: "1.5rem" }}
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
                        >
                            <PrecisionManufacturing
                                className="text-opacity-80"
                                sx={{ fontSize: "1.5rem" }}
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
                            <div className="relative z-20">
                                {Object.keys(cartProducts).length > 0 && (
                                    <div className="absolute -top-[3px] -right-[3px] rounded-full text-white flex items-center justify-center">
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
                                sx={{ fontSize: "1.5rem" }}
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
