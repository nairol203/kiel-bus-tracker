import Image from 'next/image';

function formatDepartureTime(a: Actual) {
	return a.actualRelativeTime
		? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} Minute${Math.round(a.actualRelativeTime / 60) !== 1 ? 'n' : ''} ` : 'Sofort'}`
		: `${a.plannedTime} Uhr`;
}

export default function KVGTable({ data }: { data: Actual[] }) {
	return (
		<table className='w-full'>
			<thead>
				<tr className='border-b border-black/25 dark:border-white/25 text-left'>
					<th className='p-2'>Linie</th>
					<th className='p-2'>Richtung</th>
					<th className='p-2'>Abfahrt</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.length ? (
					data.map((a, index) => {
						return (
							<tr className='border-b border-black/25 dark:border-white/25' key={`${index} ${a.tripId}`}>
								<td className='p-2'>{a.patternText}</td>
								<td className='p-2'>{a.direction}</td>
								<td className='p-2'>{formatDepartureTime(a)}</td>
								<td className='p-2'>
									<a href={`/echtzeit/trip/${a.tripId}`} target='_blank' rel='noopener'>
										<Image src='/circle-info-light.svg' alt='Link Icon' height={20} width={20} className='dark:hidden' />
										<Image src='/circle-info-dark.svg' alt='Link Icon' height={20} width={20} className='hidden dark:block' />
									</a>
								</td>
							</tr>
						);
					})
				) : (
					<tr className='border-b border-black/25 dark:border-white/25'>
						<td className='p-2'>Keine Daten</td>
						<td className='p-2'></td>
						<td className='p-2'></td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
