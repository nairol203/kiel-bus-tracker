import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'KVG Bus Tracker',
		short_name: 'KVG Bus Tracker',
		description: 'Aktuelle Abfahrtszeiten aller Buslinien der KVG Kiel. Echtzeit-Infos der KVG Kiel, alle Buslinien und Verspätungen auf einen Blick.',
		start_url: '/',
		display: 'standalone',
		background_color: '#dfeffc',
		theme_color: '#1887e2',
		orientation: 'portrait-primary',
		lang: 'de-DE',
		id: 'kvg-bus-tracker',
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
