'use client';

import styles from './CategoryTabs.module.css';

const CATEGORIES = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Thiết yếu', value: 'Thiết yếu' },
    { label: 'Ăn uống', value: 'Ăn uống' },
    { label: 'Giải trí', value: 'Giải trí' },
    { label: 'Mua sắm', value: 'Mua sắm' },
];

export default function CategoryTabs({
    selected,
    onChange,
}: {
    selected: string;
    onChange: (value: string) => void;
}) {
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
