import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SearchState = {
	lastSearches: StopByCharacter[];
	addSearchedStop: (stop: StopByCharacter) => void;
};

export const useSearchStore = create(
	persist<SearchState>(
		(set) => ({
			lastSearches: [],
			addSearchedStop: (stop) => set((state) => ({ lastSearches: [stop, ...state.lastSearches.filter((s) => s.id !== stop.id).slice(0, 2)] })),
		}),
		{
			name: 'search-history-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
