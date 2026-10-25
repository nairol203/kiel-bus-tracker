import Departures from '@/components/Departures';
import Searchbar from '@/components/Searchbar';
import { getAllStops } from '@/lib/kvg';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ stopId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { stopId } = await params;

	if (!stopId) return {};

	const data = await getAllStops();
	const stop = data.find((stop) => stop.number == stopId);

	if (!stop) return {};

	return {
		title: `${data ? `${stop.name} | KVG Bus Tracker` : 'KVG Bus Tracker'}`,
		description: `Aktuelle Abfahrtszeiten ${stop ? `für die Haltestelle ${stop.name}` : 'aller Buslinien der KVG Kiel'}. Echtzeit-Infos${stop ? ' der KVG Kiel' : ''}, alle Buslinien und Verspätungen auf einen Blick.`,
		alternates: {
			canonical: `/stop/${stopId}`,
		},
	};
}

export default async function Page({ params }: Props) {
	return (
		<div className='mx-2'>
			<Searchbar />
			<Departures stopId={(await params).stopId} />
		</div>
	);
}
