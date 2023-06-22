export default function Loading() {
	return (
		<div className='mx-2 grid gap-4'>
			<div className='skeleton'>
				<input className='w-full rounded bg-black/10 p-2 dark:bg-white/25' placeholder='Suche nach einer Haltestelle' disabled />
			</div>
		</div>
	);
}
