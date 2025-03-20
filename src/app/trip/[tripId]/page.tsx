import { Metadata, ResolvingMetadata } from 'next';
import { getTripInfo } from 'src/app/(components)/actions';
import Trip from './Trip';

type Props = {
	params: { tripId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tripId } = params;

	if (!tripId) {
		return {};
	}

	const data = await getTripInfo(tripId);

	return {
		title: `${data?.routeName && data.directionText ? `${data.routeName} ${data.directionText} | KVG Bus Tracker` : 'KVG Bus Tracker'}`,
	};
}

export default async function Page({ params }: Props) {
	return <Trip tripId={params.tripId} />;
}
