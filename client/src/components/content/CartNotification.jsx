import React, { useEffect, useState } from 'react';

// stores
import { useProductStore } from '../../stores/ProductStore';
import { useCartStore } from '../../stores/CartStore';

const CartNotification = () => {
    // states
    const [isProductListLoading, setIsProductListLoading] = useState(true);
    const [cartProductList, setCartProductList] = useState([]);

    // stores
    const cartProducts = useCartStore((state) => state.cartProducts);
    const productList = useProductStore((state) => state.productsList);
    const fetchProducts = useProductStore((state) => state.fetchProducts);

    // fetch products and update product list
    useEffect(() => {
        const loadProducts = async () => {
            await fetchProducts();
            setIsProductListLoading(false);
        };
        loadProducts();
    }, [fetchProducts]);

    // update cartProductList when productList or cartProducts change
    useEffect(() => {
        if (isProductListLoading || !productList.length) return;

        const updatedCartProductList = Object.keys(cartProducts).map((productId) => {
            const product = productList.find((product) => product.productId == productId);
            return {
                productId: productId,
                productName: product ? product.title : productId,
                quantity: cartProducts[productId],
                price: product.price ? product.price * cartProducts[productId] : 0
            };
        });

        setCartProductList(updatedCartProductList);
    }, [isProductListLoading, productList, cartProducts]);

    // effects
    useEffect(() => {
        const cartNotification = document.getElementById('cart-notification');
        if (!cartNotification) return;

        // appear
        cartNotification.style.opacity = 1;
        // disappear after 1.5 seconds
        const timer = setTimeout(() => {
            cartNotification.style.opacity = 0;
        }, 3000);
        return () => clearTimeout(timer);
    }, [cartProducts]);

    return (
        <div id='cart-notification' className='z-50'>
            <div className='bg-black border-l-8 border-black bg-opacity-70 absolute bottom-14 md:top-[165px] md:right-4 w-64 h-fit shadow-lg hidden md:block z-50 pointer-events-none md:pointer-events-auto p-4'>
                <p className='text-white text-center font-bold text-sm mb-2'>Cart</p>
                <hr className='border-gray-400 mb-2' />
                <div className='overflow-x-auto'>
                    <table className='w-full text-white text-sm'>
                        <thead>
                            <tr className='border-b border-gray-400'>
                                <th className='py-2 text-left'>Product</th>
                                <th className='py-2 text-left'>Quantity</th>
                                <th className='py-2 text-left'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProductList.length > 0 ? cartProductList.map((product) => (
                                <tr key={product.productId} className='border-b border-gray-400'>
                                    <td className='py-2'>{product.productName}</td>
                                    <td className='py-2'>{product.quantity}</td>
                                    <td className='py-2'>£ {product.price.toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan='3' className='py-2 text-center'>Cart is Empty</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <hr className='border-gray-400 mt-2' />
                <div className='flex justify-between mt-2 text-sm px-2'>
                    <p className='text-white'>Count: {Object.keys(cartProducts).length}</p>
                    <p className='text-white'>Price: £ {cartProductList.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
                </div>
            </div>
            <p className='absolute bottom-14 right-0 z-50 w-32 bg-black border-l-8 border-black bg-opacity-70 text-white text-sm p-1 rounded-md shadow-lg block md:hidden'>
                Cart Has Been Updated
            </p>
        </div>
    );
};

export default CartNotification;
