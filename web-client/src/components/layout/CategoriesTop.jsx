import React, { useState, useEffect } from 'react';
import { Swipe } from '@mui/icons-material';
import { useCategoriesFilterStore } from '../../stores/CategoriesFilterStore';
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

    // start opacity-0 to opacity-100 duration-500
    useEffect(() => {
        const hoverDropdown = document.getElementById('hover-dropdown');
        if (hoverDropdown) {
            hoverDropdown.style.opacity = 0;

            // add 0.1 opacity every 35ms
            let opacity = 0;
            const interval = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.1;
                    hoverDropdown.style.opacity = opacity;
                } else {
                    hoverDropdown.style.opacity = 1;
                    clearInterval(interval);
                }
            }, 30);
        }
    }, [hoveredCategoryId]);

    const categoryHover = (categoryId) => {
        setHoveredCategoryId(categoryId);
    }

    const isCategoryHovered = (categoryId) => {
        return categoryId === hoveredCategoryId;
    }

    return (
        <>
            <Link to="/products" className='text-white border-b bg-white fixed top-[55px] sm:top-[105px] z-50 w-screen text-[12px]'
                onMouseLeave={() => categoryHover(null)}
            >
                <div className='md:px-64 grid grid-rows-2 grid-flow-col md:flex md:flex-wrap text-center md:justify-center gap-2 px-4 py-[8px] no-scrollbar overflow-x-scroll'>
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
                                className={'hover:scale-105 duration-500 text-black px-2 py-[2px] text-nowrap ' + (selectedCategories.includes(category.categoryId) ? 'border-b-2 border-secondary' : '')}
                                onMouseEnter={() => categoryHover(category.categoryId)}
                            >
                                {category.categoryName}
                            </div>
                            {isCategoryHovered(category.categoryId) && !location.pathname.endsWith("/products") &&
                                (
                                    <div id='hover-dropdown' className="fixed top-[173px] left-0 w-screen z-50">
                                        <div className='text-black border border-black bg-black bg-opacity-60 px-64 py-4' onMouseLeave={() => categoryHover(null)}>
                                            {/* Dropdown menu content */}
                                            <ListingGrid productsList={productsList} categoryId={category.categoryId} isFeatured={true} />
                                            <div />
                                        </div>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </Link>
            <div className='block fixed top-[110px] sm:top-48 md:top-[130px] right-4 md:right-64 md:-rotate-12 items-center gap-2 text-xs
                    z-50 text-secondary p-2 animate-pulse pointer-events-none'>
                <span className='md:hidden'>Swipe to see more / </span>
                {selectedCategories.length} selected
                <Swipe className="mx-1" />
            </div>
        </>
    );
}

export default CategoriesTop;
