import React from 'react';
import { Search, FilterAlt } from '@mui/icons-material';

const InNavigation = ({ itemsList, isSearchActive }) => {
    return (
        <div className="flex flex-col md:flex-row text-end">
            <div className="pl-16 pr-4 w-screen hidden md:block md:w-[15.5rem] h-screen text-black fixed py-[170px] left-0 z-30 overflow-y-hidden">
                <div className='sticky -top-1 flex flex-row-reverse gap-4 h-fit shadow-lg shadow-primary border-b-[1.5px] border-gray-800 bg-white bg-opacity-100 pt-4 mb-2'
                    style={{ visibility: isSearchActive ? 'hidden' : 'hidden' }}>
                    <button className=" flex items-center justify-start h-8 w-full border-gray-500 border-[1.5px] text-white rounded-md gap-[6px] px-2 mb-4">
                        <p className="text-xs text-gray-500">Search...</p>
                    </button>
                </div>
                <nav className="flex-grow">
                    <div className="grid grid-cols gap-14 text-base">
                        {itemsList.map((category, index) => (
                            <div key={index}>
                                <h2 className='text-xs text-black font-bold'>{category.categoryName}</h2>
                                {/* <a href="#">
                                    <ul>
                                        {category.items.map((item, itemIndex) => (
                                            <li className='my-2 text-xs text-gray-500 duration-100 hover:text-secondary hover:scale-110' key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                </a> */}
                            </div>
                        ))}
                    </div>
                </nav >
            </div >
        </div >
    );
};

export default InNavigation;