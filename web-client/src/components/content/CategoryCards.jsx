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
        <div className="md:mx-64 mt-8 px-4">
            <div className="flex flex-wrap gap-4 justify-start no-scrollbar">
                {categories.map((category, index) => (
                    <button
                        key={category.categoryId}
                        className={`p-2 md:h-12 md:w-[23.5%] text-xs shadow-md hover:opacity-75 border ${rainbowColors[index % rainbowColors.length]}`}
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
