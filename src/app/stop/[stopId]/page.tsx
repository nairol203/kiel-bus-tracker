import { Metadata } from 'next';
import { getStopData } from 'src/app/(components)/actions';
import Departures from './Departures';

type Props = {
	params: { stopId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { stopId } = await params;

	if (!stopId) {
		return {};
	}

	const data = await getStopData({ stopId });

	return {
		title: `${data ? `${data.stopName} | KVG Bus Tracker` : 'KVG Bus Tracker'}`,
	};
}

export default async function Page({ params }: Props) {
	return <Departures stopId={(await params).stopId} />;
}
