import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Stop = {
	name: string;
	shortName: string;
};

type FavouritesState = {
	favouriteStops: Stop[];
	addFavouriteStop: (stop: Stop) => void;
	removeFavouriteStop: (stop: Stop) => void;
};

export const useFavouritesStore = create(
	persist<FavouritesState>(
		(set) => ({
			favouriteStops: [],
			addFavouriteStop: (stop) => set((state) => ({ favouriteStops: [...state.favouriteStops.filter((s) => s.shortName !== stop.shortName), stop] })),
			removeFavouriteStop: (stop) => set((state) => ({ favouriteStops: state.favouriteStops.filter((s) => s.shortName !== stop.shortName) })),
		}),
		{
			name: 'favourites-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
