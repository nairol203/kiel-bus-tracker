import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BusState = {
	lastSearches: StopByCharacter[];
	useRelativeTimes: boolean;
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
			useRelativeTimes: false,
			setLastSearches: (searchString) => set((state) => ({ lastSearches: [...state.lastSearches.slice(0, 10), searchString] })),
			toggleRelativeTimes: () => set((state) => ({ useRelativeTimes: !state.useRelativeTimes })),
		}),
		{
			name: 'bus-store',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
