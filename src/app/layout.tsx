import React from 'react';
import './globals.css';
import Providers from '@/utils/Providers';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import SettingsMenu from './(components)/SettingsMenu';

export const metadata = {
	title: 'KVG Bus Tracker',
	description: 'KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.',
	authors: [
		{
			name: 'nairol203',
			url: 'https://nairol.de',
		},
	],
	openGraph: {
		title: 'KVG Bus Tracker',
		description: 'KVG Bus Tracker ist eine moderne und benutzerfreundliche Drittanbieterlösung, mit der Sie Echtzeitabfahrten von Bussen der KVG einsehen können.',
		url: 'bus.nairol.de',
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
		<html lang='de' suppressHydrationWarning>
			<head>
				<PlausibleProvider domain='bus.nairol.de' customDomain='https://analytics.nairol.de' selfHosted />
			</head>
			<body className='mx-auto max-w-3xl'>
				<ThemeProvider attribute='class'>
					<header className='mx-auto flex items-center justify-between px-2 py-4'>
						<Link href='/' className='flex gap-2 items-center '>
							<Image src='/icon.svg' alt='KVG Bus Tracker Logo' width={30} height={30} />
							<span className='self-center whitespace-nowrap text-2xl font-semibold'>KVG Bus Tracker</span>
						</Link>
						<SettingsMenu />
					</header>
					<main className='min-h-screen'>
						<Providers>{children}</Providers>
					</main>
					<footer className='text-gray-600 grid justify-center gap-2 p-4 text-sm sm:flex sm:gap-1'>
						<a href='https://nairol.de' target='_blank' rel='noreferrer' className='flex justify-center hover:underline'>
							© 2026 nairol.de
						</a>
						<span className='text-center sm:before:mr-1 sm:before:content-["•"]'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
