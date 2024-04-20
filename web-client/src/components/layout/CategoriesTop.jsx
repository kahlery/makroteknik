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
        <div className='hidden md:flex pl-16 gap-6 justify-start text-center text-white py-[6px] fixed top-[112px] z-40 w-screen text-xs overflow-x-scroll'>
            {categories.map((category) => (
                <div key={category.categoryId} className='hover:scale-125 hover:cursor-pointer hover:font-extrabold duration-500 bg-black bg-opacity-70 px-2 py-[1px] shadow-secondary shadow-[4px_4px_0px_0px]'>
                    {category.categoryName}
                </div>
            ))}
        </div >
    );
}

export default CategoriesTop;