import React from 'react';

const LatestNewsGrid = () => {
    return (
        <div className="text-black mb-12 mt-4 sm:mt-12 lg:mx-64 border-x">
            <h1 className="text-start text-sm lg:text-base font-bold text-primary my-2 lg:mt-0 col-span-full border-b py-2 mx-6">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 text-[0.7rem] sm:text-sm px-6 md:px-0" style={{ color: '#f2f2f2' }} >
                <div className="p-4 text-start shadow">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <div className="p-4 text-start shadow">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <div className="p-4 text-start shadow">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <button className="mx-2 text-sm shadow text-black border py-2 mt-4 rounded-lg transition-colors duration-500 col-span-full hover:bg-secondary">
                    List All News
                </button>
            </div >
        </div>
    );
};

export default LatestNewsGrid;