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
			<body>
				<ThemeProvider attribute='class'>
					<div className='min-h-screen'>
						<header className='border-border bg-background/80 sticky top-0 z-50 w-full border-b px-4 py-3 backdrop-blur-md'>
							<div className='mx-auto flex max-w-3xl items-center justify-between'>
								<Image src='/icon.svg' alt='KVG Bus Tracker Logo' width={30} height={30} />
								<Link href='/'>
									<h1 className='md:hover:text-primary self-center text-xl font-semibold whitespace-nowrap transition'>KVG Bus Tracker</h1>
								</Link>
								<ThemeToggle />
							</div>
						</header>
						<main className='mx-auto mb-6 max-w-3xl pt-6'>
							<Providers>{children}</Providers>
						</main>
					</div>
					<footer className='bg-surface text-muted border-border border-t shadow'>
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
