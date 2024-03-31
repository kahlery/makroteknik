import React from 'react';
import { Search, FilterAlt } from '@mui/icons-material';

const InNavigation = ({ itemsList, isSearchActive }) => {
    return (
        <div className="flex flex-col md:flex-row text-center md:text-end">
            <div className="bg-opacity-80 bg-white backdrop-blur-sm px-4 w-screen hidden md:block md:w-[22rem] h-screen text-white fixed top-[122.3px] pb-[330px] z-50 overflow-y-scroll">
                <div className='sticky -top-1 flex flex-row-reverse gap-4 h-fit shadow-lg shadow-primary border-b-[1.5px] border-gray-800 bg-white bg-opacity-100 pt-4 mb-2'
                    style={{ visibility: isSearchActive ? 'hidden' : 'hidden' }}>
                    <button className=" flex items-center justify-start h-8 w-full border-gray-500 border-[1.5px] text-white rounded-md gap-[6px] px-2 mb-4">
                        <p className="text-sm text-gray-500">Search...</p>
                    </button>
                </div>
                <nav className="flex-grow">
                    <div className="grid grid-cols text-base">
                        {itemsList.map((category, index) => (
                            <div key={index}>
                                <h2 className='text-sm text-black underline'>{category.categoryName}</h2>
                                <a href="#">
                                    <ul>
                                        {category.items.map((item, itemIndex) => (
                                            <li className='my-2 text-sm text-gray-500 duration-100 hover:text-secondary' key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                </a>
                            </div>
                        ))}
                    </div>
                </nav >
            </div >
        </div >
    );
};

export default InNavigation;