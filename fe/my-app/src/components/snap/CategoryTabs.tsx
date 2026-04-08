'use client';

import { useTranslations } from 'next-intl';
import styles from './CategoryTabs.module.css';

export default function CategoryTabs({
    selected,
    onChange,
}: {
    selected: string;
    onChange: (value: string) => void;
}) {
    const t = useTranslations('snap.category');

    const CATEGORIES = [
        {
            label: t('all'),
            value: 'all',
        },
        {
            label: t('need'),
            value: 'NEED',
        },
        {
            label: t('want'),
            value: 'WANT',
        },
        {
            label: t('saving'),
            value: 'SAVING',
        },
    ];

    return (
        <div className={styles.container}>
            {CATEGORIES.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onChange(item.value)}
                    className={selected === item.value ? styles.active : styles.tab}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
