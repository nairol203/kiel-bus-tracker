'use client';

import { useBusStore } from '@/stores/bus-store';
import { stops } from '@/utils/stops';
import Image from 'next/image';
import Link from 'next/link';

export default function RecommendedSearches() {
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
								className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
								href={`/stop/${stop.number}`}
								key={`${index}_${stop.id}`}
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
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
					href={'/stop/2387'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '2387')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
					href={'/stop/1624'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1624')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
					href={'/stop/1312'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1312')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
					href={'/stop/2246'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '2246')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
					href={'/stop/1317'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='md:group-hover:invert dark:invert' />
					{stops.find((stop) => stop.number === '1317')?.name || 'Unbekannte Haltestelle'}
				</Link>
			</div>
		</>
	);
}
