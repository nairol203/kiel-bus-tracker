export default function HealthIndicator({ isError, isFetching, isPaused, dataUpdatedAt }: { isFetching: boolean; isError: boolean; isPaused: boolean; dataUpdatedAt: number }) {
	if (isPaused)
		return (
			<>
				<div className='px-2.5 py-1'>
					<span className='relative flex h-3 w-3'>
						<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
						<span className={'relative inline-flex h-3 w-3 rounded-full bg-gray-600 dark:bg-gray-200'}></span>
					</span>
				</div>
				<span className='text-sm'>Offline - Aktualisiert um {new Date(dataUpdatedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</span>
			</>
		);

	if (isError)
		return (
			<>
				<div className='px-2.5 py-1'>
					<span className='relative flex h-3 w-3'>
						<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
						<span className={'relative inline-flex h-3 w-3 rounded-full bg-red-500'}></span>
					</span>
				</div>
				<span className='text-sm'>Zuletzt aktualisiert um {new Date(dataUpdatedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</span>
			</>
		);

	return (
		<>
			<div className='px-2.5 py-1'>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
					<span className={`relative inline-flex h-3 w-3 rounded-full bg-green-600`}></span>
				</span>
			</div>
			<span className='text-sm'>Live - Aktualisiert um {new Date(dataUpdatedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</span>
		</>
	);
}
