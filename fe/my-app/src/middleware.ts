/** @format */

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localePrefix: 'always',
    localeDetection: true,
});

const protectedRoutes = ['/admin', '/user', '/profile', '/'];
const authRoutes = ['/login', '/register', '/forgot-password'];

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;
    const role = req.cookies.get('role')?.value;

    const pathname = req.nextUrl.pathname;
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || 'vi';

    // Normalize path by stripping locale
    const pathnameWithoutLocale = pathname.replace(/^\/(vi|en)/, '') || '/';

    const isProtectedRoute = protectedRoutes.some((route) => {
        if (route === '/') return pathnameWithoutLocale === '/';
        return pathnameWithoutLocale.startsWith(route);
    });

    const isAuthRoute = authRoutes.some((route) => pathnameWithoutLocale.startsWith(route));

    // Case 1: Unauthenticated but trying to access a restricted page
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // Case 2: Authenticated but trying to hit login/register page
    if (isAuthRoute && token) {
        const targetRoute = role === 'ADMIN' ? `/${locale}/admin` : `/${locale}/user`;
        return NextResponse.redirect(new URL(targetRoute, req.url));
    }

    // If all checks pass, run i18n routing
    return intlMiddleware(req);
}

export const config = { matcher: ['/((?!_next|.*\\..*|api).*)'] };
