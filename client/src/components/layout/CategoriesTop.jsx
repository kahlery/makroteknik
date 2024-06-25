import React, { useState, useEffect } from 'react';
import { Swipe } from '@mui/icons-material';
import { useCategoryStore } from '../../stores/CategoryStore';
import { Link, useLocation } from "react-router-dom";
import ListingGrid from '../content/ListingGrid';

const productsListUrl = process.env.PUBLIC_URL + '/data/products.json';

const CategoriesTop = () => {

    // states
    const [productsList, setProductsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    // stores
    const selectedCategories = useCategoryStore((state) => state.selectedCategories);
    const addCategories = useCategoryStore((state) => state.addCategories);
    const removeCategories = useCategoryStore((state) => state.removeCategories);

    // hooks
    const location = useLocation();

    useEffect(() => {
        // Load products
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

            // add 0.04 to opacity every 30ms
            let opacity = 0;
            const interval = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.06;
                    hoverDropdown.style.opacity = opacity;
                } else {
                    hoverDropdown.style.opacity = 1;
                    clearInterval(interval);
                }
            }, 30);
        }
    }, [hoveredCategoryId]);

    const handleMouseEnter = (categoryId) => {
        const timeout = setTimeout(() => {
            setHoveredCategoryId(categoryId);
        }, 200);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setHoveredCategoryId(null);
    };

    const isCategoryHovered = (categoryId) => {
        return categoryId === hoveredCategoryId;
    }

    if (!location.pathname.endsWith("/products")) {
        return (
            <>
                <div
                    className='bg-secondary border-b border-gray-400 fixed top-[50px] sm:top-[96px] z-40 w-screen text-[10.2px] shadow-lg'
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className='md:px-16 grid md:grid-rows-2 grid-flow-col md:flex md:flex-wrap text-center 
                        md:justify-center gap-2 px-4 py-[8px] no-scrollbar overflow-x-scroll'>
                        {categories.map((category) => (
                            <div key={category.categoryId} className='static z-40'>
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
                                    className={'hover:scale-105 duration-500 bg-white text-black font-extrabold px-3 py-[5px] text-nowrap border-[1px] border-gray-400 tracking-wide  '
                                        + (selectedCategories.includes(category.categoryId) ? 'border-b-2 border-black' : '')}
                                    onMouseEnter={() => handleMouseEnter(category.categoryId)}
                                    onMouseLeave={() => {
                                        if (hoverTimeout) {
                                            clearTimeout(hoverTimeout);
                                        }
                                    }
                                    }
                                >
                                    {category.categoryName}
                                </div>

                                {/* Hover dropdown */}
                                {isCategoryHovered(category.categoryId) && !location.pathname.endsWith("/products") &&
                                    (
                                        <div id='hover-dropdown' className="fixed top-[90px] md:top-[175px] left-0 w-screen h-fit z-40 overflow-x-scroll">
                                            <div
                                                className='text-black text-left border w-fit min-w-full border-black bg-black bg-opacity-80 px-4 md:px-4 py-4'
                                            >
                                                {/* Dropdown menu content */}
                                                <ListingGrid productsList={productsList} categoryId={category.categoryId} isFeatured={true} isHorizontalNorVertical={true} />
                                                <div />

                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        ))}
                    </div>
                </div>
                <div className='block fixed top-[80px] sm:top-48 md:hidden right-4 md:right-64 md:-rotate-12 items-center gap-2 text-xs
                    z-40 text-red-700 p-2 animate-pulse pointer-events-none'>
                    <span className='md:hidden'>Swipe to see more</span>
                    <Swipe className="mx-1" />
                </div>
            </>
        );
    } else {
        return null;
    }
}

export default CategoriesTop;
