
import React, { useEffect } from 'react';

// stores
import { useProductStore } from '../../stores/ProductStore';
import { useCartStore } from '../../stores/CartStore';


const CartNotification = () => {
    // stores
    const cartProducts = useCartStore((state) => state.cartProducts);
    const productList = useProductStore((state) => state.productList);

    // consts
    const cartProductList = Object.keys(cartProducts).map((productId) => {
        const product = productList.find((product) => product.productId === productId);
        return { ...product, quantity: cartProducts[productId] };
    }
    );

    // effects
    useEffect(() => {
        // appear
        document.getElementById('cart-notification').style.opacity = 1;
        // disappear after 1.5 seconds
        const timer = setTimeout(() => {
            document.getElementById('cart-notification').style.opacity = 0;
        }, 3000);
        return () => clearTimeout(timer);
    }, [cartProducts]);

    return (
        <div
            id='cart-notification'
            className='z-50'
        >
            <div
                className='bg-black border-l-8 border-black bg-opacity-70 absolute bottom-14 md:top-[165px]
        md:right-4 w-56 h-fit rounded-md shadow-lg hidden md:block
        z-50 pointer-events-none md:pointer-events-auto p-3'
                onMouseEnter={() => {
                    document.getElementById('cart-notification').style.opacity = 1;
                }}
            >
                <p className='text-white text-center font-bold text-[0.8rem]'>Cart</p>
                <hr className='border-gray-400 my-2' />
                <ul className='text-white text-[0.7rem]'>
                    {/* headers */}
                    <li className='flex justify-around mb-2'>
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Price</p>
                    </li>
                    {
                        cartProductList.map((product) => (
                            <li key={product.productId} className='flex justify-around'>
                                <p>{product.title}</p>
                                <p>{product.quantity}</p>
                                <p>£ {product.price * product.quantity}</p>
                            </li>
                        ))
                    }
                </ul>
                <hr className='border-gray-400 mt-2' />
                <div className='flex justify-between mt-2 text-[0.7rem] px-3'>
                    <p className='text-white'>Count: {Object.keys(cartProducts).length}</p>
                    <p className='text-white'>Total Price: £ 33.00</p>
                </div>
            </div>
            <p className='absolute bottom-14 right-0 z-50 w-32 bg-black border-l-8 border-black bg-opacity-70 text-white text-[0.8rem] p-1 rounded-md shadow-lg block md:hidden'>
                Cart Has Been Updated
            </p>
        </div>
    )
};

export default CartNotification;