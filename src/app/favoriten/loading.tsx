export default function Loading() {
	return (
		<div className='grid gap-4 mx-2'>
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
			<div>
				<a className='px-2.5 py-1.5 rounded skeleton'>Neu laden</a>
			</div>
			<div>
				<span className='text-sm skeleton'>Letztes Update: XX:XX:XX</span>
			</div>
		</div>
	);
}

function SkeletonTable() {
	return (
		<div className='grid gap-1'>
			<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
		</div>
	);
}
