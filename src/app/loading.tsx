export default function Loading() {
	return (
		<div className='grid gap-4 m-4'>
			<h1>Nairol Bus Tracker</h1>
			<div className='grid gap-2'>
				<h2>Rathaus Kronshagen</h2>
				<SkeletonTable />
				<h2>Heischberg</h2>
				<SkeletonTable />
				<h2>Am Langsee</h2>
				<SkeletonTable />
				<h2>Preetzer Straße/Ostring</h2>
				<SkeletonTable />
			</div>
			<span className='text-sm opacity-70'>Letztes Update: {new Date().toLocaleTimeString()}</span>
		</div>
	);
}

function SkeletonTable() {
	return (
		<table className='table-fixed w-full'>
			<thead>
				<tr className='border-b border-black/25 dark:border-white/25 text-left'>
					<th className='p-2'>Linie</th>
					<th className='p-2'>Richtung</th>
					<th className='p-2'>Abfahrt</th>
				</tr>
			</thead>
			<tbody>
				<tr className='border-b border-black/25 dark:border-white/25 text-left'>
					<td className='p-2'>
						<span className='skeleton'>Lorem.</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>Lorem, ipsum dolor.</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>Lorem, ipsum.</span>
					</td>
				</tr>
				<tr className='border-b border-black/25 dark:border-white/25 text-left'>
					<td className='p-2'>
						<span className='skeleton'>Lorem.</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>Lorem, ipsum dolor.</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>Lorem, ipsum.</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
