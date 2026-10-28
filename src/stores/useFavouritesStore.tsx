import { Stop } from '@/lib/schemas';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavouriteStop = Pick<Stop, 'name' | 'shortName'>;

type FavouritesState = {
	favouriteStops: FavouriteStop[];
	addFavouriteStop: (stop: FavouriteStop) => void;
	removeFavouriteStop: (stop: FavouriteStop) => void;
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
