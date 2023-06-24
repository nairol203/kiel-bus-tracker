/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	reactStrictMode: true,
	redirects: () => {
		return [
			{
				source: '/',
				destination: '/echtzeit',
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
