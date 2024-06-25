import React from 'react';

import { ShoppingCart } from '@mui/icons-material';

const DetailedProductModal = ({ isModalOpen, selectedProduct, setIsModalOpen, addProducts }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-80 z-50
                flex justify-center items-center
                 ${isModalOpen ? '' : 'transition-opacity duration-[1.6s] opacity-0 pointer-events-none'
                }`}
            onClick={() => {
                // close modal
                console.log('close modal');
                setIsModalOpen(false);
            }}
        >
            {isModalOpen && (
                <div
                    className="bg-white w-1/2 h-fit p-8 rounded-md shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center">
                        <img
                            src={process.env.PUBLIC_URL + selectedProduct.imageUrl}
                            alt={selectedProduct.title}
                            className="h-32 object-cover rounded-md mr-8"
                        />
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
                            <p className="text-sm text-gray-500 mb-1">{selectedProduct.code}</p>
                            <p className="text-sm text-gray-500 mb-4">{selectedProduct.description}</p>
                            <div className="font-extrabold text-xl mb-2 text-black">£ 33.00</div>
                            <button
                                className="bg-black text-white font-bold px-4 py-2 rounded-md"
                                onClick={() => {
                                    addProducts(selectedProduct.productId);
                                    console.log('added product:', selectedProduct.productId);
                                }}
                            >
                                <ShoppingCart className="text-white mr-2" sx={{ fontSize: '1rem' }} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default DetailedProductModal;