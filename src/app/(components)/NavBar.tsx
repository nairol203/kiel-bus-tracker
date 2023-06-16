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
			<div className='font-medium flex flex-col md:flex-row'>
				<Link
					onClick={() => setDropdown(false)}
					href='/'
					className={`${pathname === '/' && 'text-white bg-blue-600 md:bg-transparent rounded md:text-blue-600'} hover:text-blue-600 m-1 px-4 py-2 md:m-0`}
				>
					Home
				</Link>
				<Link
					onClick={() => setDropdown(false)}
					href='/echtzeit'
					className={`${pathname === '/echtzeit' && 'text-white bg-blue-600 md:bg-transparent rounded md:text-blue-600'} hover:text-blue-600 m-1 px-4 py-2 md:m-0`}
				>
					Echtzeitabfahrten
				</Link>
				<Link
					onClick={() => setDropdown(false)}
					href='/favoriten'
					className={`${pathname === '/favoriten' && 'text-white bg-blue-600 md:bg-transparent rounded md:text-blue-600'} hover:text-blue-600 m-1 px-4 py-2 md:m-0`}
				>
					Favoriten
				</Link>
			</div>
		);
	}

	return (
		<nav className='relative'>
			<div className='flex items-center justify-between mx-auto py-4 px-2'>
				<Link href='/' className='flex items-center'>
					<Image src='/logo.png' className='mr-3 h' alt='Nairol Bus Tracker Logo' width={32} height={32} />
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Nairol Bus Tracker</span>
				</Link>
				<button
					onClick={() => setDropdown(!showDropdown)}
					className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
				>
					<span className='sr-only'>Open main menu</span>
					<svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<path
							fill-rule='evenodd'
							d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
							clip-rule='evenodd'
						></path>
					</svg>
				</button>
				<div className='hidden md:block'>
					<NavList />
				</div>
			</div>
			{showDropdown && (
				<div className='absolute inset-[auto_0.5rem] rounded p-1 z-50 bg-white dark:bg-gray-600 md:hidden'>
					<NavList />
				</div>
			)}
		</nav>
	);
}
