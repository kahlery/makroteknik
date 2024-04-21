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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {categories.map(category => {
                    const categoryProducts = productsList.filter(product => product.categoryId === category.categoryId);
                    const shouldHide = categoryProducts.length === 0;

                    return (
                        <React.Fragment key={category.categoryName}>
                            {!shouldHide && (
                                <h1 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                                    {category.categoryName}:
                                </h1>
                            )}
                            {categoryProducts.map(product => (
                                <div key={product.code} className="bg-white relative flex flex-col text-sm duration-500 h-90 border-2 border-black
                                shadow-secondary shadow-[5px_5px_0px_0px] hover:scale-105 hover:shadow-orange-600">
                                    <button className="text-black absolute right-0 font-extrabold rounded-full shadow-md p-1 m-1">
                                        <ShoppingCart className="text-secondary m-1" sx={{ fontSize: '1.3rem' }} />
                                    </button>
                                    <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="h-36 object-scale-down" />
                                    <div className="p-2 md:p-4 flex flex-col h-full">
                                        <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                                        <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                                        <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                                        <div className="flex mt-auto items-center align-bottom">
                                            <div className="text-black font-extrabold">
                                                £ 33.00 <Sell className="mr-2" sx={{ fontSize: '0.9rem' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
    else {
        const featuredProducts = productsList.filter(product => product);

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <h1 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Featured Products:
                </h1>
                {featuredProducts.map(product => (
                    <div key={product.code} className="bg-white relative flex flex-col text-sm duration-500 h-90 border-2 border-black
                    shadow-secondary shadow-[5px_5px_0px_0px] hover:scale-105 hover:shadow-orange-600">
                        <button className="text-black absolute right-0 font-extrabold rounded-full shadow-md p-1 m-1">
                            <ShoppingCart className="text-secondary m-1" sx={{ fontSize: '1.3rem' }} />
                        </button>
                        <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="h-36 object-scale-down" />
                        <div className="p-2 md:p-4 flex flex-col h-full">
                            <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                            <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                            <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                            <div className="flex mt-auto items-center align-bottom">
                                <div className="text-black font-extrabold">
                                    £ 33.00 <Sell className="mr-2" sx={{ fontSize: '0.9rem' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

export default ListingGrid;
