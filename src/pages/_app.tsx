import type { AppProps } from 'next/app';
import Head from 'next/head';
import { trpc } from '@lib/trpc';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
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
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: useColorScheme(),
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}

export default trpc.withTRPC(App);
