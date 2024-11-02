import React from "react"

const LatestNewsGrid = () => {
    return (
        <div className="text-black flex-col my-auto px-4 md:px-[16rem] 2xl:px-[25rem]">
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[0.7rem] sm:text-sm md:px-0"
                style={{ color: "#f2f2f2" }}
            >
                <h1 className="text-start text-sm text-black col-span-full">
                    Latest News:
                </h1>
                <NewsElement />
                <NewsElement />
                <NewsElement />
                <NewsElement />
            </div>
            <button className="flex mr-auto mt-8 font-bold px-3 py-2 border-black border text-[.65rem] rounded-full text-black">
                View All News
            </button>
        </div>
    )
}

const NewsElement = () => {
    return (
        <div
            className="bg-white rounded-md relative flex flex-col text-sm duration-1000 h-90 border-black border-opacity-20 border shadow-sm pb-4
hover:scale-100 hover:cursor-pointer hover:border-black p-4"
        >
            <h3 className="text-xs font-bold mb-2 text-black">
                Expocomfort Fuarı Conference Exhibition
            </h3>
            <p className="text-black text-opacity-60 text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
        </div>
    )
}

export default LatestNewsGrid
