import React, { useEffect, useState } from 'react';
import { Home, Groups, PrecisionManufacturing, ShoppingCart, FilterAlt } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useCategoriesFilterStore } from '../../stores/CategoriesFilterStore';

const NavBar = () => {

    // states
    const [categories, setCategories] = useState([]);

    // stores
    const resetCategories = useCategoriesFilterStore((state) => state.resetCategories);
    const addCategories = useCategoriesFilterStore((state) => state.addCategories);

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, []);

    return (
        <nav className="bg-white bg-opacity-90 md:bg-white md:bg-opacity-100 flex h-14 lg:mb-4 py-4 pt-4 lg:py-0 px-6 lg:px-64 flex-row items-center 
        justify-center md:justify-between w-full fixed bottom-0 sm:top-[40px] z-50 text-center md:border-b border-t md:border-t-0">
            <div className="hidden md:flex items-center justify-center md:mx-0 text-secondary">
                <a href="https://www.makroteknik.com.tr" target="_blank" rel="noreferrer">
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mt-1 h-[45px]" alt="logo" />
                </a>
            </div>
            <div className="w-full flex text-secondary">
                <ul className="flex w-full justify-evenly md:justify-end md:space-x-6">
                    <li>
                        <Link
                            to=""
                            className="flex-row items-center text-black hover:text-secondary"
                            onClick={() => resetCategories()}
                        >
                            <Home
                                className='text-secondary'
                                sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }}
                            />
                            <p
                                className='text-[0.7rem]'
                            >
                                Home
                            </p>
                        </Link>
                    </li>
                    <li >
                        <Link
                            to="/about"
                            className="flex-row items-center text-black hover:text-secondary"
                            onClick={() => resetCategories()}
                        >
                            <Groups
                                className='text-secondary'
                                sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }}
                            />
                            <p
                                className='text-[0.7rem]'
                            >
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="flex-row items-center text-black hover:text-secondary"
                            onClick={() => {
                                categories.map((category) => addCategories(category.categoryId));
                                // scroll to top
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            }
                        >
                            <PrecisionManufacturing
                                className='text-secondary'
                                sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }}
                            />
                            <p
                                className='text-[0.7rem]'
                            >
                                Products
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cart"
                            className="flex-row items-center text-black hover:text-secondary"
                            onClick={() => resetCategories()}
                        >
                            <ShoppingCart
                                className='text-secondary'
                                sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }}
                            />
                            <p
                                className='text-[0.7rem]'
                            >
                                Cart
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
};

export default NavBar;