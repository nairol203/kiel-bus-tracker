import React from 'react';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Providers from '@/utils/Providers';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

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
			<body className=''>
				<ThemeProvider attribute='class'>
					<header className='mx-auto flex max-w-3xl items-center justify-between px-2 py-6'>
						<Link href='/' className='flex items-center gap-2'>
							<Image src='/icon.svg' alt='KVG Bus Tracker Logo' width={30} height={30} />
							<h1 className='self-center text-2xl font-semibold whitespace-nowrap'>KVG Bus Tracker</h1>
						</Link>
						<ThemeToggle />
					</header>
					<main className='mx-auto min-h-screen max-w-3xl'>
						<Providers>{children}</Providers>
					</main>
					<footer className='bg-surface text-muted border-border mt-6 border-t shadow'>
						<div className='mx-auto grid max-w-3xl gap-4 p-6 text-center text-sm md:flex md:justify-between md:text-start'>
							<div className='grid flex-col gap-1 md:flex'>
								<a href='https://zao.dev' target='_blank' rel='noreferrer' className='hover:underline'>
									© 2026 nairol203
								</a>
								<span className='text-xs opacity-70'>Not affiliated with KVG Kieler Verkehrsgesellschaft mbH</span>
							</div>
							<div className='items-center md:flex'>
								<a href='https://github.com/nairol203/bus-tracker' className='hover:underline'>
									Source Code
								</a>
							</div>
						</div>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
