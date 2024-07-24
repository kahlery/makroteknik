import React, { useEffect, useState } from 'react';
import ListingGrid from "../components/content/ListingGrid";
import { useCartStore } from "../stores/CartStore";

const ProductsPage = () => {
    // stores
    const cartProducts = useCartStore((state) => state.cartProducts);
    const loadCartFromLocalStorage = useCartStore((state) => state.loadCartFromLocalStorage);

    // constants
    const cartProductIds = Object.keys(cartProducts);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            await loadCartFromLocalStorage();
            setLoading(false);
        };
        loadCart();
    }, [loadCartFromLocalStorage]);

    const sendEmail = () => {
        const subject = encodeURIComponent('Cart Product IDs');
        const body = encodeURIComponent(`Here are the product IDs in the cart: ${cartProductIds}`);
        window.location.href = `mailto:garpayyasla@gmail.com?subject=${subject}&body=${body}`;
    };

    if (loading) {
        return (
            <div className="text-center text-lg text-gray-500 mt-32">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <div className="w-screen mt-[100px] md:mt-[190px] px-0 md:px-64 pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    {
                        Object.keys(cartProducts).length > 0 ? (
                            <ListingGrid
                                key="cart"
                                cartProductIds={Object.keys(cartProducts).map((productId) => parseInt(productId))}

                            />
                        ) : (
                            <div className="text-center text-lg text-gray-500 mt-32">
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
                        )
                    }
                </div>
                {
                    Object.keys(cartProducts).length > 0 && (
                        <div className="text-center mt-10">
                            <button
                                onClick={sendEmail}
                                className="bg-secondary text-white font-bold py-2 px-3 hover:bg-blue-700 transition duration-300"
                            >
                                Get an Offer with this Cart
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProductsPage;
