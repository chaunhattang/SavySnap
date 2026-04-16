'use client';
import React from 'react';
import { Segmented } from 'antd';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const t = useTranslations('common');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    
    const changeLanguage = (nextLocale: string) => {
        if (!pathname) return;
        const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
        router.replace(newPathname);
    };

    return (
        <Segmented
            className={styles.segmented}
            value={locale}
            onChange={(value) => changeLanguage(value as string)}
            options={[
                {
                    label: <img src="/flags/vn.svg" alt="Vietnam" className={styles.flag} />,
                    value: 'vi',
                },
                {
                    label: <img src="/flags/en.svg" alt="USA" className={styles.flag} />,
                    value: 'en',
                },
            ]}
        />
    );
}
