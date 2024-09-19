'use client';

import useLocalStorage from '@/utils/useSessionStorage';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function SettingsMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const [useRelativeTimes, setRelativeTimes] = useLocalStorage<boolean>('useRelativeTimes', false);

	return (
		<>
			<button onClick={() => setIsOpen(true)} className='rounded p-2 md:hover:bg-secondary md:hover:text-darkMode-text dark:md:hover:bg-darkMode-secondary'>
				<Image src='/gear.svg' alt='Settings Icon' height={20} width={20} className='shrink-0 dark:invert' />
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
				<DialogBackdrop className='fixed inset-0 bg-text/30' />
				<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
					<DialogPanel className='max-w-lg min-w-80 min-h-80 space-y-4 rounded bg-darkMode-text p-4'>
						<div className='flex gap-2 justify-between'>
							<DialogTitle className='font-bold'>Einstellungen</DialogTitle>
							<CloseButton>
								<Image src='/xmark.svg' alt='Close Icon' height={20} width={20} className='shrink-0 dark:invert' />
							</CloseButton>
						</div>
						<div className='flex justify-between items-center gap-2'>
							<span>Benutze relative Zeiten</span>
							<Switch
								checked={useRelativeTimes}
								onChange={setRelativeTimes}
								className='group inline-flex h-6 w-11 items-center rounded-full bg-primary transition data-[checked]:bg-accent'
							>
								<span className='size-4 translate-x-1 rounded-full bg-darkMode-text transition group-data-[checked]:translate-x-6' />
							</Switch>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
