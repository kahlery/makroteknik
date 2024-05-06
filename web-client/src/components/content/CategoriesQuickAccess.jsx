import React, { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { useCategoriesFilterStore } from '../../stores/filter-stores/CategoriesFilterStore';

const CategoriesQuickAccess = () => {
    const [categories, setCategories] = useState([]);
    const selectedCategories = useCategoriesFilterStore((state) => state.selectedCategories);
    const removeCategories = useCategoriesFilterStore((state) => state.removeCategories);

    useEffect(() => {
        fetch('/data/categories.json')
            .then((response) => response.json())
            .then((data) => setCategories(data))
    }, []);

    return (
        <div className="md:mx-64 mt-8 px-4 ">
            <div className="flex flex-wrap justify-start gap-2 no-scrollbar overflow-x-scroll">
                {categories
                    .filter(category => selectedCategories.includes(category.categoryId))
                    .map((category) => (
                        <button key={category.categoryId} className="p-2 bg-gray-200 text-xs rounded-md hover:bg-gray-300"
                            onClick={() => removeCategories(category.categoryId)}
                        >
                            {category.categoryName}
                            <Close sx={{ fontSize: '0.8rem' }} className="ml-1" />
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default CategoriesQuickAccess;
