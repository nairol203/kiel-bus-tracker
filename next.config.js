/** @type {import('next').NextConfig} */
const nextConfig = {
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
