'use client';

import { Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className='mx-auto flex items-center justify-between px-2 py-4'>
			<Link href='/' className='flex items-center '>
				<Image src='/bus.svg' className='mr-3 rounded-full dark:invert' alt='KVG Bus Tracker Logo' width={30} height={30} />
				<span className='self-center whitespace-nowrap text-2xl font-semibold'>KVG Bus Tracker</span>
			</Link>
			<Popover>
				<Popover.Button className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'>
					<span className='sr-only'>Open main menu</span>
					<svg className='h-6 w-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
							clipRule='evenodd'
						></path>
					</svg>
				</Popover.Button>
				<Popover.Panel className='absolute inset-[auto_0.5rem] z-50 mt-2 grid rounded bg-secondary dark:bg-darkMode-secondary p-1 font-medium shadow md:hidden'>
					<Popover.Button
						as={Link}
						href='/echtzeit'
						className={`${
							pathname === '/echtzeit' && 'rounded bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text underline-offset-4 md:underline'
						} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
					>
						Echtzeitabfahrten
					</Popover.Button>
					<Popover.Button
						as={Link}
						href='/favoriten'
						className={`${
							pathname === '/favoriten' && 'rounded bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text underline-offset-4 md:underline'
						} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
					>
						Favoriten
					</Popover.Button>
				</Popover.Panel>
			</Popover>
			<div className='hidden font-medium md:flex'>
				<Link
					href='/echtzeit'
					className={`${pathname === '/echtzeit' && 'rounded underline-offset-4 md:underline'} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
				>
					Echtzeitabfahrten
				</Link>
				<Link
					href='/favoriten'
					className={`${pathname === '/favoriten' && 'rounded underline-offset-4 md:underline'} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
				>
					Favoriten
				</Link>
			</div>
		</nav>
	);
}
