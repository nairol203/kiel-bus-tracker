export default function Loading() {
	return (
		<div className='mx-2 grid gap-4'>
			<div className='skeleton'>
				<input className='w-full rounded p-2 ' placeholder='Suche nach einer Haltestelle' disabled />
			</div>
		</div>
	);
}
