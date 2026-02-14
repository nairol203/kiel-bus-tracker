import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/trip/*', '/?*'],
		},
		sitemap: 'https://bus.nairol.de/sitemap.xml',
	};
}
