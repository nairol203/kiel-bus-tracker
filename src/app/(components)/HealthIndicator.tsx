export default function HealthIndicator({ isError, isFetching, isPaused }: { isFetching: boolean; isError: boolean; isPaused: boolean; dataUpdatedAt: number }) {
	if (isPaused)
		return (
			<div className='flex items-center text-sm'>
				<div className='pr-2'>
					<span className='relative flex h-3 w-3'>
						<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-gray-700 opacity-75 dark:bg-gray-500`}></span>
						<span className={'relative inline-flex h-3 w-3 rounded-full bg-gray-600 dark:bg-gray-200'}></span>
					</span>
				</div>
				Offline Modus
			</div>
		);

	if (isError)
		return (
			<div className='flex items-center text-sm'>
				<div className='pr-2'>
					<span className='relative flex h-3 w-3'>
						<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75 dark:bg-red-700`}></span>
						<span className={'relative inline-flex h-3 w-3 rounded-full bg-red-500'}></span>
					</span>
				</div>
				Fehler
			</div>
		);

	return (
		<div className='flex items-center text-sm'>
			<div className='pr-2'>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75 dark:bg-green-400`}></span>
					<span className={`relative inline-flex h-3 w-3 rounded-full bg-green-600`}></span>
				</span>
			</div>
			Live Updates
		</div>
	);
}
