import React, { useState } from 'react';

// MUI Icons
import { ShoppingCart } from '@mui/icons-material';

// stores
import { useCartStore } from '../../stores/CartStore';

const AdjustCartProduct = ({ productId }) => {
    // stores
    const incrementProductQuantity = useCartStore((state) => state.incrementProductQuantity);
    const decrementProductQuantity = useCartStore((state) => state.decrementProductQuantity);
    const setProductQuantity = useCartStore((state) => state.setProductQuantity);
    const cartProducts = useCartStore((state) => state.cartProducts);

    // states
    const [isMoreThan0InCart, setIsMoreThan0InCart] = useState(cartProducts[productId] > 0);

    // constants
    const quantity = cartProducts[productId] || 0;

    // functions
    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(0, parseInt(e.target.value) || 0); // Ensure non-negative integers
        setProductQuantity(productId, newQuantity);
        if (newQuantity === 0) {
            setIsMoreThan0InCart(false);
        }
    };

    const handleAddToCartClick = (e) => {
        e.stopPropagation();
        setIsMoreThan0InCart(true);
        incrementProductQuantity(productId);
    };

    return (
        <div className="relative flex items-center justify-between">
            {!isMoreThan0InCart ? (
                <button
                    className="bg-black text-white font-extrabold flex px-2 py-1 border-black border justify-center rounded-md w-full shadow-lg"
                    onClick={handleAddToCartClick}
                >
                    <ShoppingCart
                        className="text-white"
                        sx={{ fontSize: '1rem' }}
                    />
                    <p className="ml-2 text-xs">Add To Cart</p>
                </button>
            ) : (
                <div className="flex items-center">
                    <button
                        className="text-black font-extrabold flex px-4 py-1 border-b-2 border-black shadow-md"
                        onClick={() => {
                            decrementProductQuantity(productId)
                            if (quantity === 1) {
                                setIsMoreThan0InCart(false);
                            }

                        }
                        }
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="text-black flex px-2 mx-2 md:mx-4 py-1 border-b w-full text-center"
                    />
                    <button
                        className="text-black font-extrabold flex px-4 py-1 border-b-2 border-black shadow-md"
                        onClick={() => incrementProductQuantity(productId)}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdjustCartProduct;
