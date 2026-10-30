'use client';

import type { TripPassages } from '@/lib/schemas';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Trip({ tripId, modal }: { tripId: string; modal: boolean }) {
	const router = useRouter();
	const { data: tripInfo, isError } = useQuery({
		queryKey: ['tripInfo', tripId],
		queryFn: async (): Promise<TripPassages> => {
			const res = await fetch(`/api/trip/${tripId}`);
			if (!res.ok) throw new Error('Failed to fetch trips');
			return res.json();
		},
		refetchInterval: 15_000,
	});

	if (isError) {
		return (
			<div className='flex flex-col items-center justify-center p-12 text-center'>
				<AlertCircle className='text-muted mb-4 h-10 w-10' />
				<h1 className='text-text mb-2 text-xl font-bold'>Fehler beim Laden der Fahrt</h1>
				<p className='text-muted mb-6 text-sm'>Die Fahrtdaten konnten nicht abgerufen werden.</p>
				<button onClick={() => router.back()} className='bg-surface hover:bg-surface-hover text-muted border-border rounded border px-4 py-2'>
					Zurück
				</button>
			</div>
		);
	}

	if (!tripInfo) {
		return (
			<>
				<div className={`border-border bg-primary/10 flex items-center justify-between border-b ${modal ? 'sticky top-0 z-20 px-4 py-3 backdrop-blur-md' : 'p-4'}`}>
					<div className='flex items-center space-x-3'>
						<div className='skeleton h-8 w-12 rounded-xl' />
						<div className='skeleton h-7 w-48 rounded-md' />
					</div>
					{modal && (
						<button onClick={() => router.back()} className='bg-background hover:bg-surface-hover text-muted border-border rounded-full border p-2 shadow'>
							<X className='h-5 w-5' />
						</button>
					)}
				</div>
				<div className='p-6'>
					<div className='relative'>
						<div className='bg-border absolute top-2 bottom-2 left-1.75 z-0 w-0.5' />
						<div className='relative z-10 space-y-6'>
							{[...Array(10)].map((_, i) => {
								const isPast = i < 2;
								const isNextStop = i === 2;

								return (
									<div key={i} className={`flex items-start gap-6 ${isPast ? 'opacity-40' : ''}`}>
										<div className='relative mt-1'>
											<div
												className={`h-4 w-4 shrink-0 rounded-full border-2 ${
													isNextStop
														? 'border-primary bg-primary animate-pulse shadow'
														: isPast
															? 'border-border bg-surface'
															: 'border-primary bg-surface'
												}`}
											/>
											{isNextStop && <span className='bg-primary absolute top-0 left-0 h-4 w-4 animate-ping rounded-full opacity-75' />}
										</div>
										<div className='flex flex-1 items-start justify-between gap-4'>
											<div className='w-2/3'>
												<div className={`skeleton h-5 rounded-md ${i % 2 === 0 ? 'w-3/4' : 'w-1/2'}`} />
												{isNextStop && <div className='skeleton mt-2 h-3 w-1/3 rounded-md' />}
											</div>
											<div className='flex flex-col items-end'>
												<div className='skeleton h-6 w-14 rounded-md' />
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</>
		);
	}

	const allPassages = [...tripInfo.old, ...tripInfo.actual];
	const nextStopI = tripInfo.old.length;

	return (
		<>
			<header className={`border-border bg-primary/10 flex items-center justify-between border-b ${modal ? 'sticky top-0 z-20 px-4 py-3 backdrop-blur-md' : 'p-4'}`}>
				<div className='flex items-center gap-3'>
					{tripInfo.routeName && <div className='bg-primary rounded-xl px-3 py-1 font-bold text-white shadow'>{tripInfo.routeName}</div>}
					<h1 className='text-text text-xl font-bold'>{tripInfo.directionText}</h1>
				</div>
				{modal && (
					<button onClick={() => router.back()} className='bg-background hover:bg-surface-hover text-muted hover:text-text border-border rounded-full border p-2 shadow'>
						<X className='h-5 w-5' />
					</button>
				)}
			</header>

			<div className='p-6'>
				<div className='relative'>
					{allPassages.length !== 0 && <div className='bg-border absolute top-2 bottom-2 left-1.75 z-0 w-0.5' />}
					<div className='relative z-10 space-y-6'>
						{allPassages.length === 0 ? (
							<p className='text-muted py-8 text-center font-medium'>Der Bus hat die Endstation erreicht.</p>
						) : (
							allPassages.map((passage, i) => {
								const isLast = i === allPassages.length - 1;
								const isNextStop = i === nextStopI && tripInfo.actual.length > 0;
								const isPast = i < nextStopI;

								return (
									<div key={`${passage.stop_seq_num}-${passage.stop.id}`} className={`flex items-start gap-6 ${isPast ? 'opacity-40' : ''}`}>
										<div className='relative mt-1'>
											<div
												className={`h-4 w-4 shrink-0 rounded-full border-2 transition-all ${
													isNextStop
														? 'border-primary bg-primary shadow'
														: isLast
															? 'border-primary bg-primary'
															: isPast
																? 'border-border bg-surface'
																: 'border-primary bg-surface'
												}`}
											/>
											{isNextStop && <span className='bg-primary absolute top-0 left-0 h-4 w-4 animate-ping rounded-full opacity-75' />}
										</div>
										<div className='flex flex-1 items-start justify-between gap-4'>
											<div>
												<span
													className={`block font-medium ${isNextStop ? 'text-primary text-lg font-bold' : isLast ? 'text-text font-bold' : 'text-text'}`}
												>
													{passage.stop.name}
												</span>
												{isNextStop && <p className='text-primary mt-1 text-[10px] font-bold tracking-widest uppercase'>Nächster Halt</p>}
											</div>
											<div className='flex flex-col items-end'>
												<span className='text-muted bg-background border-border/60 rounded border px-2 py-0.5 font-mono text-sm'>
													{passage.actualTime || ('plannedTime' in passage && passage.plannedTime)}
												</span>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}
