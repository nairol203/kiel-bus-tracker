import Link from 'next/link';

function formatDepartureTime(a: Actual) {
	return a.actualRelativeTime ? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} min` : 'Sofort'}` : `${a.plannedTime} Uhr`;
}

export default function KVGTable({ data }: { data: Actual[] }) {
	return (
		<div className='grid gap-1'>
			{data.length ? (
				data.map(actual => (
					<Link href={`/echtzeit/trip/${actual.tripId}`} className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10' key={actual.tripId}>
						<div className='flex gap-4'>
							<span>{actual.patternText}</span>
							<span>{actual.direction}</span>
						</div>
						<span>{formatDepartureTime(actual)}</span>
					</Link>
				))
			) : (
				<div className='p-2 rounded bg-white/80 dark:bg-white/10'>Keine Daten</div>
			)}
		</div>
	);
}
