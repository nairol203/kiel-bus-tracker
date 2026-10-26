import Trip from '@/components/Trip';
import { getTripInfo } from '@/lib/kvg';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ tripId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tripId } = await params;

	if (!tripId) {
		return {};
	}

	const data = await getTripInfo(tripId);

	return {
		title: `${data?.routeName && data.directionText ? `${data.routeName} ${data.directionText} | Kiel Bus Tracker` : 'Kiel Bus Tracker'}`,
	};
}

export default async function Page({ params }: Props) {
	return <Trip tripId={(await params).tripId} />;
}
