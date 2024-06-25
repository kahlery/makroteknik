import React, { useEffect, useState } from 'react';
import { Home, Groups, PrecisionManufacturing, ShoppingCart, FilterAlt } from '@mui/icons-material';

const ProductCard = ({ product, isHorizontalNorVertical, addProducts, setSelectedProduct, setIsModalOpen }) => {
    return (
        <div
            key={product.productId}
            className={`bg-white relative flex flex-col text-sm duration-1000 h-90 border shadow-md 
            hover:scale-105 hover:cursor-pointer hover:border-secondary hover:border-2 hover:rounded-md
            hover:shadow-lg ${isHorizontalNorVertical ? 'w-48' : ''}`}
            onClick={() => {
                // show product detail in a modal
                console.log('product detail:', product.productId);
                setSelectedProduct(product);
                setIsModalOpen(true);
            }}
        >
            <img
                src={process.env.PUBLIC_URL + product.imageUrl}
                alt={product.title}
                className="h-36 object-scale-down"
            />
            <div className="p-2 md:p-4 flex flex-col h-full">
                <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                <div className="h-2" />
                <div className="flex mt-auto items-center align-bottom">
                </div>
                <div className="font-extrabold text-xs flex">
                    <p className="text-black pt-[5px]">£ 33.00</p>
                </div>
                <button
                    className="bg-black text-white font-extrabold flex px-2 py-1 mt-2 border-black border"
                    onClick={
                        (e) => {
                            e.stopPropagation();
                            addProducts(product.productId);
                            console.log('added product:', product.productId);
                        }
                    }
                >
                    <ShoppingCart
                        className="text-white"
                        sx={{ fontSize: '1rem' }}
                    />
                    <p className="ml-2 text-xs">Add to Cart</p>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
