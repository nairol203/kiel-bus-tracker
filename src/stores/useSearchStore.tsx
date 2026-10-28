import { Stop } from '@/lib/schemas';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SearchedStop = Pick<Stop, 'name' | 'shortName'>;

type SearchState = {
	lastSearches: SearchedStop[];
	addSearchedStop: (stop: SearchedStop) => void;
};

export const useSearchStore = create(
	persist<SearchState>(
		(set) => ({
			lastSearches: [],
			addSearchedStop: (stop) => set((state) => ({ lastSearches: [stop, ...state.lastSearches.filter((s) => s.shortName !== stop.shortName).slice(0, 2)] })),
		}),
		{
			name: 'search-history-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
