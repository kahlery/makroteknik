import React from 'react';

const LatestNewsGrid = () => {
    return (
        <div className="text-black mx-6 lg:mx-64 flex-col my-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[0.7rem] sm:text-sm md:px-0" style={{ color: '#f2f2f2' }} >
                <h1 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Latest News:
                </h1>

                <div className="p-4 bg-white flex flex-col text-sm duration-500 h-90 shadow-md border
                    hover:scale-110 hover:cursor-pointer">
                    <h3 className="text-xs font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500 text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <span className="text-xs text-secondary pt-2">
                        Read More
                    </span>
                </div>


                <div className="p-4 bg-white flex flex-col text-sm duration-500 h-90 shadow-md border
                    hover:scale-110 hover:cursor-pointer">
                    <h3 className="text-xs font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500 text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <span className="text-xs text-secondary pt-2">
                        Read More
                    </span>
                </div>


                <div className="p-4 bg-white flex flex-col text-sm duration-500 h-90 shadow-md border
                    hover:scale-110 hover:cursor-pointer">
                    <h3 className="text-xs font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500 text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <span className="text-xs text-secondary pt-2">
                        Read More
                    </span>
                </div>


                <div className="p-4 bg-white flex flex-col text-sm duration-500 h-90 shadow-md border
                    hover:scale-110 hover:cursor-pointer">
                    <h3 className="text-xs font-bold mb-2 text-black">Expocomfort Fuarı Conference Exhibition</h3>
                    <p className="text-gray-500 text-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                    <span className="text-xs text-secondary pt-2">
                        Read More
                    </span>
                </div>

            </div >
            <button className="flex mr-auto mt-8 border-white border-2 p-2 text-xs shadow-md rounded-full text-black">View All News</button>


        </div>
    );
};

export default LatestNewsGrid;