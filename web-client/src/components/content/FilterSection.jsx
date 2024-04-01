import React from 'react';
import { Search, FilterAlt } from '@mui/icons-material';

const FilterSection = ({ }) => {
    return (
        <div className="flex flex-col md:flex-row text-start">
            <div className="pl-16 w-screen hidden md:block md:w-[15.5rem] h-screen text-black fixed py-[145px] left-0 z-50 overflow-y-hidden">
                {/* Search Bar Section */}
                <div className="flex items-center justify-center md:justify-start px-3 py-[.3rem] border-b mb-4">
                    <Search className="text-gray-400" sx={{ fontSize: '1.2rem' }} />
                    <input type="text" placeholder="Search All" className="ml-1 outline-none bg-transparent placeholder:text-gray-400 placeholder:text-sm text-black" />
                </div>
                {/* Sort By Section */}
                <span className="text-black text-sm">Sort by:</span>
                <select className="outline-none bg-transparent text-gray-400 text-sm">
                    <option value="">Select an option</option>
                    <option value="price_high_low">Price: High to Low</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="newest">Alphabetically: A-Z</option>
                    <option value="oldest">Alphabetically: Z-A</option>
                </select>
                {/* Reset Filters Button */}
                <button className="text-gray-400 text-sm py-1 mt-4 rounded-md underline">Remove All Filters</button>
                {/* Filter By Brand */}
                <div className="mt-4">
                    <span className="text-black text-sm">Filter By Brand:</span>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="domus" className="text-red-500" />
                        <label htmlFor="domus" className="text-gray-400 text-sm">Domus (344)</label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="helios" className="form-checkbox text-primary" />
                        <label htmlFor="helios" className="text-gray-400 text-sm">Helios (13)</label>
                    </div>
                </div>
                {/* Filter By Price */}
                <div className="mt-4">
                    <span className="text-black text-sm">Filter By Price:</span>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="under_100" className="form-checkbox text-primary" />
                        <label htmlFor="under_100" className="text-gray-400 text-sm">Under $100 (344)</label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="100_200" className="form-checkbox text-primary" />
                        <label htmlFor="100_200" className="text-gray-400 text-sm">$100 - $200 (13)</label>
                    </div>
                </div>
                {/* Filter By Category */}
                <div className="mt-4">
                    <span className="text-black text-sm">Filter By Category:</span>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="fans" className="form-checkbox text-primary" />
                        <label htmlFor="fans" className="text-gray-400 text-sm">Fans (344)</label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="ducting" className="form-checkbox text-primary" />
                        <label htmlFor="ducting" className="text-gray-400 text-sm">Ducting (13)</label>
                    </div>
                </div>
                {/* If it is on sale */}
                <div className="mt-4">
                    <span className="text-black text-sm">If it is on sale:</span>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" id="on_sale" className="form-checkbox text-primary" />
                        <label htmlFor="on_sale" className="text-gray-400 text-sm">On Sale (344)</label>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default FilterSection;