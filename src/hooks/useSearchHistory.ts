'use client';

import { Stop } from '@/lib/schemas';
import { useLocalStorage } from './useLocalStorage';

type SearchedStop = Pick<Stop, 'name' | 'shortName'>;

export function useSearchHistory() {
	const { value: lastSearches, setValue: setSearchedStops } = useLocalStorage<SearchedStop[]>('kiel-bus-tracker-recent-stops', []);

	const addSearchedStop = (searchedStop: SearchedStop) => {
		setSearchedStops((current) => [searchedStop, ...current.filter((s) => s.shortName !== searchedStop.shortName)].slice(0, 3));
	};

	return { lastSearches, addSearchedStop };
}
