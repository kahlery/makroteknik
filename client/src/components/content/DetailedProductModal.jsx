import React from 'react';
import { ShoppingCart, Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useCartStore } from '../../stores/CartStore'; // Import the store

const DetailedProductModal = ({ isModalOpen, selectedProduct, setIsModalOpen }) => {
    // stores
    const addProducts = useCartStore((state) => state.addProducts);
    const removeProducts = useCartStore((state) => state.removeProducts);
    const incrementProductQuantity = useCartStore((state) => state.incrementProductQuantity);
    const decrementProductQuantity = useCartStore((state) => state.decrementProductQuantity);
    const cartProducts = useCartStore((state) => state.cartProducts);

    // Ensure selectedProduct is not null or undefined
    if (!selectedProduct) return null;

    const isCartProduct = cartProducts[selectedProduct.productId];
    const quantity = isCartProduct || 0;

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-80 z-50
                flex justify-center items-center
                 ${isModalOpen ? '' : 'transition-opacity duration-[1.6s] opacity-0 pointer-events-none'
                }`}
            onClick={() => {
                // close modal
                setIsModalOpen(false);
            }}
        >
            {isModalOpen && selectedProduct && (
                <div
                    className="relative bg-white md:w-4/6 h-[75%] md:h-fit mt-16 md:mt-0 md:max-h-none p-4 m-4 md:m-0 shadow-lg overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="md:absolute fixed right-10 md:right-6 top-[20%] md:top-4 flex rounded-full bg-blue-200 bg-opacity-50">
                        <h2 className="text-2xl text-black font-bold mb-2 mt-2 ml-auto"></h2>
                        <IconButton
                            className="absolute ml-auto text-black bg-red-500"
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            <Close />
                        </IconButton>
                    </div>
                    <div className="flex flex-col md:flex-row items-center h-full">
                        <img
                            src={process.env.PUBLIC_URL + selectedProduct.imageUrl}
                            alt={selectedProduct.title}
                            className="md:w-1/2 object-cover mr-0 mb-4 md:my-0"
                        />
                        <div className="flex flex-col md:w-1/2 justify-between h-full md:ml-8 md:mr-4 my-8">
                            <h2 className="text-2xl text-black font-bold mb-2">{selectedProduct.title}</h2>
                            <hr className="border-gray-200 shadow-md my-3" />
                            <p className="text-sm text-gray-500 mb-1">{selectedProduct.code}</p>
                            <p className="text-sm text-gray-500 mb-4">{selectedProduct.description}</p>
                            <hr className="border-gray-200 shadow-md my-3" />
                            <div className="font-extrabold text-xl mb-4 text-black">£ 33.00</div>
                            {!isCartProduct ? (
                                <button
                                    className="bg-black text-white font-bold px-4 py-2 rounded-md w-full shadow-lg"
                                    onClick={() => {
                                        addProducts(selectedProduct.productId);
                                        console.log('added product:', selectedProduct.productId);
                                    }}
                                >
                                    <ShoppingCart className="text-white mr-2" sx={{ fontSize: '1rem' }} />
                                    Add to Cart
                                </button>
                            ) : (
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="text-black font-extrabold flex px-4 py-1 border-black border rounded-md shadow-lg"
                                        onClick={() => {
                                            decrementProductQuantity(selectedProduct.productId);
                                        }}
                                    >
                                        -
                                    </button>
                                    <p className="mx-4 text-black">{quantity}</p>
                                    <button
                                        className="text-black font-extrabold flex px-4 py-1 border-black border rounded-md shadow-lg"
                                        onClick={() => {
                                            incrementProductQuantity(selectedProduct.productId);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailedProductModal;
