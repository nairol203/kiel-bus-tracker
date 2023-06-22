import React from 'react';
import './globals.css';
import NavBar from './(components)/NavBar';
import Providers from '@/utils/Providers';

export const metadata = {
	title: 'KVG Bus Tracker',
	description: 'KVG Bus Tracker ist eine benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen aus Kiel einsehen können.',
	authors: {
		name: 'nairol203',
		url: 'https://nairol.me',
	},
	openGraph: {
		title: 'KVG Bus Tracker',
		description: 'KVG Bus Tracker ist eine benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen aus Kiel einsehen können.',
		url: 'bus.nairol.me',
		type: 'website',
	},
	twitter: {
		title: 'KVG Bus Tracker',
		description: 'KVG Bus Tracker ist eine benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen aus Kiel einsehen können.',
		site: '@nairol203',
		creator: '@nairol203',
		card: 'summary',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='de'>
			<body className='max-w-3xl mx-auto'>
				<NavBar />
				<main className='min-h-screen'>
					<Providers>{children}</Providers>
				</main>
				<footer className='grid sm:flex gap-2 sm:gap-1 justify-center p-4 text-sm text-gray-400'>
					<a href='https://nairol.me' target='_blank' rel='noreferrer' className='hover:underline flex justify-center'>
						© 2023 nairol203
					</a>
					<span className='sm:before:content-["•"] sm:before:mr-1'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
				</footer>
			</body>
		</html>
	);
}
