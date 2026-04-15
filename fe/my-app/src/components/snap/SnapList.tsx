'use client';

import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import SnapCard from './SnapCard';
import styles from './SnapList.module.css';
import CategoryTabs from './CategoryTabs';

import { useSnapCrud } from '@/hooks/useSnapCrud';

export default function SnapList() {
    const { data: snaps, loading, fetchAll, search } = useSnapCrud();

    const [category, setCategory] = useState('all');

    useEffect(() => {
        fetchAll();
    }, []);

    if (loading)
        return (
            <div className={styles.center}>
                <Spin size="large" />
            </div>
        );

    const filteredSnaps = snaps
        .filter((snap) =>
            category === 'all' ? true : snap.category.toUpperCase().includes(category.toUpperCase())
        )
        .filter((snap) => snap.title?.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <CategoryTabs selected={category} onChange={setCategory} />

            <div className={styles.container}>
                {filteredSnaps.map((snap) => (
                    <SnapCard key={snap.id} snap={snap} onRefresh={fetchAll} />
                ))}
            </div>
        </>
    );
}
