import React from 'react';

const FirstBanner = ({ bgSubUrl, figureSubUrl }) => {
    const bgUrl = process.env.PUBLIC_URL + bgSubUrl;
    const figureUrl = process.env.PUBLIC_URL + figureSubUrl;

    return (
        <div className="text-center text-white lg:px-64 max-[432px]:h-[500px] h-[450px] lg:h-[500px] flex-row-reverse bg-center relative"
            style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                alt: 'first banner image backround white ducting store',
            }}
        >
            <img src={figureUrl} alt="industrial fan image" className="h-[320px] lg:h-[350px] absolute bottom-0 right-[8%] lg:right-[20%] z-0" />
        </div>
    );
};

export default FirstBanner;
