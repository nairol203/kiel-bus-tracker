import React from 'react';
import './globals.css';

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
			<body>
				<main className='min-h-screen max-w-2xl mx-auto'>{children}</main>
				<footer className='flex justify-center p-4'>
					<a href='https://nairol.me' target='_blank' rel='noreferrer' className='text-sm text-gray-400 hover:underline'>
						© 2023 nairol203
					</a>
				</footer>
			</body>
		</html>
	);
}
