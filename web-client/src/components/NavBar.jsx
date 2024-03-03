import React from 'react';
import { Search } from '@mui/icons-material';

const NavBar = () => {
    return (
        <nav className="bg-white mb-2 py-2 shadow-lg px-4 flex items-center justify-between rounded-xl">
            <div className="flex items-center">
                <img src={process.env.PUBLIC_URL + '/favicon.svg'} className="h-16 mr-6" alt="logo" />
                <ul className="ml-6 flex space-x-4">
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-300">Home</a>
                    </li>
                    <li className="relative">
                        <a href="#" className="text-gray-500 hover:text-gray-300">About</a>
                        <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg hidden">
                            <li><a href="#">Institutional</a></li>
                            <li><a href="#">References</a></li>
                            <li><a href="#">ORGANIZATION CHART</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-300">Products</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-300">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <Search className="text-gray-500 mr-6" />
                <button className="border-2 border-primary text-primary py-2 text-sm px-4 rounded-md">REQUEST FOR QUOTE</button>
            </div>
        </nav>
    );
};

export default NavBar;