/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactCompiler: true,
	// redirects: () => {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/echtzeit',
	// 			permanent: false,
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
