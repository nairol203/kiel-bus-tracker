import React from 'react';

function getTimeDisplay(date: Date, relativeTime: number, useRelative: boolean, isPaused: boolean) {
	if (isPaused || !useRelative) {
		return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
	}
	return relativeTime < 60 ? 'Sofort' : `${Math.round(relativeTime / 60)} min`;
}

function getStatus(plannedDate: Date, actualDate: Date) {
	const diffInMinutes = (actualDate.getTime() - plannedDate.getTime()) / 60000;
	const plannedTimeString = plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
	if (diffInMinutes > 2)
		return (
			<>
				{Math.round(diffInMinutes)} min verpätet <s>{plannedTimeString}</s>
			</>
		);
	if (diffInMinutes < -2)
		return (
			<>
				{Math.round(diffInMinutes)} min früher <s>{plannedTimeString}</s>
			</>
		);
	return 'Planmäßig';
}

const BusStatus: React.FC<{ data: NormalizedActual; isPaused: boolean; useRelative: boolean }> = ({ data, isPaused, useRelative }) => {
	return (
		<>
			<span className='row-span-2 flex items-center justify-end'>{getTimeDisplay(data.actualDate, data.actualRelativeTime, useRelative, isPaused)}</span>
			<span className='col-span-2 text-sm'>{getStatus(data.plannedDate, data.actualDate)}</span>
		</>
	);
};

export default BusStatus;
