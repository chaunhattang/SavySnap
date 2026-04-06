import { useState } from 'react';
import { Snap } from '@/types/snap';
import { SnapFilter } from '@/types/filer';

export function useSnapFilter(snaps: Snap[]) {
    const [filter, setFilter] = useState<SnapFilter>({});

    const filteredSnaps = snaps.filter((snap) => {
        if (filter.category && snap.category !== filter.category) return false;

        if (filter.minAmount !== undefined && (snap.amount ?? 0) < filter.minAmount) return false;

        if (filter.maxAmount !== undefined && (snap.amount ?? 0) > filter.maxAmount) return false;

        if (filter.keyword && !snap.title.toLowerCase().includes(filter.keyword.toLowerCase()))
            return false;

        if (filter.fromDate && new Date(snap.createdAt) < new Date(filter.fromDate)) return false;

        if (filter.toDate && new Date(snap.createdAt) > new Date(filter.toDate)) return false;

        return true;
    });

    return {
        filter,
        setFilter,
        filteredSnaps,
    };
}
