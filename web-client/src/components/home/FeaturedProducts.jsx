import React from 'react';

const ListingGrid = ({ productsList }) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:px-44">
            <h1 className="text-start text-sm lg:text-lg font-bold text-white mt-2 lg:mt-0 col-span-full border-b-[1.5px] border-gray-800 py-2 mx-6">Featured Products</h1>
            {productsList.map((product) => (
                <div key={product.code} className="bg-primary bg-opacity-80 p-4 text-sm hover:scale-105 hover:-translate-y-5 duration-500 h-96">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover mb-4" />
                    <h2 className="text-sm font-bold mb-2 text-white">{product.title}</h2>
                    <p className="text-gray-400 mb-2">{product.code}</p>
                    <p className="text-gray-200">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                        <button className="border-secondary border-2 text-white rounded-md p-2 mt-4 w-full">Add to cart</button>
                        <button className="bg-primary text-white rounded-md p-2 mt-4 w-full">View details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListingGrid;