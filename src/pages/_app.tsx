import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import GlobalStyles from '../lib/global';
import { darkMode, lightMode } from '../lib/themes';
import { trpc } from '@lib/trpc';

function App({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

	useEffect(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setTheme(darkModeQuery.matches ? 'dark' : 'light');
		darkModeQuery.addEventListener('change', event => {
			setTheme(event.matches ? 'dark' : 'light');
		});
	}, [theme]);

	return (
		<ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
			<Head>
				<title>Nairol Bus Tracker</title>
				{/* <meta name='description' content='' /> */}
				<meta name='author' content='nairol203' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='shortcut icon' href='/logo.png' />
				<meta property='og:title' content='Nairol Bus Tracker' />
				<meta property='og:image' content='/logo.png' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://bus.nairol.me' />
				<meta property='og:site_name' content='bus.nairol.me' />
				{/* <meta property='og:description' content='' /> */}
				<meta name='twitter:title' content='Nairol Bus Tracker' />
				{/* <meta name='twitter:description' content='' /> */}
				<meta name='twitter:image' content='https://bus.nairol.me' />
				<meta name='twitter:site' content='@nairol203' />
				<meta name='twitter:creator' content='@nairol203' />
				<meta name='twitter:card' content='summary' />
			</Head>
			<GlobalStyles />
			{theme && (
				<>
					<NavBar />
					<Component {...pageProps} />
					<Footer />
				</>
			)}
		</ThemeProvider>
	);
}

export default trpc.withTRPC(App);
