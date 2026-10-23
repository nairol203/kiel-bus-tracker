'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();

	return (
		<Menu>
			<MenuButton className={'bg-secondary dark:bg-darkMode-secondary rounded-full p-2 shadow'}>
				{resolvedTheme === 'dark' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
			</MenuButton>
			<MenuItems anchor='bottom end' className={'bg-background dark:bg-darkMode-background m-2 grid min-w-36 gap-0.5 rounded p-1 shadow'}>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 rounded p-1 ${theme == 'light' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('light');
								close();
							}}
						>
							<Sun className='h-5 w-5' /> Hell
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 rounded p-1 ${theme == 'dark' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('dark');
								close();
							}}
						>
							<Moon className='h-5 w-5' /> Dunkel
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 rounded p-1 ${theme == 'system' ? 'bg-secondary dark:bg-darkMode-secondary' : 'bg-background hover:bg-secondary/75 dark:bg-darkMode-background dark:hover:bg-secondary/10'}`}
							onClick={() => {
								setTheme('system');
								close();
							}}
						>
							<Monitor className='h-5 w-5' /> System
						</button>
					)}
				</MenuItem>
			</MenuItems>
			{/* <button onClick={() => setTheme('light')}>Light Mode</button> */}
		</Menu>
	);
}
