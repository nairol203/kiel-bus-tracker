import { getAllStops } from '@/lib/kvg';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const stops = await getAllStops();
		stops?.stops.forEach((stop) => stop.category !== 'bus' && console.log(stop));
		return NextResponse.json(stops);
	} catch (error) {
		console.error('Error fetching stops:', error);
		return NextResponse.json({ error: 'Failed to fetch stops' }, { status: 500 });
	}
}
