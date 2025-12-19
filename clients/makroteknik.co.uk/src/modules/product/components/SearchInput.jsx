// components/SearchInput.jsx
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useProductStore } from "../../product/stores/ProductStore"

const SearchInput = ({ mobileView = false, onClose }) => {
    const products = useProductStore((state) => state.productsList)
    const setSearchTextInStore = useProductStore((state) => state.setSearchText)

    const [searchOpen, setSearchOpen] = useState(mobileView)
    const [searchText, setSearchText] = useState("")
    const [foundCount, setFoundCount] = useState(0)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            // inputRef.current.focus()
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

    const handleClose = () => {
        setSearchOpen(false)
        setSearchText("")
        setSearchTextInStore("")
        if (onClose) onClose()
    }

    if (mobileView) {
        // Always show input on mobile top of product container
        return (
            <div className="mb-4 px-6">
                <motion.div
                    initial={{ width: "100%", opacity: 1 }}
                    animate={{ width: "100%", opacity: 1 }}
                    className="flex items-center bg-white border-yellow-400 border-4 rounded-full py-[7px] px-4"
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
                        onClick={handleClose}
                        className="absolute right-[95px] md:right-3 text-black text-lg font-bold"
                    >
                        ✕
                    </button>
                </motion.div>
            </div>
        )
    }

    // Desktop NavBar search with button toggle
    return (
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
                        onClick={handleClose}
                        className="absolute right-3 text-black text-lg font-bold"
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </div>
    )
}

export default SearchInput
