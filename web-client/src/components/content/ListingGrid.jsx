import React from 'react';

const ListingGrid = ({ productsList, featured }) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 border-x">
            {featured && <h1 className="text-start text-base font-bold text-primary mt-2 lg:mt-0 col-span-full border-b py-2 mx-6">Featured Products</h1>}
            {!featured && <h1 className="text-start text-base font-bold text-primary mt-2 lg:mt-0 col-span-full border-b py-2 px-2 mx-4 md:px-0">Products</h1>}
            {productsList.map((product) => (
                <div key={product.code} className="flex flex-col bg-white bg-opacity-80 p-4 text-sm hover:scale-105 hover:-translate-y-5 duration-500 h-90 overflow-hidden">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover mb-4 rounded-lg" />
                    <h2 className="text-sm font-bold mb-2 text-black">{product.title}</h2>
                    <p className="text-gray-400 mb-2">{product.code}</p>
                    <p className="text-gray-600 text-xs line-clamp-3">{product.description}</p>
                    <div className="flex justify-between sm:mt-auto items-center align-bottom gap-4">
                        <button className="border text-black rounded-md p-2 mt-4 w-full text-xs">Add to cart</button>
                        <button className="border text-black rounded-md p-2 mt-4 w-full text-xs">View details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListingGrid;