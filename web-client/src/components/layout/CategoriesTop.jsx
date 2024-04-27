import React, { useState, useEffect } from 'react';
import { Swipe } from '@mui/icons-material';
import { useCategoriesFilterStore } from '../../stores/filter-stores/CategoriesFilterStore';
import { Link, useLocation } from "react-router-dom";
import ListingGrid from '../content/ListingGrid';

const productsListUrl = process.env.PUBLIC_URL + '/data/products.json';

const CategoriesTop = () => {
    const [productsList, setProductsList] = useState([]);

    // get all categories from public/data/categories.json
    const [categories, setCategories] = useState([]);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

    const selectedCategories = useCategoriesFilterStore((state) => state.selectedCategories);
    const addCategories = useCategoriesFilterStore((state) => state.addCategories);
    const removeCategories = useCategoriesFilterStore((state) => state.removeCategories);

    const location = useLocation();

    useEffect(() => {
        // Ürünleri yükle
        fetch(productsListUrl)
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.error('Error loading products:', error));
    }, []);

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, []);

    const categoryHover = (categoryId) => {
        setHoveredCategoryId(categoryId);
    }

    const isCategoryHovered = (categoryId) => {
        return categoryId === hoveredCategoryId;
    }

    return (
        <>
            <Link to="/products" className='flex gap-4 px-4 md:px-64 text-white py-[8px] md:justify-center no-scrollbar
        bg-white bg-opacity-100 fixed top-[55px] sm:top-[105px] z-50 w-screen text-[12px] sm:flex-nowrap overflow-x-scroll'
                onMouseLeave={() => categoryHover(null)}
            >
                {categories.map((category) => (
                    <div key={category.categoryId} className='static z-50'>
                        <div
                            onClick={() => {
                                if (!selectedCategories.includes(category.categoryId)) {
                                    addCategories(category.categoryId);
                                    console.log("addCategory: ", category.categoryName);
                                } else {
                                    removeCategories(category.categoryId);
                                    console.log("removeCategory: ", category.categoryName);
                                }
                            }}
                            className={'hover:scale-105 duration-500 text-black px-2 py-[2px] text-nowrap  border-b ' + (selectedCategories.includes(category.categoryId) ? 'border-b-2 border-black font-bold' : '')}
                            onMouseEnter={() => categoryHover(category.categoryId)}
                        // onMouseLeave={() => categoryHover(null)}
                        >
                            {category.categoryName}
                        </div>
                        {isCategoryHovered(category.categoryId) && !location.pathname.endsWith("/products") &&
                            (
                                <div className="hidden md:block fixed top-[142px] left-0 w-screen z-50">
                                    <div className='backdrop-blur-md text-black border border-black bg-white bg-opacity-60 px-64 py-4' onMouseLeave={() => categoryHover(null)}>
                                        {/* Dropdown menu content */}
                                        <ListingGrid productsList={productsList} categoryId={category.categoryId} isFeatured={true} />
                                        <div />
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
            </Link>
            <div className='block fixed top-[80px] sm:top-48 md:top-[130px] right-4 md:right-64 items-center gap-2 text-xs
                    z-50 text-secondary p-2 animate-pulse '>
                <span className='md:hidden'>Swipe to see more / </span>
                {selectedCategories.length} selected
                <Swipe className="mx-1" Swipe />
            </div>
        </>
    );
}

export default CategoriesTop;
