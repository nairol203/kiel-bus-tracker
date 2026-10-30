import Trip from '@/components/Trip';
import { Modal } from './modal';

export default async function PhotoModal({ params }: { params: Promise<{ tripId: string }> }) {
	const { tripId } = await params;
	return (
		<Modal>
			<Trip tripId={tripId} modal />
		</Modal>
	);
}
