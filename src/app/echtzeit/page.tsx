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

/**
 * TODO
 * - Autocomplete auf Mobile aktualisiert nicht immer
 * - Design upgrade
 * - Scroll Right/Left Buttons sind nicht beim Initial Page Load dabei
 * - Die Stops werden nicht automatisch aktualsiert
 * - Refactor: Home Page / Echtzeit Page / Favoriten Page
 */
