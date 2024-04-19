import React, { useState, useEffect } from 'react';
import { ShoppingCart } from '@mui/icons-material';

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
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map(category => {
                    const categoryProducts = productsList.filter(product => product.categoryId === category.categoryId);
                    const shouldHide = categoryProducts.length === 0;

                    return (
                        <React.Fragment key={category.categoryName}>
                            {!shouldHide && (
                                <h1 className="text-start text-sm text-gray-500 col-span-full">
                                    {category.categoryName}
                                </h1>
                            )}
                            {categoryProducts.map(product => (
                                <div key={product.code} className="bg-white flex flex-col text-sm hover:border-secondary duration-500 h-90 border rounded-lg shadow-lg">
                                    <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="w-16 object-scale-down" />
                                    <div className="p-4">
                                        <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                                        <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                                        <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                                        <div className="flex justify-between sm:mt-auto items-center align-bottom gap-4">
                                            <button className="text-xs text-black p-1 mt-4 w-full">
                                                <ShoppingCart className="mr-2" sx={{ fontSize: '0.9rem' }} />
                                                Add to cart
                                            </button>
                                            <button className="text-xs text-black p-1 mt-4 w-full underline">View details</button>
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
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-16">
                <h1 className="text-start text-base text-gray-500 col-span-full">
                    Our Products
                </h1>
                {featuredProducts.map(product => (
                    <div key={product.code} className="bg-white flex flex-col text-sm hover:border-secondary duration-500 h-90 border rounded-lg shadow-lg">
                        <img src={process.env.PUBLIC_URL + product.imageUrl} alt={product.title} className="w-full h-36 object-contain" />
                        <div className="p-4">
                            <h2 className="text-xs mb-2 text-black font-bold">{product.title}</h2>
                            <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                            <p className="text-xs text-gray-500 line-clamp-3">{product.description}</p>
                            <div className="flex justify-between sm:mt-auto items-center align-bottom gap-4">
                                <button className="text-xs text-black p-1 mt-4 w-full">
                                    <ShoppingCart className="mr-2" sx={{ fontSize: '0.9rem' }} />
                                    Add to cart
                                </button>
                                <button className="text-xs text-black p-1 mt-4 w-full underline">View details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

export default ListingGrid;
