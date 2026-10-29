'use client';

import { Stop } from '@/lib/schemas';
import { useLocalStorage } from './useLocalStorage';

type FavouriteStop = Pick<Stop, 'name' | 'shortName'>;

export function useFavourites() {
	const { value: favouriteStops, setValue: setFavouriteStops } = useLocalStorage<FavouriteStop[]>('kiel-bus-tracker-favourites', []);

	const addFavouriteStop = (favouriteStop: FavouriteStop) => {
		setFavouriteStops((current) => [...current.filter((s) => s.shortName !== favouriteStop.shortName), favouriteStop]);
	};

	const removeFavouriteStop = (favouriteStop: FavouriteStop) => {
		setFavouriteStops((current) => [...current.filter((s) => s.shortName !== favouriteStop.shortName)]);
	};

	return { favouriteStops, addFavouriteStop, removeFavouriteStop };
}
