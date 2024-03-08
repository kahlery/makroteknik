import React from 'react';

const ProductsPage = () => {
    const categories = [
        { id: 1, title: 'Category 1' },
        { id: 2, title: 'Category 2' },
        { id: 3, title: 'Category 3' },
    ];

    const products = [
        { id: 1, category: 1, title: 'Product 1', image: 'product1.jpg' },
        { id: 2, category: 1, title: 'Product 2', image: 'product2.jpg' },
        { id: 3, category: 1, title: 'Product 3', image: 'product3.jpg' },
        { id: 4, category: 2, title: 'Product 4', image: 'product4.jpg' },
        { id: 5, category: 2, title: 'Product 5', image: 'product5.jpg' },
        { id: 6, category: 2, title: 'Product 6', image: 'product6.jpg' },
        { id: 7, category: 3, title: 'Product 7', image: 'product7.jpg' },
        { id: 8, category: 3, title: 'Product 8', image: 'product8.jpg' },
        { id: 9, category: 3, title: 'Product 9', image: 'product9.jpg' },
    ];

    return (
        <div className="flex pt-[600px]">
            <div className="w-1/4 bg-gray-200 p-4">
                {/* Navigator */}
                <ul>
                    {categories.map((category) => (
                        <li key={category.id} className="mb-4">
                            <h2 className="font-bold">{category.title}</h2>
                            {/* Subcategories */}
                            <ul className="ml-4">
                                {/* Placeholder subcategories */}
                                <li>Subcategory 1</li>
                                <li>Subcategory 2</li>
                                <li>Subcategory 3</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4">
                {/* Search area */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>
                {/* Product grids */}
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border border-gray-300 p-4">
                            <img src={product.image} alt={product.title} className="mb-2" />
                            <h3 className="font-bold">{product.title}</h3>
                            <button className="bg-blue-500 text-white px-4 py-2 mt-2">
                                Inspectate
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;