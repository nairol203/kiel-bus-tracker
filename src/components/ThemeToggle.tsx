'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();

	return (
		<Menu>
			<MenuButton className={'bg-surface text-muted border-border rounded-full border p-2 shadow'}>
				{resolvedTheme === 'dark' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
			</MenuButton>
			<MenuItems anchor='bottom end' className={'bg-background border-border text-muted z-100 m-2 grid min-w-36 gap-0.5 rounded border p-1 shadow'}>
				<MenuItem>
					{({ close }) => (
						<button
							className={`flex items-center gap-2 rounded p-2 text-sm ${theme == 'light' ? 'bg-surface text-text font-medium' : 'md:hover:bg-surface/60'}`}
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
							className={`flex items-center gap-2 rounded p-2 text-sm ${theme == 'dark' ? 'bg-surface text-text font-medium' : 'md:hover:bg-surface/60'}`}
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
							className={`flex items-center gap-2 rounded p-2 text-sm ${theme == 'system' ? 'bg-surface text-text font-medium' : 'md:hover:bg-surface/60'}`}
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
