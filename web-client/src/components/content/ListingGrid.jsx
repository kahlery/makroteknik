import React from 'react';

const ListingGrid = ({ productsList }) => {
    return (
        <div className="grid lg:grid-cols-3 gap-4">
            {productsList.map((product) => (
                <div key={product.code} className="bg-white p-4 shadow-md">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover mb-4" />
                    <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-500 mb-2">{product.code}</p>
                    <p className="text-gray-700">{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ListingGrid;