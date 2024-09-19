'use client';

import { useBusStore } from '@/stores/bus-store';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function SettingsMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const { useRelativeTimes, toggleRelativeTimes } = useBusStore();

	return (
		<>
			<button onClick={() => setIsOpen(true)} className='rounded p-2 md:hover:bg-secondary md:hover:text-darkMode-text dark:md:hover:bg-darkMode-secondary'>
				<Image src='/gear.svg' alt='Settings Icon' height={20} width={20} className='shrink-0 dark:invert' />
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
				<DialogBackdrop className='fixed inset-0 bg-text/50' />
				<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
					<DialogPanel className='max-w-lg min-w-80 min-h-80 space-y-4 rounded bg-background dark:bg-darkMode-background p-4'>
						<div className='flex gap-2 items-center justify-between'>
							<DialogTitle className='font-bold'>Einstellungen</DialogTitle>
							<CloseButton className='rounded p-2 md:hover:bg-secondary md:hover:text-darkMode-text dark:md:hover:bg-darkMode-secondary'>
								<Image src='/xmark.svg' alt='Close Icon' height={24} width={24} className='shrink-0 dark:invert h-6' />
							</CloseButton>
						</div>
						<div className='grid grid-cols-[1fr_2.75rem] justify-between items-center gap-1'>
							<h3>Dynamische Abfahrtzeiten</h3>
							<Switch
								checked={useRelativeTimes}
								onChange={toggleRelativeTimes}
								className='row-span-2 group inline-flex h-6 w-11 items-center rounded-full bg-primary transition data-[checked]:bg-accent'
							>
								<span className='size-4 translate-x-1 rounded-full bg-darkMode-text transition group-data-[checked]:translate-x-6' />
							</Switch>
							<span className='text-sm'>Die Abfahrtzeiten werden in Minuten statt zu einer festen Uhrzeit angezeigt</span>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
