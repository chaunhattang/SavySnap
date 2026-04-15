import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localePrefix: 'always',
    localeDetection: false,
});

const protectedRoutes = ['/admin', '/user', '/profile'];

const authRoutes = ['/login', '/register', '/forgot-password'];

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;

    const role = req.cookies.get('role')?.value;

    const pathname = req.nextUrl.pathname;

    const locale = pathname.match(/^\/(vi|en)/)?.[1] || 'vi';

    const pathnameWithoutLocale = pathname.replace(/^\/(vi|en)/, '') || '/';

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathnameWithoutLocale.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) => pathnameWithoutLocale.startsWith(route));

    // ROOT: /vi
    if (pathnameWithoutLocale === '/') {
        if (!token) {
            return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
        }

        const targetRoute = role === 'ADMIN' ? `/${locale}/admin` : `/${locale}/user`;

        return NextResponse.redirect(new URL(targetRoute, req.url));
    }

    // Protected route
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    // Auth route
    if (isAuthRoute && token) {
        const targetRoute = role === 'ADMIN' ? `/${locale}/admin` : `/${locale}/user`;

        return NextResponse.redirect(new URL(targetRoute, req.url));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!_next|.*\\..*|api).*)'],
};
