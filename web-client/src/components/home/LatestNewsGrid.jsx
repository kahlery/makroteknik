import React from 'react';

const LatestNewsGrid = () => {
    const index = 44; // pattern index
    const imageUrl = process.env.PUBLIC_URL + `images/patterns/${index}.png`;

    return (
        <div className="text-black pb-12 mt-4 sm:mt-12 lg:px-44 bg-white"
            style={{
                // backgroundImage: `url(${imageUrl})`,
                // backgroundSize: '7px',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'repeat',
            }}
        >
            <h1 className="text-start text-sm lg:text-lg font-bold text-primary mt-2 lg:mt-0 col-span-full border-b-[1.5px] py-2 mx-6">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 text-[0.7rem] sm:text-sm px-6 md:px-0" style={{ color: '#f2f2f2' }} >
                <div className="p-4 text-start">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <div className="p-4 text-start">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <div className="p-4 text-start">
                    <h3 className="text-sm font-bold mb-2 text-black">Headline lorem ipsum dolor sit amet...</h3>
                    <hr className="border-[0.1px] border-white mb-2" />
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </p>
                </div>
                <button className="text-sm underline text-secondary py-2 rounded-lg transition-colors duration-500 col-span-full">
                    List All News
                </button>
            </div >
        </div>
    );
};

export default LatestNewsGrid;