import React from 'react';
import './globals.css';
import NavBar from './(components)/NavBar';

export const metadata = {
	title: 'Nairol Bus Tracker',
	authors: [
		{
			name: 'nairol203',
			url: 'https://nairol.me',
		},
	],
	twitter: {
		site: '@nairol203',
		creator: '@nairol203',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='de'>
			<body className='max-w-2xl mx-auto'>
				<NavBar />
				<main className='min-h-screen'>{children}</main>
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
