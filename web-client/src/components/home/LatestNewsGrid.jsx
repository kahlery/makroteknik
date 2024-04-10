import React from 'react';

const LatestNewsGrid = () => {
    return (
        <div className="text-black mb-12 mt-12 sm:mt-16 lg:mx-64 justify-items-center h-full flex-col my-auto">
            <h1 className="text-start bg-opacity-100 bg-secondary font-bold text-white my-[4px] mt-2 lg:mt-0 col-span-full pl-2">
                Latest News
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-[0.7rem] sm:text-sm md:px-0" style={{ color: '#f2f2f2' }} >



                <div className="p-4 text-start border-b-4 border-secondary">
                    <h3 className="text-sm font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <button className="text-sm text-secondary pt-2">
                        Read More
                    </button>
                </div>
                <div className="p-4 text-start border-b-4 border-secondary">
                    <h3 className="text-sm font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <button className="text-sm text-secondary pt-2">
                        Read More
                    </button>
                </div>
                <div className="p-4 text-start border-b-4 border-secondary">
                    <h3 className="text-sm font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <button className="text-sm text-secondary pt-2">
                        Read More
                    </button>
                </div>



            </div >
            <button className="text-sm text-secondary pt-2 mt-6">
                View All News
            </button>
        </div>
    );
};

export default LatestNewsGrid;