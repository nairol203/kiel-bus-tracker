export default function Loading() {
	return (
		<div className='mx-2 grid gap-2'>
			<div className='skeleton'>
				<input className='w-full rounded p-2' placeholder='Suche nach einer Haltestelle' disabled />
			</div>
			<div className='grid gap-2'>
				<div className='flex'>
					<h2 className='skeleton'>Beliebte Suchanfragen</h2>
				</div>
				<div className='skeleton flex gap-3 rounded p-2 '>
					<div className='h-5 w-5' />
					<span>Unbekannte Haltestelle</span>
				</div>
				<div className='skeleton flex gap-3 rounded p-2 '>
					<div className='h-5 w-5' />
					<span>Unbekannte Haltestelle</span>
				</div>
				<div className='skeleton flex gap-3 rounded p-2 '>
					<div className='h-5 w-5' />
					<span>Unbekannte Haltestelle</span>
				</div>
				<div className='skeleton flex gap-3 rounded p-2 '>
					<div className='h-5 w-5' />
					<span>Unbekannte Haltestelle</span>
				</div>
				<div className='skeleton flex gap-3 rounded p-2 '>
					<div className='h-5 w-5' />
					<span>Unbekannte Haltestelle</span>
				</div>
			</div>
		</div>
	);
}
