/** @format */
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		// dùng App Router
	},
};

const withNextIntl = createNextIntlPlugin('./src/locales/request.ts');
export default withNextIntl(nextConfig);
