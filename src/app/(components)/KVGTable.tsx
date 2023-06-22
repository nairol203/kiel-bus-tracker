import Link from 'next/link';

function formatDepartureTime(a: Actual) {
	return a.actualRelativeTime ? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} min` : 'Sofort'}` : `${a.plannedTime} Uhr`;
}

export default function KVGTable({ data }: { data: Actual[] }) {
	return (
		<div className='grid gap-1'>
			{data.length ? (
				data.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='flex justify-between rounded bg-white/80 p-2 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
						key={`${index}-${actual.tripId}`}
					>
						<div className='flex gap-4'>
							<span>{actual.patternText}</span>
							<span>{actual.direction}</span>
						</div>
						<span>{formatDepartureTime(actual)}</span>
					</Link>
				))
			) : (
				<div className='rounded bg-white/80 p-2 dark:bg-white/10'>Keine Daten</div>
			)}
		</div>
	);
}
