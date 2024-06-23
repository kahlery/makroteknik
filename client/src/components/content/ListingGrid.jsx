import React, { useState, useEffect } from 'react';
import { ShoppingCart, Close } from '@mui/icons-material';
import { useCartStore } from '../../stores/CartStore';

const categoriesListUrl = process.env.PUBLIC_URL + '/data/categories.json';

const ListingGrid = ({ productsList, isFeatured, categoryId, cartProductIds }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const addProducts = useCartStore((state) => state.addProducts);

    useEffect(() => {
        // Kategorileri yükle
        fetch(categoriesListUrl)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error loading categories:', error));
    }, []);

    useEffect(() => {
        // Ürünleri yükle
        fetch('/data/products.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error loading products:', error));
    }, []);

    if (cartProductIds) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    !cartProductIds.length &&
                    <p className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                        Your cart is empty.
                    </p>
                }
                {cartProductIds.map(productId => {
                    const product = products.find(product => product.productId === productId);
                    return (
                        <div key={product.productId} className="bg-white relative flex flex-col text-sm duration-500 h-90 border shadow-md
                        hover:scale-110 hover:cursor-pointer">
                            <button className="text-black absolute right-0 top-3 font-extrabold rounded-l-xl shadow-md backdrop-blur-sm py-1 px-3"
                                onClick={() => {
                                    addProducts(product.productId);
                                    console.log('added product:', product.productId);
                                }}
                            >
                                <Close className="text-black" sx={{ fontSize: '1.2rem' }} />
                            </button>
                            <div className="text-black absolute left-0 top-3 font-extrabold text-xs rounded-r-xl shadow-md backdrop-blur-sm py-1 px-3">
                                £ 33.00
                            </div>
                            <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="h-36 object-scale-down" />
                            <div className="p-2 md:p-4 flex flex-col h-full">
                                <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                                <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                                <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                                <div className="h-2" />
                                <div className="flex mt-auto items-center align-bottom">
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
        );
    }

    if (!isFeatured) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    !productsList.length &&
                    <p className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                        Please select a category to see products.
                    </p>
                }
                {categories.map(category => {
                    const categoryProducts = productsList.filter(product => product.categoryId === category.categoryId);
                    const shouldHide = categoryProducts.length === 0;
                    return (
                        <React.Fragment key={'category_' + category.categoryId}>
                            {!shouldHide && (
                                <h2 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                                    {category.categoryName}:
                                </h2>
                            )}
                            {categoryProducts.map(product => (
                                <div key={product.productId} className="bg-white relative flex flex-col text-sm duration-500 h-90 border shadow-md 
                    hover:scale-110 hover:cursor-pointer">
                                    <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="h-36 object-scale-down" />
                                    <button className="bg-white text-black font-extrabold flex p-[6px] border rounded-full absolute right-0"
                                        onClick={() => {
                                            addProducts(product.productId);
                                            console.log('added product:', product.productId);
                                        }}
                                    >
                                        <ShoppingCart className="text-black" sx={{ fontSize: '1.2rem' }} />
                                    </button>
                                    <div className="p-2 md:p-4 flex flex-col h-full">
                                        <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                                        <p className="font-extrabold text-xs flex justify-between">
                                            £ 33.00
                                        </p>
                                        <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                                        <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                                        <div className="h-2" />
                                        <div className="flex mt-auto items-center align-bottom">

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    );
                })
                }
            </div >
        );
    }
    else {
        let featuredProducts;

        if (categoryId !== undefined) {
            featuredProducts = productsList.filter(product => product.categoryId === categoryId);
        }
        else {
            // const featuredProducts = productsList.filter(product => product.isFeatured);
            featuredProducts = productsList.filter(product => product); // TODO: For testing
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryId == undefined && <h2 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Featured Products:
                </h2>}
                {featuredProducts.map(product => (
                    <div key={product.productId} className="bg-white relative flex flex-col text-sm duration-500 h-90 border shadow-md 
                    hover:scale-110 hover:cursor-pointer">
                        <button className="text-black absolute right-0 top-3 font-extrabold rounded-l-xl shadow-md backdrop-blur-sm py-1 px-3"
                            onClick={() => {
                                addProducts(product.productId);
                                console.log('added product:', product.productId);
                            }}
                        >
                            <ShoppingCart className="text-black" sx={{ fontSize: '1rem' }} />
                        </button>
                        <div className="text-black absolute left-0 top-3 font-extrabold text-xs rounded-r-xl shadow-md backdrop-blur-sm py-1 px-3">
                            £ 33.00
                        </div>
                        <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="h-36 object-scale-down" />
                        <div className="p-2 md:p-4 flex flex-col h-full">
                            <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                            <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                            <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                            <div className="h-2" />
                            <div className="flex mt-auto items-center align-bottom">
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        );
    }
};

export default ListingGrid;
