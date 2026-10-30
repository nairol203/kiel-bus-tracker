import Favourites from '@/components/Favourites';
import LastSearched from '@/components/LastSearched';
import { ChevronRight, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	alternates: {
		canonical: '/',
	},
};

const recommendedStops = [
	{ name: 'Hauptbahnhof', number: '2387' },
	{ name: 'Andreas-Gayk-Straße', number: '1256' },
	{ name: 'Dreiecksplatz', number: '2151' },
	{ name: 'Uni-Westring', number: '1491' },
];

export default function Page() {
	return (
		<>
			<LastSearched />
			<Favourites />
			<div className='grid gap-1'>
				<h2 className='text-muted text-base'>Vorschläge</h2>
				<div className='bg-surface/40 border-border/60 divide-border/40 grid divide-y rounded border'>
					{recommendedStops.map((stop) => (
						<Link
							className='group md:hover:bg-surface-hover flex items-center gap-3 p-3 font-medium transition duration-200 first:rounded-t last:rounded-b'
							href={`/stop/${stop.number}`}
							key={stop.number}
						>
							<MapPin className='text-muted h-5 w-5 shrink-0' />
							{stop.name}
							<ChevronRight className='text-muted ml-auto h-4 w-4' />
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
