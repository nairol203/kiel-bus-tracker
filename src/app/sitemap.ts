import { stops } from '@/utils/stops';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const stopsSitemap = stops.map((stop) => ({
		url: `https://bus.nairol.de/stop/${stop.number}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	return [
		{
			url: 'https://bus.nairol.de',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		...stopsSitemap,
	];
}
