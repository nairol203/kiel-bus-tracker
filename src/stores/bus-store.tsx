import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BusState = {
	lastSearches: StopByCharacter[];
	relativeTimes: boolean;
};

export type BusActions = {
	setLastSearches: (stop: StopByCharacter) => void;
	toggleRelativeTimes: () => void;
};

export type BusStore = BusState & BusActions;

export const useBusStore = create(
	persist<BusStore>(
		(set) => ({
			lastSearches: [],
			relativeTimes: true,
			setLastSearches: (searchString) => set((state) => ({ lastSearches: [...state.lastSearches.slice(0, 10), searchString] })),
			toggleRelativeTimes: () => set((state) => ({ relativeTimes: !state.relativeTimes })),
		}),
		{
			name: 'bus-store',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
