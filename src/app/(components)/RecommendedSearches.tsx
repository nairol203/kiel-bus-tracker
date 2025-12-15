'use client';

import { useBusStore } from '@/stores/bus-store';
import { stops } from '@/utils/stops';
import { usePlausible } from 'next-plausible';
import Image from 'next/image';
import Link from 'next/link';

export default function RecommendedSearches() {
	const plausible = usePlausible();
	const { lastSearches } = useBusStore();

	return (
		<>
			{lastSearches.length ? (
				<div className='mt-2 grid gap-2'>
					<h2>Letzte Suchanfragen</h2>
					{lastSearches
						.toReversed()
						.slice(0, 10)
						.map((stop, index) => (
							<Link
								className='group flex gap-3 rounded bg-secondary font-semibold p-3 shadow transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
								href={`/stop/${stop.number}`}
								key={`${index}_${stop.id}`}
								onClick={() =>
									plausible('lastSearch', {
										props: {
											searchQuery: `${stop.number} (${stop.name})`,
										},
									})
								}
							>
								<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
								{stop.name}
							</Link>
						))}
				</div>
			) : (
				<></>
			)}
			<div className='mt-2 grid gap-2'>
				<h2>Beliebte Suchanfragen</h2>
				<Link
					className='group flex gap-3 rounded bg-secondary p-3 shadow transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
					href={'/stop/2387'}
					onClick={() =>
						plausible('recommendedStop', {
							props: {
								searchQuery: `2387 (${stops.find((stop) => stop.number === '2387')?.name || 'Unbekannte Haltestelle'})`,
							},
						})
					}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '2387')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3 rounded bg-secondary p-3 shadow transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
					href={'/stop/1624'}
					onClick={() =>
						plausible('recommendedStop', {
							props: {
								searchQuery: `1624 (${stops.find((stop) => stop.number === '1624')?.name || 'Unbekannte Haltestelle'})`,
							},
						})
					}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1624')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3 rounded bg-secondary p-3 shadow transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
					href={'/stop/1312'}
					onClick={() =>
						plausible('recommendedStop', {
							props: {
								searchQuery: `1312 (${stops.find((stop) => stop.number === '1312')?.name || 'Unbekannte Haltestelle'})`,
							},
						})
					}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1312')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3 rounded bg-secondary p-3 shadow transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
					href={'/stop/2246'}
					onClick={() =>
						plausible('recommendedStop', {
							props: {
								searchQuery: `2246 (${stops.find((stop) => stop.number === '2246')?.name || 'Unbekannte Haltestelle'})`,
							},
						})
					}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '2246')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3 rounded bg-secondary p-3 shadow transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
					href={'/stop/1317'}
					onClick={() =>
						plausible('recommendedStop', {
							props: {
								searchQuery: `1317 (${stops.find((stop) => stop.number === '1317')?.name || 'Unbekannte Haltestelle'})`,
							},
						})
					}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1317')?.name || 'Unbekannte Haltestelle'}
				</Link>
			</div>
		</>
	);
}
