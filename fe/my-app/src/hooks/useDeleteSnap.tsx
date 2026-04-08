'use client';

import { useState } from 'react';
import { message } from 'antd';
import { snapService } from '@/services/apis/snap.service';

export function useDeleteSnap() {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);

            await snapService.delete(id);

            message.success('Xóa thành công');

            window.dispatchEvent(new Event('snap-updated'));
        } catch (error) {
            console.error(error);
            message.error('Xóa thất bại');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleDelete,
    };
}
