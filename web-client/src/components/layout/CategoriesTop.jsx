import React, { useState, useEffect } from 'react';
import { Swipe } from '@mui/icons-material';

const CategoriesTop = () => {
    // get all categories from public/data/categories.json
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, []);
    console.log(categories);

    return (
        <div className='flex gap-4 px-4 sm:px-64 text-white py-[12px] sm:justify-center
        bg-secondary bg-opacity-50 border-b border-dashed fixed top-[62px] sm:top-[110px] z-40 w-screen text-[10px] sm:flex-nowrap overflow-x-scroll'>
            {categories.map((category) => (
                <div key={category.categoryId} className='hover:scale-125 hover:cursor-pointer hover:font-extrabold duration-500 border-2 border-white
                 bg-black px-2 py-[2px]  text-nowrap md:text-wrap'>
                    {category.categoryName}
                </div>
            ))}
            <div className='sm:hidden fixed top-24 right-4 items-center gap-2 text-xs
            z-50 text-black animate-pulse'>
                Swipe to see more
                <Swipe />
            </div>
        </div >
    );
}

export default CategoriesTop;