import React from "react"

const Hero = ({ imageIndex, height }) => {
    const index = imageIndex || 55
    // const bgUrl = process.env.PUBLIC_URL + `images/patterns/${index}.png`;
    const bgUrl = process.env.PUBLIC_URL + "images/heros/-.jpg"
    const chars = process.env.PUBLIC_URL + "images/heros/9.png"

    return (
        <div
            className={`flex relative justify-center gap-12 pt-24 md:pt-44 2xl:pt-32 h-[320px] md:h-[400px] 2xl:[500px] text-black px-4 border-y border-black border-opacity-20 `}
        >
            <img
                src={bgUrl}
                alt="hero"
                className="absolute inset-0 object-cover w-full h-full z-10 brightness-[1]"
            />

            <div
                className="md:text-end flex my-auto py-6 md:border-r-4 border-black 
                lg:max-w-[30rem] z-20"
            >
                <div className="flex flex-col justify-center text-black">
                    <h2 className="text-sm px-6 sm:px-10 mb-3">
                        It's All About Trust & Years of Experience
                    </h2>
                    <p className="text-xs mb-4 px-6 sm:px-10 text-black text-opacity-60">
                        We are more than just a supplier of HVAC products. We
                        are your partner in creating comfortable, efficient, and
                        sustainable indoor environments.
                    </p>
                    <div className="grid grid-cols-2 gap-4 px-6 sm:px-10 text-xs">
                        <button className="font-bold rounded-full text-white bg-secondary py-2 px-2">
                            Inspectate Our Products
                        </button>
                        <button className="font-bold shadow-secondary shadow-sm rounded-full border border-black text-whitepy-2 px-2 hover:bg-white hover:text-black transition-colors duration-500">
                            Get An Offer
                        </button>
                    </div>
                </div>
            </div>
            <img
                src={chars}
                alt="hero"
                className="hidden md:flex md:static mt-auto object-scale-down w-fit h-[90%] z-10 brightness-[1] mr-24"
            />
        </div>
    )
}

export default Hero
