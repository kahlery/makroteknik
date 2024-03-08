import React from 'react';
import { Home, Groups, PrecisionManufacturing } from '@mui/icons-material';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="border-b-2 border-primary bg-primary bg-opacity-90 backdrop-blur-sm mb-4 py-2 pt-4 lg:py-0 lg:px-44 flex-col lg:flex lg:flex-row items-center justify-between w-full fixed top-[50px] z-20 text-center">
            <div className="hidden lg:flex items-center justify-center">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="m-2 h-14 lg:mr-6" alt="logo" />
            </div>
            {/* <hr className="w-full lg:hidden my-1 border-primary" /> */}
            <div className="flex items-center justify-center text-white">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <Link to="/home" className="flex-row items-center hover:text-orange-600">
                            <Home sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[1rem]'>Home</p>
                        </Link>
                    </li>
                    <li >
                        <Link to="/about" className="flex-row items-center hover:text-orange-600">
                            <Groups sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[1rem]'>
                                About
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex-row items-center hover:text-orange-600">
                            <PrecisionManufacturing sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[1rem]'>
                                Products
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;