import React from 'react';
import { Home, Groups, PrecisionManufacturing, Face6, ShoppingCart } from '@mui/icons-material';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex shadow bg-white mb-4 py-2 pt-4 lg:py-0 px-6 lg:px-64 flex-row items-center justify-between gap-4 w-full fixed top-[49px] z-40 text-center">
            <div className="hidden sm:flex items-center justify-center">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="m-2 h-14" alt="logo" />
            </div>
            <div className="flex items-center justify-center text-black ">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <Link to="" className="flex-row items-center hover:text-secondary">
                            <Home className='' sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-500'>Home</p>
                        </Link>
                    </li>
                    <li >
                        <Link to="/about" className="flex-row items-center hover:text-secondary">
                            <Groups sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-500'>
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <PrecisionManufacturing sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-500'>
                                Products
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center text-black ">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li >
                        <Link to="/about" className="flex-row items-center hover:text-secondary">
                            <Face6 sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' }, fontWeight: 'bold' }} />
                            <p className='text-[0.8rem] text-gray-500'>
                                Login
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-secondary">
                            <ShoppingCart sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[0.8rem] text-gray-500'>
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