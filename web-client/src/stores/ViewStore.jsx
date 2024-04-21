import { create } from 'zustand';

export const useViewStore = create((set) => ({
    // Default values
    activeTab: 0,
    filter: {
        search: '',
        category: 'all',
        sortBy: 'newest',
        price: {
            min: 0,
            max: 10000,
        },
        isOnSale: true,
    },

    // Actions
    setActiveTab: (activeTab) => set({ activeTab }),
    setFilter: (filter) => set({ filter }),
}));