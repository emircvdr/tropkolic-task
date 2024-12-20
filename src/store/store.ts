import {create} from 'zustand';

// Filtrelerin tipini tanımlayalım
interface FilterStore {
    location: string;
    theme: string;
    activity: string;
    setFilters: (filters: { location: string; theme: string; activity: string }) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    location: '',
    theme: '',
    activity: '',
    setFilters: (filters) => set(() => ({ ...filters })),
}));
