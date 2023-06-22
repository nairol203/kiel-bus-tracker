export default function HealthIndicator({ isError, isFetching, isPaused }: { isFetching: boolean; isError: boolean; isPaused: boolean }) {
	if (isPaused)
		return (
			<div className='flex gap-2 items-center px-2 py-1 rounded-full bg-white/80 dark:bg-white/10'>
				<span>Offline</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75`}></span>
					<span className={'relative inline-flex rounded-full h-3 w-3 bg-yellow-500'}></span>
				</span>
			</div>
		);

	if (isError)
		return (
			<div className='flex gap-2 items-center px-2 py-1 rounded-full bg-white/80 dark:bg-white/10'>
				<span>Error</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}></span>
					<span className={'relative inline-flex rounded-full h-3 w-3 bg-red-500'}></span>
				</span>
			</div>
		);

	return (
		<div className='px-2 py-1'>
			<span className='relative flex h-3 w-3'>
				<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
				<span className={`relative inline-flex rounded-full h-3 w-3 bg-green-500`}></span>
			</span>
		</div>
	);
}
