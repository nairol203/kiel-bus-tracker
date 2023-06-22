import React from 'react';
import './globals.css';
import Providers from '@/utils/Providers';
import NavBar from './(components)/NavBar';

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
				<NavBar />
				<main className='min-h-screen'>
					<Providers>{children}</Providers>
				</main>
				<footer className='grid justify-center gap-2 p-4 text-sm text-gray-400 sm:flex sm:gap-1'>
					<a href='https://nairol.me' target='_blank' rel='noreferrer' className='flex justify-center hover:underline'>
						© 2023 nairol203
					</a>
					<span className='sm:before:mr-1 sm:before:content-["•"]'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
				</footer>
			</body>
		</html>
	);
}
