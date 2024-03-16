import React from 'react';

const ListingGrid = ({ productsList }) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {productsList.map((product) => (
                <div key={product.code} className="bg-black bg-opacity-80 border-l-4 border-orange-600 p-4 shadow-md text-sm">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover mb-4" />
                    <h2 className="text-sm font-bold mb-2 text-white">{product.title}</h2>
                    <p className="text-gray-400 mb-2">{product.code}</p>
                    <p className="text-gray-200">{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ListingGrid;