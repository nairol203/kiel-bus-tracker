'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
	// Keep server requests isolated and preserve the browser cache across renders.
	if (typeof window === 'undefined') return new QueryClient();
	browserQueryClient ??= new QueryClient();
	return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute='class'>
			<QueryClientProvider client={getQueryClient()}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
