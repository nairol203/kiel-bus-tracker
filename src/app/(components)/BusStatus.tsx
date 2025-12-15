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
	if (diffInMinutes > 2) return <span className='text-red-500'>{Math.round(diffInMinutes)} min Verspätung</span>;
	if (diffInMinutes < -2) return <span className='text-accent'>{Math.round(diffInMinutes)} min früher</span>;
	return '';
}

const BusStatus: React.FC<{ data: NormalizedActual; isPaused: boolean; useRelative: boolean }> = ({ data, isPaused, useRelative }) => {
	return (
		<>
			<span className='row-span-2 flex items-center justify-end font-bold text-lg'>{getTimeDisplay(data.actualDate, data.actualRelativeTime, useRelative, isPaused)}</span>
			<span className='text-sm'>{getStatus(data.plannedDate, data.actualDate)}</span>
		</>
	);
};

export default BusStatus;
