'use client';

import { queryClient } from '@lib/reactQuery';
import { QueryClientProvider } from '@tanstack/react-query';

export default function RealtimeLayout({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
