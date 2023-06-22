export default function Loading() {
	return (
		<div className='grid gap-4 mx-2'>
			<div className='skeleton'>
				<input className='bg-black/10 dark:bg-white/25 rounded p-2 w-full' placeholder='Suche nach einer Haltestelle' disabled />
			</div>
		</div>
	);
}
