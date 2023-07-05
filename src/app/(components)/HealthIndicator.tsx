export default function HealthIndicator({ isError, isFetching, isPaused }: { isFetching: boolean; isError: boolean; isPaused: boolean }) {
	if (isPaused)
		return (
			<div className='flex items-center gap-2 rounded-full px-2.5 py-1 bg-yellow-400 dark:bg-yellow-600 shadow'>
				<span className='text-black'>Offline</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-black opacity-75`}></span>
					<span className={'relative inline-flex h-3 w-3 rounded-full bg-black'}></span>
				</span>
			</div>
		);

	if (isError)
		return (
			<div className='flex items-center gap-2 rounded-full bg-red-500 px-2.5 py-1 shadow'>
				<span className='text-white dark:text-black'>Error</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-white opacity-75`}></span>
					<span className={'relative inline-flex h-3 w-3 rounded-full bg-white'}></span>
				</span>
			</div>
		);

	return (
		<div className='px-2.5 py-1'>
			<span className='relative flex h-3 w-3'>
				<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
				<span className={`relative inline-flex h-3 w-3 rounded-full bg-green-500`}></span>
			</span>
		</div>
	);
}
