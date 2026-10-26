'use client';

import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Favourites() {
	const { favouriteStops } = useFavouritesStore();

	if (!!!favouriteStops.length) return null;

	return (
		<>
			<h2 className='text-muted mt-4 text-base'>Favoriten</h2>
			<div className='bg-surface/40 border-border/60 divide-border/40 grid divide-y rounded border'>
				{favouriteStops.map((stop) => (
					<Link
						className='group md:hover:bg-surface-hover flex items-center gap-3 p-3 font-medium transition duration-200 first:rounded-t last:rounded-b'
						href={`/stop/${stop.shortName}`}
						key={stop.shortName}
					>
						<Star className='text-muted h-5 w-5 shrink-0' />
						{stop.name}
						<ChevronRight className='text-muted ml-auto h-4 w-4' />
					</Link>
				))}
			</div>
		</>
	);
}
