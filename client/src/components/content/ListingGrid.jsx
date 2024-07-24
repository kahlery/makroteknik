import React, { useState, useEffect } from 'react';

// components
import ProductCard from './ProductCard';

// stores
import { useCartStore } from '../../stores/CartStore';
import DetailedProductModal from './DetailedProductModal';

const categoriesListUrl = process.env.PUBLIC_URL + '/data/categories.json';

const ListingGrid = ({ productsList, isFeatured, categoryId, cartProductIds, isHorizontalNorVertical }) => {

    console.log('cartProductIds:', cartProductIds);

    // states
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // stores
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

    // cart products
    if (cartProductIds) {
        return (
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen} selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen} addProducts={addProducts}
                />
                {renderCartProducts()}
            </div>
        );
    }

    // normal products
    if (!isFeatured) {
        return (
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen} selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen} addProducts={addProducts}
                />
                {renderNormalProducts()}
            </div>
        );
    }

    // featured products
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
            <div>
                <DetailedProductModal
                    isModalOpen={isModalOpen} selectedProduct={selectedProduct}
                    setIsModalOpen={setIsModalOpen} addProducts={addProducts}
                />
                {renderFeaturedProducts(featuredProducts)}
            </div>
        );
    }

    function renderFeaturedProducts(featuredProducts) {
        return <div className={`${isHorizontalNorVertical ? 'flex flex-nowrap gap-5' : 'grid grid-cols-2 md:grid-cols-4 gap-4'}`}>
            {categoryId == undefined &&
                <h2 className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Featured Products:
                </h2>}
            {featuredProducts.map(product => (
                <ProductCard
                    key={product.productId} product={product}
                    isHorizontalNorVertical={isHorizontalNorVertical} addProducts={addProducts}
                    setSelectedProduct={setSelectedProduct} setIsModalOpen={setIsModalOpen}
                />
            ))}
        </div>;
    }

    function renderNormalProducts() {
        return <div className={`${isHorizontalNorVertical ? 'flex flex-nowrap' : 'grid grid-cols-2 md:grid-cols-4 gap-4'} gap-4`}>
            {!productsList.length &&
                <p className="text-start text-sm text-black col-span-full underline underline-offset-4 font-extrabold">
                    Please select a category to see products.
                </p>}
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
                            <ProductCard
                                key={product.productId} product={product}
                                isHorizontalNorVertical={isHorizontalNorVertical} addProducts={addProducts}
                                setSelectedProduct={setSelectedProduct} setIsModalOpen={setIsModalOpen}
                            />
                        ))}
                    </React.Fragment>
                );
            })}
        </div>;
    }

    function renderCartProducts() {
        return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter(product => cartProductIds.includes(product.productId)).map(product => (
                <ProductCard
                    key={product.productId} product={product}
                    isHorizontalNorVertical={isHorizontalNorVertical} addProducts={addProducts}
                    setSelectedProduct={setSelectedProduct} setIsModalOpen={setIsModalOpen}
                    isCartProduct={true}
                />
            ))}
        </div>;
    }
};

export default ListingGrid;
