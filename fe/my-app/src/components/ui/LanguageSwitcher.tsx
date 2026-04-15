'use client';

import { Segmented } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const changeLanguage = (value: string) => {
        const segments = pathname.split('/');

        segments[1] = value;

        const newPath = segments.join('/');

        router.push(newPath);
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
