import Image from 'next/image';

export default function Loading() {
	return (
		<div className='grid gap-4 pt-2 m-2'>
			<div className='flex justify-between'>
				<h1>KVG Echtzeitabfahrten</h1>
				<button className='disabled:opacity-50' disabled title='Aktualisieren'>
					<Image src='/arrows-rotate-light.svg' alt='Arrow Down Icon' height={20} width={20} className='dark:hidden' />
					<Image src='/arrows-rotate-dark.svg' alt='Arrow Down Icon' height={20} width={20} className='hidden dark:block' />
				</button>
			</div>
			<div className='skeleton'>
				<input className='bg-black/10 dark:bg-white/25 rounded p-2 w-full' placeholder='Suche nach einer Haltestelle' disabled />
			</div>
		</div>
	);
}
