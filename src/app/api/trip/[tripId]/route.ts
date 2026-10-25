import { getTripInfo } from '@/lib/kvg';
import { NextResponse } from 'next/server';

type RouteContext = {
	params: Promise<{ tripId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { tripId } = await context.params;

	try {
		const data = await getTripInfo(tripId);
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching trip info:', error);
		return NextResponse.json({ error: 'Failed to fetch trip info' }, { status: 500 });
	}
}
