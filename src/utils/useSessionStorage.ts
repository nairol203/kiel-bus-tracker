import { useState } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
	const [state, setState] = useState(() => {
		try {
			const value = window.sessionStorage.getItem(key);
			return value ? JSON.parse(value) : initialValue;
		} catch (error) {
			// console.log(error);
		}
	});

	function setValue(value: T) {
		try {
			const valueToStore = value instanceof Function ? value(state) : value;
			window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
			setState(value);
		} catch (error) {
			// console.log(error);
		}
	}

	return [state, setValue];
}
