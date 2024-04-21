import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sell } from '@mui/icons-material';

const categoriesListUrl = process.env.PUBLIC_URL + '/data/categories.json';

const ListingGrid = ({ productsList, isFeatured }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Kategorileri yükle
        fetch(categoriesListUrl)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error loading categories:', error));
    }, []);

    if (!isFeatured) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => {
                    const categoryProducts = productsList.filter(product => product.categoryId === category.categoryId);
                    const shouldHide = categoryProducts.length === 0;
                    return (
                        <React.Fragment key={'category_' + category.categoryId}>
                            {!shouldHide && (
                                <h1 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                                    {category.categoryName}:
                                </h1>
                            )}
                            {categoryProducts.map(product => (
                                <div key={product.productId} className="bg-white relative flex flex-col text-sm duration-500 h-90 border shadow-md 
                    hover:scale-110 hover:cursor-pointer">
                                    <button className="text-black absolute right-0 top-3 font-extrabold rounded-l-xl shadow-md backdrop-blur-sm py-1 px-3">
                                        <ShoppingCart className="text-black" sx={{ fontSize: '1.2rem' }} />
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
                            ))}
                        </React.Fragment>
                    );
                })
                }
            </div >
        );
    }
    else {
        const featuredProducts = productsList.filter(product => product);

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <h1 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Featured Products:
                </h1>
                {featuredProducts.map(product => (
                    <div key={product.productId} className="bg-white relative flex flex-col text-sm duration-500 h-90 border shadow-md 
                    hover:scale-110 hover:cursor-pointer">
                        <button className="text-black absolute right-0 top-3 font-extrabold rounded-l-xl shadow-md backdrop-blur-sm py-1 px-3">
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
                ))}
            </div>
        );
    }
};

export default ListingGrid;
