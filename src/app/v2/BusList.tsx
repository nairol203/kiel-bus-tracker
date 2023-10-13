import KVGTable from '../(components)/KVGTable';

export default function BusList({ stop }: { stop: KVGStops }) {
	return (
		<div className='grid gap-1'>
			<h2>{stop.stopName}</h2>
			<KVGTable data={stop} isPaused={false} />
		</div>
	);
}
