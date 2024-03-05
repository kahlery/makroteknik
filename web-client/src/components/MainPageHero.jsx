import React from 'react';

const MainPageHero = () => {
    return (
        <div className="bg-primary text-secondary flex items-center justify-between lg:mx-44" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/heros/white_fan.png)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
        }}>
            <div className="w-1/2 p-8">
                <h1 className="text-4xl font-bold mb-4">At Makro Tech LTD</h1>
                <p className="text-lg mb-6">
                    We are more than just a supplier of HVAC products. We are your partner in creating comfortable, efficient, and sustainable indoor environments.
                </p>
                <button className="bg-secondary text-primary py-2 px-4 rounded-lg shadow-lg">
                    Get An Offer
                </button>
            </div>
            <div className="w-1/2">
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
};

export default MainPageHero;