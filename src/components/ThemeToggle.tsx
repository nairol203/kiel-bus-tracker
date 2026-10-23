'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();

	return (
		<Menu>
			<MenuButton className={'bg-secondary dark:bg-darkMode-secondary shadow p-2 rounded-full'}>
				{resolvedTheme === 'dark' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
			</MenuButton>
			<MenuItems anchor='bottom end' className={'grid gap-0.5 p-1 m-2 rounded shadow min-w-36 bg-background dark:bg-darkMode-background'}>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 p-1 rounded ${theme == 'light' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('light');
								close();
							}}
						>
							<Sun className='w-5 h-5' /> Hell
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 p-1 rounded ${theme == 'dark' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('dark');
								close();
							}}
						>
							<Moon className='w-5 h-5' /> Dunkel
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 p-1 rounded ${theme == 'system' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('system');
								close();
							}}
						>
							<Monitor className='w-5 h-5' /> System
						</button>
					)}
				</MenuItem>
			</MenuItems>
			{/* <button onClick={() => setTheme('light')}>Light Mode</button> */}
		</Menu>
	);
}
