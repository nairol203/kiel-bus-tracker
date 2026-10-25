export default function HealthIndicator({ isError, isPaused }: { isError: boolean; isPaused: boolean }) {
	if (isPaused)
		return (
			<div className='flex items-center text-xs font-semibold'>
				<div className='pr-2'>
					<span className='relative flex h-3 w-3'>
						<span className={'bg-text absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'}></span>
						<span className={'bg-text relative inline-flex h-3 w-3 rounded-full'}></span>
					</span>
				</div>
				Offline Modus
			</div>
		);

	if (isError)
		return (
			<div className='flex items-center text-xs font-semibold'>
				<div className='pr-2'>
					<span className='relative flex h-3 w-3'>
						<span className={'absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-75'}></span>
						<span className={'relative inline-flex h-3 w-3 rounded-full bg-red-500'}></span>
					</span>
				</div>
				Error
			</div>
		);

	return (
		<div className='text-primary flex items-center text-xs font-semibold'>
			<div className='pr-2'>
				<span className='relative flex h-3 w-3'>
					<span className={'bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'}></span>
					<span className={'bg-primary/80 relative inline-flex h-3 w-3 rounded-full'}></span>
				</span>
			</div>
			Live Updates
		</div>
	);
}
