import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Kiel Bus Tracker',
		short_name: 'Kiel Bus Tracker',
		description: 'Aktuelle Abfahrtszeiten aller Buslinien der KVG Kiel. Echtzeit-Infos, alle Buslinien und Verspätungen auf einen Blick.',
		start_url: '/',
		display: 'standalone',
		background_color: '#dfeffc',
		theme_color: '#1887e2',
		orientation: 'portrait-primary',
		lang: 'de-DE',
		id: 'kiel-bus-tracker',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
