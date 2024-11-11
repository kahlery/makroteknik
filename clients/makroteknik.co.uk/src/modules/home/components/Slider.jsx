import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex flex-row overflow-x-scroll divide-white snap-x h-64 lg:h-auto`}>
            {Array.from({ length: 2 }, (_, index) => (
                <img
                    key={index}
                    src={process.env.PUBLIC_URL + `/slides/${index}.jpg`}
                    alt={`Slide Image ${index}`}
                    // className={`transition duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-100'}`}
                    className='snap-center'
                />
            ))}
        </div>
    );
};

export default Slider;