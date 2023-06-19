import Realtime from '../(components)/Realtime';
import { searchByCharacter } from '../(components)/actions';

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default async function Fahrplan() {
	const stops: StopByCharacter[] = [];

	for (const letter of alphabet) {
		const result = await searchByCharacter(letter);
		stops.push(...result.stops);
	}

	return <Realtime allStops={stops} />;
}
