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
			<div className='flex'>
				<div className='px-2.5 py-1.5 rounded skeleton'>Reload</div>
			</div>
			<div>
				<span className='text-sm skeleton'>Letztes Update: XX:XX:XX</span>
			</div>
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
						<span className='skeleton'>XX</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>Loremipsum.</span>
					</td>
					<td className='p-2'>
						<span className='skeleton'>X Minuten</span>
					</td>
				</tr>
				{Math.random() > 0.5 && (
					<tr className='border-b border-black/25 dark:border-white/25 text-left'>
						<td className='p-2'>
							<span className='skeleton'>XX</span>
						</td>
						<td className='p-2'>
							<span className='skeleton'>Loremipsum.</span>
						</td>
						<td className='p-2'>
							<span className='skeleton'>X Minuten</span>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
