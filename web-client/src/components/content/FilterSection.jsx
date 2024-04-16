import React from 'react';
import { Search, FilterAlt } from '@mui/icons-material';

const FilterSection = ({ }) => {
    return (
        <div className="flex flex-col md:flex-row text-end">
            <div className="pl-16 pr-4 w-screen hidden md:block md:w-[15.5rem] h-screen text-black fixed py-[145px] left-0 z-30 overflow-y-hidden">
                {/* Search Bar Section */}
                <div className="flex border-b mb-4">
                    <input type="text" placeholder="Search All" className="mr-2 outline-none bg-transparent placeholder:text-gray-400 
                    placeholder:text-xs placeholder:text-end text-black text-end w-36 text-xs" />
                    <div className="text-secondary rounded-md">
                        <Search sx={{ fontSize: '1.2rem' }} />
                    </div>
                </div>
                {/* Sort By Section */}
                <div className="mt-4">
                    <span className="text-black font-bold text-xs">Sort by:</span>
                    <select className="outline-none text-gray-600 text-xs text-end flex justify-end ml-auto mt-2">
                        <option value="">Select an option</option>
                        <option value="price_high_low">Price: High to Low</option>
                        <option value="price_low_high">Price: Low to High</option>
                        <option value="newest">Alphabetically: A-Z</option>
                        <option value="oldest">Alphabetically: Z-A</option>
                    </select>
                </div>
                {/* Reset Filters Button */}
                <button className="text-gray-600 text-xs py-1 mt-4 rounded-md underline">Remove All Filters</button>
                {/* Filter By Brand */}
                <div className="mt-4">
                    <span className="text-black font-bold text-xs">Filter By Brand:</span>
                    <div className="flex space-x-2 mt-2 justify-end">
                        <label htmlFor="domus" className="text-gray-600 text-xs">Domus (344)</label>
                        <input type="checkbox" id="domus" className="text-red-500" />
                    </div>
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                        <label htmlFor="helios" className="text-gray-600 text-xs">Helios (13)</label>
                        <input type="checkbox" id="helios" className="form-checkbox text-primary" />
                    </div>
                </div>
                {/* Filter By Price */}
                <div className="mt-4">
                    <span className="text-black font-bold text-xs">Filter By Price:</span>
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                        <label htmlFor="under_100" className="text-gray-600 text-xs">Under $100 (344)</label>
                        <input type="checkbox" id="under_100" className="form-checkbox text-primary" />
                    </div>
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                        <label htmlFor="100_200" className="text-gray-600 text-xs">$100 - $200 (13)</label>
                        <input type="checkbox" id="100_200" className="form-checkbox text-primary" />
                    </div>
                </div>
                {/* Filter By Category */}
                <div className="mt-4">
                    <span className="text-black font-bold text-xs">Filter By Category:</span>
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                        <label htmlFor="fans" className="text-gray-600 text-xs">Fans (344)</label>
                        <input type="checkbox" id="fans" className="form-checkbox text-primary" />
                    </div>
                    <div className="flex items-center space-x-2 mt-2 justify-end">
                        <label htmlFor="ducting" className="text-gray-600 text-xs">Ducting (13)</label>
                        <input type="checkbox" id="ducting" className="form-checkbox text-primary" />
                    </div>
                </div>
                {/* If it is on sale */}
                <div className="mt-4">
                    <span className="text-black font-bold text-xs">If it is on sale:</span>
                    <div className="flex items-center space-x-2 mt-2 justify-end">

                        <label htmlFor="on_sale" className="text-gray-600 text-xs">On Sale (344)</label>
                        <input type="checkbox" id="on_sale" className="form-checkbox text-primary" />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default FilterSection;