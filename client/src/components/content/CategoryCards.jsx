import React, { useEffect, useState } from 'react';
import { useCategoriesFilterStore } from '../../stores/CategoriesFilterStore';

const CategoryCards = () => {
    const [categories, setCategories] = useState([]);

    // Array of rainbow colors
    const rainbowColors = [
        'bg-blue-50',
        'bg-indigo-50',
        'bg-sky-50',
    ];

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    const handleScrollToHeader = (categoryName) => {
        const headers = Array.from(document.querySelectorAll('h2'));
        const header = headers.find(header => header.textContent.includes(`${categoryName}:`));
        if (header) {
            header.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="md:mx-64 mt-6 px-4">
            <div className="flex flex-wrap gap-4 justify-start no-scrollbar">
                {categories.map((category, index) => (
                    <button
                        key={category.categoryId}
                        className={`p-2 w-[30%] h-11 xl:h-10 sm:w-[22.5%] xl:w-[23.5%] text-[10px] md:text-[11px] shadow-md hover:opacity-75 border bg-secondary text-white`}
                        onClick={() => handleScrollToHeader(category.categoryName)}
                    >
                        {category.categoryName}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;
