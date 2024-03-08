import React from 'react';

const LatestNewsGrid = () => {
    const index = 3; // or any other index value
    const imageUrl = process.env.PUBLIC_URL + `/patterns/${index}.png`;

    return (
        <div className="text-white pb-16 lg:px-44"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '5%',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
            }}
        >
            <p className="text-lg font-bold text-primary text-start py-8">Latest Feeds:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <div className="bg-black bg-opacity-80 p-4 shadow-2xl shadow-black">
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for...</h3>
                    <hr className="border-[1px] border-secondary mb-2" />
                    <p className="text-sm">
                        We are now open for business. Our services include web development, mobile app development, and cloud computing.
                        <span className="ml-2">
                            <a href="#" className="text-secondary hover:underline">Read More</a>
                        </span>
                    </p>
                </div>
                <div className="bg-black bg-opacity-80 p-4 shadow-2xl shadow-black">
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for...</h3>
                    <hr className="border-[1px] border-secondary mb-2" />
                    <p className="text-sm">
                        We are now open for business. Our services include web development, mobile app development, and cloud computing.
                        <span className="ml-2">
                            <a href="#" className="text-secondary hover:underline">Read More</a>
                        </span>
                    </p>
                </div>
                <div className="bg-black bg-opacity-80 p-4 shadow-2xl shadow-black">
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for...</h3>
                    <hr className="border-[1px] border-secondary mb-2" />
                    <p className="text-sm">
                        We are now open for business. Our services include web development, mobile app development, and cloud computing.
                        <span className="ml-2">
                            <a href="#" className="text-secondary hover:underline">Read More</a>
                        </span>
                    </p>
                </div>
                <div className="bg-black bg-opacity-80 p-4 shadow-2xl shadow-black">
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for...</h3>
                    <hr className="border-[1px] border-secondary mb-2" />
                    <p className="text-sm">
                        We are now open for business. Our services include web development, mobile app development, and cloud computing.
                        <span className="ml-2">
                            <a href="#" className="text-secondary hover:underline">Read More</a>
                        </span>
                    </p>
                </div>
                <div className="bg-black bg-opacity-80 p-4 shadow-2xl shadow-black">
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for...</h3>
                    <hr className="border-[1px] border-secondary mb-2" />
                    <p className="text-sm">
                        We are now open for business. Our services include web development, mobile app development, and cloud computing.
                        <span className="ml-2">
                            <a href="#" className="text-secondary hover:underline">Read More</a>
                        </span>
                    </p>
                </div>
            </div >
        </div>
    );
};

export default LatestNewsGrid;