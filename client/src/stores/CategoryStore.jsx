import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
    // fetch from /data/products.json at the start
    selectedCategories: [],

    fetchCategories: async () => {
        const response = await fetch('/data/categories.json');
        const categories = await response.json();
        console.log('categories:', categories);
        set({ selectedCategories: categories });
    },

    addCategories: (category) => set((state) => {
        if (!state.selectedCategories.includes(category)) {
            return {
                selectedCategories: [...state.selectedCategories, category]
            };
        }
        return state;
    }),

    resetCategories: () => set({ selectedCategories: [] }),

    removeCategories: (category) => set((state) => {
        return {
            selectedCategories: state.selectedCategories.filter((selectedCategory) => selectedCategory !== category)
        };
    }),
}));