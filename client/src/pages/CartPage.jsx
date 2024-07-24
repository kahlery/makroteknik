import React, { useEffect, useState } from 'react';
import ListingGrid from "../components/content/ListingGrid";
import { useCartStore } from "../stores/CartStore";

const ProductsPage = () => {
    // stores
    const cartProducts = useCartStore((state) => state.cartProducts);
    const loadCartFromLocalStorage = useCartStore((state) => state.loadCartFromLocalStorage);

    // states
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [cartProducts]);

    const sendEmail = () => {
        const subject = encodeURIComponent('Cart Product IDs');
        const body = encodeURIComponent(`Here are the product IDs in the cart: ${cartProducts.join(', ')}`);
        window.location.href = `mailto:garpayyasla@gmail.com?subject=${subject}&body=${body}`;
    };

    if (isLoading) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return (
        <div>
            <div className="w-screen mt-[100px] md:mt-[190px] px-0 md:px-64 pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    {cartProducts.length > 0 ? (
                        <ListingGrid
                            key="cart"
                            cartProductIds={Object.keys(cartProducts)}
                        />
                    ) : (
                        <div className="text-center text-xl text-gray-500 mt-32">
                            Your cart is empty, add some products to see them here.&nbsp;
                            <button
                                onClick={() => window
                                    .location
                                    .replace(process.env.PUBLIC_URL + '/products')}
                                className="text-secondary hover:underline transition duration-300"
                            >
                                Go to Products
                            </button>
                        </div>
                    )}
                </div>
                {cartProducts.length > 0 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={sendEmail}
                            className="bg-blue-500 text-white font-bold py-2 px-3 hover:bg-blue-700 transition duration-300"
                        >
                            Get an Offer with this Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
