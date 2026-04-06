/** @format */

'use client';

import { useCallback } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export const useLanguageChange = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = useCallback(
        (value: string) => {
            document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax`;
            const newPath = pathname.replace(`/${locale}`, `/${value}`);
            router.push(newPath || '/');
            router.refresh();
        },
        [pathname, locale, router]
    );

    var a = 1;

    return handleLanguageChange;
};
