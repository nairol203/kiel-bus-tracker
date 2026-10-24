'use client';

import { useSearchStore } from '@/stores/useSearchStore';
import { ChevronRight, History } from 'lucide-react';
import Link from 'next/link';

export default function LastSearched() {
	const { lastSearches } = useSearchStore();

	if (!!!lastSearches.length) return null;

	return (
		<>
			<h2 className='text-muted mt-4 text-base'>Zuletzt gesucht</h2>
			<div className='bg-surface/40 border-border/60 divide-border/40 grid divide-y rounded border'>
				{lastSearches.map((stop, index) => (
					<Link
						className='group md:hover:bg-surface-hover flex items-center gap-3 p-3 font-medium transition duration-200 first:rounded-t last:rounded-b'
						href={`/stop/${stop.number}`}
						key={`${index}_${stop.id}`}
					>
						<History className='h-5 w-5 shrink-0 text-gray-400' />
						{stop.name}
						<ChevronRight className='ml-auto h-4 w-4 text-gray-400' />
					</Link>
				))}
			</div>
		</>
	);
}
