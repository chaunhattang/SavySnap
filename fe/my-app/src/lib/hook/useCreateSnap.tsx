'use client';
import { useState } from 'react';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { snapService } from '@/lib/api/snap.service';
export function useCreateSnap(onClose?: () => void) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [category, setCategory] = useState('Thiết yếu');
    const [file, setFile] = useState<RcFile | null>(null);
    const [loading, setLoading] = useState(false);
    const beforeUpload = (file: RcFile) => {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImage) {
            message.error('Chỉ hỗ trợ JPG hoặc PNG');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Ảnh phải nhỏ hơn 5MB');
            return Upload.LIST_IGNORE;
        }
        setFile(file);
        return false;
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            let imageUrl = '';
            if (file) {
                imageUrl = URL.createObjectURL(file);
            }
            await snapService.create({ title, amount, type: 'income', category, image: imageUrl });
            window.dispatchEvent(new Event('snap-updated'));
            setTitle('');
            setAmount(null);
            setFile(null);
            onClose?.();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return {
        title,
        setTitle,
        amount,
        setAmount,
        category,
        setCategory,
        loading,
        beforeUpload,
        handleSubmit,
    };
}
