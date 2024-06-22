import { create } from 'zustand';

export const useCategoriesFilterStore = create((set) => ({
    selectedCategories: [],

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