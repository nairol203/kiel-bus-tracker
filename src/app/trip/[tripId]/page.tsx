import Trip from '@/components/Trip';
import { getTripPassages } from '@/lib/kvg';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ tripId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tripId } = await params;

	const data = await getTripPassages(tripId);

	if (!data.routeName || !data.directionText) return {};

	return {
		title: `${data.routeName} ${data.directionText}`,
	};
}

export default async function Page({ params }: Props) {
	return (
		<div className='bg-surface border-border mx-2 mb-12 rounded border shadow'>
			<Trip tripId={(await params).tripId} modal={false} />
		</div>
	);
}
