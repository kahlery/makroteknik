import React, { useEffect, useState } from 'react';
import ListingGrid from "../components/content/ListingGrid";
import FilterSection from "../components/content/FilterSection";
import { useCategoriesFilterStore } from '../stores/filter-stores/CategoriesFilterStore';
import TopBanner from "../components/content/TopBanner";
import CategoriesQuickAccess from "../components/content/CategoriesQuickAccess";

const ProductsPage = () => {
    const [productsList, setProductsList] = useState([]);
    const selectedCategories = useCategoriesFilterStore((state) => state.selectedCategories);

    useEffect(() => {
        // products.json dosyasını yükle
        fetch(process.env.PUBLIC_URL + '/data/products.json')
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.error('Error loading products:', error));
    }, []);

    const filteredProductsList = productsList.filter(product => selectedCategories.includes(product.categoryId));

    return (
        <div>
            <FilterSection />
            <TopBanner />
            <CategoriesQuickAccess />
            <div className="w-screen mt-4 px-0 md:px-64 pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    <ListingGrid productsList={filteredProductsList} />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
