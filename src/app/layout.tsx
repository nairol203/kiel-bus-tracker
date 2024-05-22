import React from 'react';
import './globals.css';
import Providers from '@/utils/Providers';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
	title: 'KVG Bus Tracker',
	description: 'KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.',
	authors: [
		{
			name: 'nairol203',
			url: 'https://nairol.me',
		},
	],
	openGraph: {
		title: 'KVG Bus Tracker',
		description: 'KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.',
		url: 'bus.nairol.me',
		type: 'website',
	},
	twitter: {
		title: 'KVG Bus Tracker',
		description: 'KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.',
		site: '@nairol203',
		creator: '@nairol203',
		card: 'summary',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='de'>
			<body className='mx-auto max-w-3xl'>
				<header className='mx-auto flex items-center justify-between px-2 py-4'>
					<Link href='/' className='flex items-center '>
						<Image src='/bus.svg' className='mr-3 rounded-full dark:invert' alt='KVG Bus Tracker Logo' width={30} height={30} />
						<span className='self-center whitespace-nowrap text-2xl font-semibold'>KVG Bus Tracker</span>
					</Link>
				</header>
				<main className='min-h-screen'>
					<Providers>{children}</Providers>
				</main>
				<footer className='text-gray-400 grid justify-center gap-2 p-4 text-sm sm:flex sm:gap-1'>
					<a href='https://nairol.me' target='_blank' rel='noreferrer' className='flex justify-center hover:underline'>
						© 2024 nairol.me
					</a>
					<span className='sm:before:mr-1 sm:before:content-["•"] text-center'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
				</footer>
			</body>
		</html>
	);
}
