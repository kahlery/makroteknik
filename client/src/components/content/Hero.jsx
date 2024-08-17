import React from "react"

const Hero = ({ imageIndex, height }) => {
    const index = imageIndex || 55
    // const imageUrl = process.env.PUBLIC_URL + `images/patterns/${index}.png`;
    const imageUrl = process.env.PUBLIC_URL + "images/bormoro.webp"

    return (
        <div
            className={`flex relative pt-24 md:pt-44 h-[320px] md:h-[400px] 2xl:[500px] text-white lg:px-64 shadow-lg `}
        >
            <img
                src={imageUrl}
                alt="hero"
                className="absolute inset-0 object-cover w-full h-full z-10 brightness-[.65]"
            />
            <div
                className="text-start flex my-auto mx-4 sm:mx-24 lg:mx-0 py-6 
                lg:w-[30rem] bg-black shadow-md bg-opacity-[0.85] z-20"
            >
                <div className="flex flex-col justify-center">
                    <h2 className="text-sm px-6 sm:px-10 mb-3">
                        It's All About Trust...
                    </h2>
                    <p className="text-xs mb-4 px-6 sm:px-10 text-gray-400">
                        We are more than just a supplier of HVAC products. We
                        are your partner in creating comfortable, efficient, and
                        sustainable indoor environments.
                    </p>
                    <div className="grid grid-cols-2 gap-4 px-6 sm:px-10 text-xs">
                        <button className="border-secondary border-2 text-white py-2 px-2 shadow-lg shadow-black hover:bg-black">
                            Inspectate Our Products
                        </button>
                        <button className="underline text-whitepy-2 px-2 shadow-lg hover:bg-white hover:text-black transition-colors duration-500">
                            Get An Offer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
