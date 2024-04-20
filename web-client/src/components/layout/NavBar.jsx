import React from 'react';
import { Home, Groups, PrecisionManufacturing, ShoppingCart } from '@mui/icons-material';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-white flex h-14 mb-4 py-2 pt-4 lg:py-0 shadow-sm px-6 lg:px-64 flex-row items-center justify-between gap-4 w-full fixed top-[53px] sm:top-[56px] z-40 text-center">
            <div className="hidden lg:flex">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mt-1 h-[45px]" alt="logo" />
            </div>
            <div className="flex items-center justify-center mx-auto md:mx-0 text-gray-700">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <Link to="" className="flex-row items-center hover:text-secondary">
                            <Home className='' sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-400'>Home</p>
                        </Link>
                    </li>
                    <li >
                        <Link to="/about" className="flex-row items-center hover:text-secondary">
                            <Groups sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-400'>
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <PrecisionManufacturing sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-400'>
                                Products
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <ShoppingCart sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-400'>
                                Cart
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;