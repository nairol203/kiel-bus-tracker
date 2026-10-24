import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BusState = {
	lastSearches: StopByCharacter[];
};

export type BusActions = {
	setLastSearches: (stop: StopByCharacter) => void;
};

export type BusStore = BusState & BusActions;

export const useBusStore = create(
	persist<BusStore>(
		(set) => ({
			lastSearches: [],
			setLastSearches: (searchString) => set((state) => ({ lastSearches: [...state.lastSearches.slice(0, 10), searchString] })),
		}),
		{
			name: 'bus-store',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
