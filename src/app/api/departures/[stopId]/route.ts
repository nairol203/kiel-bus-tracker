import { getStopDepartures } from '@/lib/kvg';
import { NextResponse } from 'next/server';

type RouteContext = {
	params: Promise<{ stopId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { stopId } = await context.params;

	try {
		const data = await getStopDepartures(stopId);
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching departures:', error);
		return NextResponse.json({ error: 'Failed to fetch departures' }, { status: 500 });
	}
}
