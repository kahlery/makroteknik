import React, { useState, useEffect } from 'react';
// import { ArrowDropDown } from '@mui/icons-material';

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
        <div className='hidden md:flex gap-8 justify-center backdrop-blur-sm bg-opacity-60 text-center text-white bg-cyan-700 p-4 fixed top-[110px] z-40 w-screen text-xs shadow-xl overflow-x-scroll'>
            {categories.map((category) => (
                <div key={category.categoryId} className='hover:text-sm hover:cursor-pointer duration-500'>
                    {category.categoryName}
                    {/* <ArrowDropDown /> */}
                </div>
            ))}
        </div >
    );
}

export default CategoriesTop;