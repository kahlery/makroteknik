import React from 'react';

const InNavigation = () => {
    return (
        <div className="flex flex-col md:flex-row text-end">
            <div className="bg-opacity-90 xl:pl-56 pr-4 text-primary w-fit h-fit fixed top-[124px] pt-12 z-30 overflow-y-scroll no-scrollbar">
                <nav className="flex-grow">
                    <div className="grid grid-cols text-base">
                        <a href="/about" className="transition py-2 border-r-2 pr-4 hover:scale-125 hover:border-0 opacity-50">About Us</a>
                        <a href="/about" className="transition py-2 border-r-2 pr-4 hover:scale-125 hover:border-0 opacity-50">About Us</a>
                        <a href="/about" className="transition py-2 border-r-2 pr-4 hover:scale-125 hover:border-0 opacity-50">About Us</a>
                    </div>
                </nav >
            </div >
        </div >
    );
};

export default InNavigation;