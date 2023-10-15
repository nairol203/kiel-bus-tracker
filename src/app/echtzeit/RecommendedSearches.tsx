'use client';

import useLocalStorage from '@/utils/useSessionStorage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RecommendedSearches({ stops }: { stops: StopByCharacter[] }) {
	const [lastSearches] = useLocalStorage<StopByCharacter[]>('lastSearches', []);
	const pathname = usePathname();

	return (
		<>
			{lastSearches.length ? (
				<div className='grid gap-2 mt-2'>
					<h2>Letzte Suchanfragen</h2>
					{lastSearches
						.toReversed()
						.slice(0, 10)
						.map((search) => (
							<Link
								className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
								href={pathname + '?stop=2387'}
							>
								<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
								{search.name}
							</Link>
						))}
				</div>
			) : (
				<></>
			)}
			<div className='grid gap-2 mt-2'>
				<h2>Trends bei Suchanfragen</h2>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					href={pathname + '?stop=2387'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
					{stops.find((stop) => stop.number === '2387')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					href={pathname + '?stop=1624'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
					{stops.find((stop) => stop.number === '1624')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					href={pathname + '?stop=1312'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
					{stops.find((stop) => stop.number === '1312')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					href={pathname + '?stop=2246'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
					{stops.find((stop) => stop.number === '2246')?.name || 'Unbekannte Haltestelle'}
				</Link>
				<Link
					className='group flex gap-3	 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					href={pathname + '?stop=1317'}
				>
					<Image src='/arrow-up-trend.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
					{stops.find((stop) => stop.number === '1317')?.name || 'Unbekannte Haltestelle'}
				</Link>
			</div>
		</>
	);
}
