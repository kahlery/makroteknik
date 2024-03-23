import React from 'react';

const ListingGrid = ({ productsList, featured }) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {featured && <h1 className="text-start text-sm lg:text-lg font-bold text-white mt-2 lg:mt-0 col-span-full border-b-[1.5px] border-gray-800 py-2 mx-6">Featured Products</h1>}
            {!featured && <h1 className="text-start text-2xl font-bold text-white mt-2 lg:mt-0 col-span-full border-b-[1.5px] border-gray-800 py-2 px-2 mx-4 md:px-0">Products</h1>}
            {productsList.map((product) => (
                <div key={product.code} className="flex flex-col bg-primary bg-opacity-80 p-4 text-sm hover:scale-105 hover:-translate-y-5 duration-500 h-96 overflow-hidden">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover mb-4 rounded-lg" />
                    <h2 className="text-sm font-bold mb-2 text-white">{product.title}</h2>
                    <p className="text-gray-400 mb-2">{product.code}</p>
                    <p className="text-secondary max-h-40 overflow-hidden overflow-y-scroll">{product.description}</p>
                    <div className="flex justify-between mt-auto items-center align-bottom">
                        <button className="border-secondary border-2 text-white rounded-md p-2 mt-4 w-full shadow-lg shadow-black text-xs">Add to cart</button>
                        <button className="bg-primary text-white rounded-md p-2 mt-4 w-full">View details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListingGrid;