'use client';

import useLocalStorage from '@/utils/useSessionStorage';
import { Menu, MenuButton, MenuItem, MenuItems, Switch } from '@headlessui/react';

export default function SettingsMenu() {
	const [useRelativeTimes, setRelativeTimes] = useLocalStorage<boolean>('useRelativeTimes', false);

	return (
		<Menu>
			<MenuButton className='rounded bg-secondary text-text px-2.5 py-1.5 dark:bg-darkMode-secondary dark:text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'>
				Einstellungen
			</MenuButton>
			<MenuItems anchor='bottom end' className='grid rounded bg-secondary p-2 mt-1 shadow'>
				<MenuItem as='div' className='flex gap-2'>
					Benutze Relative Zeiten
					<Switch
						checked={useRelativeTimes}
						onChange={setRelativeTimes}
						className='group inline-flex h-6 w-11 items-center rounded-full bg-primary transition data-[checked]:bg-accent'
					>
						<span className='size-4 translate-x-1 rounded-full bg-darkMode-text transition group-data-[checked]:translate-x-6' />
					</Switch>
				</MenuItem>
			</MenuItems>
		</Menu>
	);
}
