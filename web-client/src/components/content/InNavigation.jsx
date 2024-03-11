import React from 'react';

const InNavigation = ({ itemsList }) => {
    return (
        <div className="flex flex-col md:flex-row text-center lg:text-end">
            <div className="bg-opacity-90 bg-primary backdrop-blur-sm px-4 shadow-lg shadow-black w-96 h-screen text-white fixed top-[122.3px] pb-[330px] pt-4 z-40 overflow-y-scroll">
                <nav className="flex-grow">
                    <div className="grid grid-cols text-base">
                        {itemsList.map((category, index) => (
                            <div key={index}>
                                <h2 className='text-lg'>{category.categoryName}</h2>
                                <a href="#">
                                    <ul>
                                        {category.items.map((item, itemIndex) => (
                                            <li className='border-r-2 pr-4 my-2 border-white text-sm opacity-50' key={itemIndex}>{item}</li>
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