import Trip from '@/components/Trip';
import { getTripInfo } from '@/lib/kvg';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ tripId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tripId } = await params;

	const data = await getTripInfo(tripId);

	if (!data || !data.routeName || !data.directionText) return {};

	return {
		title: `${data.routeName} ${data.directionText}`,
	};
}

export default async function Page({ params }: Props) {
	return <Trip tripId={(await params).tripId} />;
}
