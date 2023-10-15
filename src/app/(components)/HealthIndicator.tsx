export default function HealthIndicator({ isError, isFetching, isPaused }: { isFetching: boolean; isError: boolean; isPaused: boolean }) {
	if (isPaused)
		return (
			<div className='flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 shadow dark:bg-darkMode-secondary'>
				<span>Offline</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
					<span className={'relative inline-flex h-3 w-3 rounded-full bg-accent dark:bg-darkMode-accent'}></span>
				</span>
			</div>
		);

	if (isError)
		return (
			<div className='flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1 shadow dark:bg-darkMode-secondary'>
				<span>Error</span>
				<span className='relative flex h-3 w-3'>
					<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
					<span className={'relative inline-flex h-3 w-3 rounded-full bg-accent dark:bg-darkMode-accent'}></span>
				</span>
			</div>
		);

	return (
		<div className='px-2.5 py-1'>
			<span className='relative flex h-3 w-3'>
				<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 dark:bg-darkMode-primary`}></span>
				<span className={`relative inline-flex h-3 w-3 rounded-full bg-accent dark:bg-darkMode-accent`}></span>
			</span>
		</div>
	);
}
