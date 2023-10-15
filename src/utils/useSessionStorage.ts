import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
	const isLocalStorageAvailable = typeof window !== 'undefined' && 'localStorage' in window;

	const [value, setValue] = useState<T>(() => {
		if (isLocalStorageAvailable) {
			const storedValue = localStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		if (isLocalStorageAvailable) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
