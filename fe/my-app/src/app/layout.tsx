/** @format */

/**
 *
 * - Uses Next.js app directory conventions and server components.
 * - Metadata is well-structured for SEO and social sharing, but placeholders should be replaced with actual values.
 * - Locale is dynamically set from cookies, defaulting to 'vi'.
 * - Includes Bootstrap via CDN for styling and scripts.
 * - Applies global styles and ensures minimum viewport height.
 * - Consider moving inline styles and scripts to separate files for maintainability.
 * - Good use of TypeScript types for props.
 */

import { Metadata } from 'next';
import { cookies } from 'next/headers';
import '../styles/style.css';
import ReduxProvider from '@/utils/ReduxProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Script from 'next/script';

export const metadata: Metadata = {
    title: '', // Replace  with your website name
    description: '', // Description of your website
    icons: {
        icon: '/favicon.ico', // Path to your favicon
    },
    openGraph: {
        title: '',
        description: ' - ',
        url: 'https://yourwebsite.com', // Replace with your website URL
        siteName: '',
        images: [
            {
                url: 'https://yourwebsite.com/og-image.jpg', // Path to your Open Graph image
                width: 800,
                height: 600,
            },
        ],
        locale: 'vi_VN', // Replace with appropriate locale
        type: 'website',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const getLocale = async () => {
        const cookieStore = await cookies();
        return cookieStore.get('NEXT_LOCALE')?.value || 'vi';
    };
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
                    crossOrigin="anonymous"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                    crossOrigin="anonymous"
                />
            </head>
            <body className="m-0 p-0">
                <div className=" bg-light main-container">
                    <AntdRegistry>
                        <ReduxProvider>{children}</ReduxProvider>
                    </AntdRegistry>
                </div>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
