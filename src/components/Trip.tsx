'use client';

import { queryClient } from '@/utils/Providers';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTripInfo } from './actions';

function getTimeDisplay(date: Date, isPaused: boolean, departed = false) {
	if (isPaused) {
		return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
	}
	const timeDifferenceMin = Math.floor(((new Date().getTime() - date.getTime()) * (departed ? 1 : -1)) / 60000);
	if (departed) return `vor ${timeDifferenceMin} min`;
	return timeDifferenceMin < 1 ? 'Sofort' : `${timeDifferenceMin} min`;
}

export default function Trip({ tripId }: { tripId: string }) {
	const router = useRouter();
	const {
		data: tripInfo,
		isError,
		isPaused,
	} = useQuery({
		queryKey: ['tripInfo', tripId],
		queryFn: () => getTripInfo(tripId),
		refetchInterval: 15_000,
	});

	if (isError) {
		return (
			<div className='mx-2 mb-12'>
				<div className='bg-surface/50 border-border flex flex-col items-center justify-center rounded border p-12 text-center shadow-lg'>
					<AlertCircle className='text-muted mb-4 h-10 w-10' />
					<h1 className='text-text mb-2 text-xl font-bold'>Fehler beim Laden der Fahrt</h1>
					<p className='text-muted mb-6 text-sm'>Die Fahrtdaten konnten nicht abgerufen werden.</p>
					<div className='flex gap-3'>
						<button
							onClick={() => queryClient.refetchQueries({ queryKey: ['tripInfo', tripId] })}
							className='bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white shadow'
						>
							Erneut versuchen
						</button>
						<button onClick={() => router.back()} className='bg-surface hover:bg-surface-hover text-muted border-border rounded-lg border px-4 py-2'>
							Zurück
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (!tripInfo) {
		return (
			<div className='mx-2 mb-12'>
				<div className='bg-surface border-border overflow-hidden rounded border shadow'>
					<div className='border-border bg-surface flex items-center justify-between border-b p-4'>
						<div className='flex items-center space-x-3'>
							<div className='skeleton h-8 w-12 rounded-xl' />
							<div className='skeleton h-7 w-48 rounded-md' />
						</div>
						<button onClick={() => router.back()} className='bg-background hover:bg-surface-hover text-muted border-border rounded-full border p-2 shadow'>
							<ArrowLeft className='h-5 w-5' />
						</button>
					</div>
					<div className='p-6'>
						<div className='relative'>
							<div className='bg-border absolute top-2 bottom-2 left-1.75 z-0 w-0.5' />
							<div className='relative z-10 space-y-6'>
								{[...Array(6)].map((_, i) => {
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
				</div>
			</div>
		);
	}

	const allPassages = [...tripInfo.old, ...tripInfo.actual];
	const nextStopI = tripInfo.old.length;

	return (
		<div className='mx-2 mb-12'>
			<div className='bg-surface border-border overflow-hidden rounded border shadow'>
				<div className='border-border bg-surface flex items-center justify-between border-b p-4'>
					<div className='flex gap-3'>
						{tripInfo.routeName && <div className='bg-primary rounded-xl px-3 py-1 font-bold text-white shadow'>{tripInfo.routeName}</div>}
						<h1 className='text-text text-xl font-bold'>{tripInfo.directionText}</h1>
					</div>
					<button onClick={() => router.back()} className='bg-background hover:bg-surface-hover text-muted hover:text-text border-border rounded-full border p-2 shadow'>
						<ArrowLeft className='h-5 w-5' />
					</button>
				</div>

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
										<div key={`${passage.stopSequenceNumber}-${passage.stop.id}`} className={`flex items-start gap-6 ${isPast ? 'opacity-40' : ''}`}>
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
													<Link
														href={`/stop/${passage.stop.shortName || passage.stop.id}`}
														className={`block font-medium hover:underline ${
															isNextStop ? 'text-primary text-lg font-bold' : isLast ? 'text-text font-bold' : 'text-text'
														}`}
													>
														{passage.stop.name}
													</Link>
													{isNextStop && <p className='text-primary mt-1 text-[10px] font-bold tracking-widest uppercase'>Nächster Halt</p>}
												</div>
												{passage.actualDate && (
													<div className='flex flex-col items-end'>
														<span className='text-muted bg-background border-border/60 rounded border px-2 py-0.5 font-mono text-sm'>
															{getTimeDisplay(passage.actualDate, isPaused, isPast)}
														</span>
													</div>
												)}
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
