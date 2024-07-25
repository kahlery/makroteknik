import React, { useState } from 'react';
import { ShoppingCart } from '@mui/icons-material';

// stores
import { useCartStore } from '../../stores/CartStore';

const ProductCard = ({
    product, isHorizontalNorVertical,
    setSelectedProduct, setIsModalOpen
}) => {
    // stores
    const addProducts = useCartStore((state) => state.addProducts);
    const removeProducts = useCartStore((state) => state.removeProducts);
    const incrementProductQuantity = useCartStore((state) => state.incrementProductQuantity);
    const decrementProductQuantity = useCartStore((state) => state.decrementProductQuantity);
    const setProductQuantity = useCartStore((state) => state.setProductQuantity);
    const cartProducts = useCartStore((state) => state.cartProducts);

    const isCartProduct = cartProducts[product.productId];

    const handleQuantityChange = (e) => {
        const quantity = Math.max(0, parseInt(e.target.value) || 0); // Ensure non-negative integers
        setProductQuantity(product.productId, quantity);
    };

    return (
        <div
            key={product.productId}
            className={`bg-white relative flex flex-col text-sm duration-1000 h-90 border shadow-md pb-4
            hover:scale-100 hover:cursor-pointer hover:rounded-md hover:shadow-md hover:border-secondary hover:border-2
            ${isHorizontalNorVertical ? 'w-48' : ''} ${isCartProduct ? ' shadow-[0_0px_10px_rgba(8,_112,_184,_0.7)]' : ''}`}
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
                className="h-32 object-scale-down p-4 min-h-32"
            />
            <hr className="border-gray-200 shadow-md my-3 mx-4" />
            <div className="px-3 md:px-4 flex flex-col h-full">
                <h2 className="text-xs mb-2 text-black font-bold line-clamp-1">{product.title}</h2>
                <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                <p className="text-xs text-gray-500 line-clamp-4">{product.description}</p>
                <hr className="border-gray-200 shadow-md my-3" />
                <div className="font-extrabold text-xs flex">
                    <p className="text-black pt-[1.5px]">£ 33.00</p>
                </div>
                {!isCartProduct ? (
                    <button
                        className="bg-black text-white font-extrabold flex px-2 py-1 mt-2 border-black border justify-center rounded-md w-full shadow-lg"
                        onClick={
                            (e) => {
                                e.stopPropagation();
                                addProducts(product.productId);
                            }
                        }
                    >
                        <ShoppingCart className="text-white" sx={{ fontSize: '1rem' }} />
                        <p className="ml-2 text-xs">Add to cart</p>
                    </button>
                ) : (
                    <div className="flex items-center justify-between mt-2">
                        <button
                            className="text-black font-extrabold flex px-4 py-1 border-black border rounded-md shadow-lg"
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    decrementProductQuantity(product.productId);
                                }
                            }
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={cartProducts[product.productId]}
                            onChange={handleQuantityChange}
                            className="w-full text-center border-b-2 border-secondary text-black mx-4"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="text-black font-extrabold flex px-4 py-1 border-black border rounded-md shadow-lg"
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    incrementProductQuantity(product.productId);
                                }
                            }
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
