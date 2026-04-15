'use client';
import React from 'react';
import { Select } from 'antd';
import { useTranslations } from 'next-intl';

import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const t = useTranslations('common');
    
    const handleChange = (value: string) => {
        // Logic to change locale (usually involves router.replace)
        console.log('Language changed to:', value);
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
