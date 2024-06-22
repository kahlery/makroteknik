import React, { useEffect, useState } from 'react';
import ListingGrid from "../components/content/ListingGrid";
import FilterSection from "../components/content/FilterSection";
import { useCategoriesFilterStore } from '../stores/CategoriesFilterStore';
import TopBanner from "../components/content/TopBanner";
import CategoryCards from "../components/content/CategoryCards";
import CategoryQuickAccesses from "../components/content/CategoryQuickAccesses";

const ProductsPage = () => {
    const [productsList, setProductsList] = useState([]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const selectedCategories = useCategoriesFilterStore((state) => state.selectedCategories);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/data/products.json')
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.error('Error loading products:', error));

        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredProductsList = productsList.filter(product => selectedCategories.includes(product.categoryId));

    return (
        <div>
            <div className="h-12 md:h-24" />
            <CategoryCards />
            <div className="w-screen mt-4 px-0 md:px-64 pt-4 pb-10 min-h-96">
                <div className="mx-4">
                    <ListingGrid productsList={filteredProductsList} />
                </div>
            </div>
            {showScrollToTop && (
                <button
                    className="fixed bottom-20 md:bottom-8 right-6 md:right-64 p-2 bg-secondary bg-opacity-20 text-black text-xs shadow-lg hover:bg-blue-700 focus:outline-none"
                    onClick={handleScrollToTop}
                >
                    ↑ Scroll to Top
                </button>
            )}
        </div>
    );
};

export default ProductsPage;
