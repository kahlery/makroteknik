import React from 'react';
import { Home, Groups, PrecisionManufacturing, ShoppingCart, FilterAlt } from '@mui/icons-material';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-white flex h-14 lg:mb-4 py-4 pt-4 lg:py-0 px-6 lg:px-64 flex-row items-center 
        justify-between gap-4 w-full fixed bottom-0 sm:top-[50px] z-50 text-center border-b border-t md:border-t-0">
            <div className="hidden lg:block ">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mt-1 h-[45px]" alt="logo" />
            </div>
            <div className="flex items-center justify-center md:mx-0 text-gray-700">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <Link to="" className="flex-row items-center hover:text-secondary">
                            <Home className='' sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-black'>Home</p>
                        </Link>
                    </li>
                    <li >
                        <Link to="/about" className="flex-row items-center hover:text-secondary">
                            <Groups sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-black'>
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <PrecisionManufacturing sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-black'>
                                Products
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <ShoppingCart sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-black'>
                                Cart
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="fixed  block sm:hidden items-center justify-center right-0 sm:pr-64 pr-6 text-gray-700">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <FilterAlt sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-black'>
                                Filter
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;