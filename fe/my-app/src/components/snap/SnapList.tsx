'use client';

import { useState } from 'react';
import { Spin } from 'antd';

import SnapCard from './SnapCard';
import { useSnaps } from '@/hooks/useSnaps';

import styles from './SnapList.module.css';
import CategoryTabs from './CategoryTabs';

export default function SnapList() {
    const { snaps, loading, fetchSnaps } = useSnaps();

    const [category, setCategory] = useState('all');

    if (loading) return <Spin />;

    const filteredSnaps =
        category === 'all'
            ? snaps
            : snaps.filter((snap) => snap.category.toUpperCase() === category.toUpperCase());

    return (
        <>
            {/* Category Tabs */}
            <CategoryTabs selected={category} onChange={setCategory} />

            {/* Snap List */}
            <div className={styles.container}>
                {filteredSnaps.map((snap) => (
                    <SnapCard key={snap.id} snap={snap} onRefresh={fetchSnaps} />
                ))}
            </div>
        </>
    );
}
