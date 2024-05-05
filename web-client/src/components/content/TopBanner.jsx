import React from 'react';

const TopBanner = ({ imageIndex, height }) => {

    const index = imageIndex || 55;
    const imageUrl = process.env.PUBLIC_URL + `images/patterns/${index}.png`;

    return (
        <div className={`flex h-[130px] md:h-[200px] text-white lg:px-64 bg-center relative shadow-lg`}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alt: 'hero image backround white ducting store',
            }
            }
        >
        </div >
    );
};

export default TopBanner;