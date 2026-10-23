import React from 'react';
import './globals.css';
import Providers from '@/utils/Providers';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import SettingsMenu from './(components)/SettingsMenu';

export const metadata: Metadata = {
	metadataBase: new URL('https://bus.zao.dev'),
	title: {
		default: 'KVG Bus Tracker | Echtzeit Abfahrten für Kiel',
		template: '%s | KVG Bus Tracker',
	},
	description: 'Aktuelle Abfahrtszeiten aller Buslinien der KVG Kiel. Echtzeit-Infos, alle Buslinien und Verspätungen auf einen Blick.',
	authors: [
		{
			name: 'nairol203',
			url: 'https://zao.dev',
		},
	],
	openGraph: {
		url: '/',
		siteName: 'KVG Bus Tracker',
		locale: 'de_DE',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='de' suppressHydrationWarning>
			<body className='mx-auto max-w-3xl'>
				<ThemeProvider attribute='class'>
					<header className='mx-auto flex items-center justify-between px-2 py-4'>
						<Link href='/' className='flex gap-2 items-center '>
							<Image src='/icon.svg' alt='KVG Bus Tracker Logo' width={30} height={30} />
							<h1 className='self-center whitespace-nowrap text-2xl font-semibold'>KVG Bus Tracker</h1>
						</Link>
						<SettingsMenu />
					</header>
					<main className='min-h-screen'>
						<Providers>{children}</Providers>
					</main>
					<footer className='text-gray-600 grid justify-center gap-2 p-4 text-sm sm:flex sm:gap-1'>
						<a href='https://zao.dev' target='_blank' rel='noreferrer' className='flex justify-center hover:underline'>
							© 2026 nairol203
						</a>
						<span className='text-center sm:before:mr-1 sm:before:content-["•"]'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
