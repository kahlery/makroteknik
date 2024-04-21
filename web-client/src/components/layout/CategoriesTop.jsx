import React, { useState, useEffect } from 'react';
import { Swipe } from '@mui/icons-material';
import { useCategoriesFilterStore } from '../../stores/filter-stores/CategoriesFilterStore';
import { Link } from "react-router-dom";

const CategoriesTop = () => {
    // get all categories from public/data/categories.json
    const [categories, setCategories] = useState([]);

    const selectedCategories = useCategoriesFilterStore((state) => state.selectedCategories);
    const addCategories = useCategoriesFilterStore((state) => state.addCategories);
    const removeCategories = useCategoriesFilterStore((state) => state.removeCategories);

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, []);

    console.log("selectedCategories: ", selectedCategories);

    return (
        <Link to="/products" className='flex gap-4 px-4 md:px-64 text-white py-[12px] md:justify-center
        bg-secondary bg-opacity-50 border-b border-dashed fixed top-[62px] sm:top-[110px] z-40 w-screen text-[10px] sm:flex-nowrap overflow-x-scroll'>
            {categories.map((category) => (

                <div key={category.categoryId} onClick={
                    () => {
                        if (!selectedCategories.includes(category.categoryId)) {
                            addCategories(category.categoryId);
                            console.log("addCategory: ", category.categoryName);
                        } else {
                            removeCategories(category.categoryId);
                            console.log("removeCategory: ", category.categoryName);
                        }
                    }
                }
                    className='hover:scale-125 hover:cursor-pointer hover:font-extrabold duration-500 border-white
                bg-black px-2 py-[2px] text-nowrap sm:text-wrap font-bold' {...(selectedCategories.includes(category.categoryId) && { style: { backgroundColor: '#0891b2', color: '#000' } })}>
                    {category.categoryName}
                </div>

            ))}
            <div className='fixed top-24 sm:top-48 md:top-40 right-4 md:right-72 items-center gap-2 text-xs
            z-50 text-black animate-pulse'>
                <span className='md:hidden'>Swipe to see more / </span>
                {selectedCategories.length} selected
                <Swipe className="mx-1" Swipe />
            </div>
        </Link>
    );
}

export default CategoriesTop;