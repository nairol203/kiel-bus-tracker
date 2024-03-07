/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
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
