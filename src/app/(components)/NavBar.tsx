'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
	const [showDropdown, setDropdown] = useState(false);

	function NavList() {
		const pathname = usePathname();

		return (
			<div className='flex flex-col font-medium md:flex-row'>
				<Link
					onClick={() => setDropdown(false)}
					href='/echtzeit'
					className={`${
						pathname === '/echtzeit' && 'rounded bg-blue-600 text-white underline-offset-4 md:bg-transparent md:text-black md:underline md:dark:text-white'
					} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
				>
					Echtzeitabfahrten
				</Link>
				<Link
					onClick={() => setDropdown(false)}
					href='/favoriten'
					className={`${
						pathname === '/favoriten' && 'rounded bg-blue-600 text-white underline-offset-4 md:bg-transparent md:text-black md:underline md:dark:text-white'
					} m-1 px-4 py-2 md:m-0 md:hover:underline md:hover:underline-offset-4`}
				>
					Favoriten
				</Link>
			</div>
		);
	}

	return (
		<nav className='relative'>
			<div className='mx-auto flex items-center justify-between px-2 py-4'>
				<Link href='/' className='flex items-center '>
					<Image src='/bus.svg' className='mr-3 rounded-full dark:invert' alt='KVG Bus Tracker Logo' width={30} height={30} />
					<span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>KVG Bus Tracker</span>
				</Link>
				<button
					onClick={() => setDropdown(!showDropdown)}
					className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
				>
					<span className='sr-only'>Open main menu</span>
					<svg className='h-6 w-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
							clipRule='evenodd'
						></path>
					</svg>
				</button>
				<div className='hidden md:block'>
					<NavList />
				</div>
			</div>
			{showDropdown && (
				<div className='absolute inset-[auto_0.5rem] z-50 rounded bg-white p-1 shadow dark:bg-gray-500 md:hidden'>
					<NavList />
				</div>
			)}
		</nav>
	);
}
