'use client';

import { useBusStore } from '@/stores/bus-store';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Select, Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';

export default function SettingsMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const { useRelativeTimes, toggleRelativeTimes } = useBusStore();
	const { theme, setTheme } = useTheme();

	return (
		<>
			<button onClick={() => setIsOpen(true)} className='rounded p-2 md:hover:bg-secondary md:hover:text-darkMode-text dark:md:hover:bg-darkMode-secondary'>
				<Image src='/gear.svg' alt='Settings Icon' height={20} width={20} className='shrink-0 dark:invert' />
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
				<DialogBackdrop className='fixed inset-0 bg-text/50' />
				<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
					<DialogPanel className='min-h-80 min-w-80 max-w-lg space-y-4 rounded bg-secondary p-4 dark:bg-darkMode-background'>
						<div className='flex items-center justify-between gap-2'>
							<DialogTitle className='font-bold'>Einstellungen</DialogTitle>
							<CloseButton className='rounded p-2 md:hover:bg-secondary md:hover:text-darkMode-text dark:md:hover:bg-darkMode-secondary'>
								<Image src='/xmark.svg' alt='Close Icon' height={24} width={24} className='h-6 shrink-0 dark:invert' />
							</CloseButton>
						</div>
						<div className='grid grid-cols-[1fr_6.5rem] items-center justify-between gap-1'>
							<h3>Darstellungsmodus</h3>
							<Select
								className='row-span-2 flex items-center justify-between gap-2 rounded p-2 shadow transition duration-200 dark:bg-darkMode-secondary'
								onChange={(e) => setTheme(e.target.value)}
							>
								<option key='light' value='light' selected={theme === 'light'}>
									Hell
								</option>
								<option key='dark' value='dark' selected={theme === 'dark'}>
									Dunkel
								</option>
								<option key='system' value='system' selected={theme === 'system'}>
									System
								</option>
							</Select>
							<span className='text-sm'>Legt den Darstellungsmodus für die Website fest.</span>
						</div>
						<div className='grid grid-cols-[1fr_2.75rem] items-center justify-between gap-1'>
							<h3>Dynamische Abfahrtzeiten</h3>
							<Switch
								checked={useRelativeTimes}
								onChange={toggleRelativeTimes}
								className='group row-span-2 inline-flex h-6 w-11 items-center rounded-full bg-primary transition data-[checked]:bg-accent'
							>
								<span className='size-4 translate-x-1 rounded-full bg-darkMode-text transition group-data-[checked]:translate-x-6' />
							</Switch>
							<span className='text-sm'>Die Abfahrtzeiten werden in Minuten statt zu einer festen Uhrzeit angezeigt.</span>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
