import React from 'react';

const FirstBanner = () => {
    const index = 15; // or any other index value
    const imageUrl = process.env.PUBLIC_URL + `/content/${index}.png`;

    return (
        <div className="text-center text-white lg:px-44 max-[432px]:h-[500px] h-[450px] lg:h-[500px] flex-row-reverse bg-center relative"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alt: 'first banner image backround white ducting store',
            }}
        >
            <img src={imageUrl.replace('content/' + index, 'content/' + ('13'))} alt="industrial fan image" className="h-[320px] lg:h-[350px] absolute -bottom-3 right-[8%] lg:right-[20%] z-0" />
        </div >
    );
};

export default FirstBanner;