import React from 'react';

const HomeHero = () => {
    const index = 2; // or any other index value
    const imageUrl = process.env.PUBLIC_URL + `/heros/${index}.png`;

    return (
        <div className="text-white bg-fixed lg:px-44 max-[432px]:h-[500px] h-[450px] lg:h-[500px]"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute mx-6 sm:mx-24 lg:mx-0 top-[12rem] py-6 sm:py-8 lg:h-[14rem] lg:w-[30rem] overflow-hidden bg-black shadow-2xl shadow-black bg-opacity-[0.85]">
                <div className="flex flex-col justify-center">
                    <h2 className="text-base font-bold mb-2">
                        It's All About Trust...
                    </h2>
                    <p className="text-sm mb-4 px-4 sm:px-10 text-[0.7rem] sm:text-sm" style={{ color: '#f2f2f2' }} >
                        We are more than just a supplier of HVAC products. We are your partner in creating comfortable, efficient, and sustainable indoor environments.
                    </p>
                    <div className="flex flex-row gap-4 justify-center px-4 sm:px-6 text-[0.7rem] sm:text-sm" style={{ color: '#f2f2f2' }} >
                        <button className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-secondary-dark">
                            Get An Offer
                        </button>
                        <button className="border-2 text-white border-secondary py-2 px-4 rounded-lg shadow-lg hover:bg-secondary-dark">
                            Inspectate Our Products
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default HomeHero;