'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);

	useEffect(() => {
		const readValue = () => {
			try {
				const saved = localStorage.getItem(key);

				if (saved !== null) {
					setValue(JSON.parse(saved) as T);
				} else {
					setValue(initialValue);
				}
			} catch (err) {
				console.error(`Failed to read localStorage key "${key}"`, err);
				setValue(initialValue);
			}
		};

		readValue();

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key || event.key === null) {
				readValue();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [key, initialValue]);

	const setStoredValue = (nextValue: T | ((prev: T) => T)) => {
		setValue((prev) => {
			const resolvedValue = typeof nextValue === 'function' ? (nextValue as (prev: T) => T)(prev) : nextValue;

			try {
				localStorage.setItem(key, JSON.stringify(resolvedValue));
			} catch (err) {
				console.error(`Failed to write localStorage key "${key}"`, err);
			}

			return resolvedValue;
		});
	};

	const removeValue = () => {
		try {
			localStorage.removeItem(key);
		} catch (err) {
			console.error(`Failed to remove localStorage key "${key}"`, err);
		}

		setValue(initialValue);
	};

	return { value, setValue: setStoredValue, removeValue };
}
