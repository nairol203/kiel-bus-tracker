import { getStopData } from '@/lib/kvg';
import { NextResponse } from 'next/server';

type RouteContext = {
	params: Promise<{ stopId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { stopId } = await context.params;

	const { searchParams } = new URL(request.url);
	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	try {
		const data = await getStopData({ stopId, routeId, direction });
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching departures:', error);
		return NextResponse.json({ error: 'Failed to fetch departures' }, { status: 500 });
	}
}
