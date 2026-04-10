'use client';

import { useEffect, useState, useCallback } from 'react';
import { Snap } from '@/types/snap.td';
import { snapService } from '@/services/apis/snap.service';
import Cookies from 'js-cookie';

export function useSnaps() {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSnaps = useCallback(async () => {
        try {
            setLoading(true);

            const data = await snapService.getAll();
            setSnaps(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get('accessToken');

        if (!token) return;

        fetchSnaps();

        const handleRefresh = () => {
            fetchSnaps();
        };

        window.addEventListener('snap-updated', handleRefresh);

        return () => {
            window.removeEventListener('snap-updated', handleRefresh);
        };
    }, [fetchSnaps]);

    return {
        snaps,
        loading,
        fetchSnaps,
    };
}
