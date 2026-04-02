/** @format */

import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
	locales: ['vi', 'en'],
	defaultLocale: 'vi',
	localePrefix: 'always',
	localeDetection: true,
});
export const config = { matcher: ['/((?!_next|.*\\..*|api).*)'] };
