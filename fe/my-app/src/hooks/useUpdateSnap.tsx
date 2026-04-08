'use client';

import { useState, useEffect } from 'react';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { snapService } from '@/services/apis/snap.service';

export function useUpdateSnap(snap: any, onClose?: () => void) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [category, setCategory] = useState('Thiết yếu');
    const [file, setFile] = useState<RcFile | null>(null);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (snap) {
            setTitle(snap.title ?? '');
            setAmount(snap.amount ?? null);
            setCategory(snap.category ?? 'Thiết yếu');

            if (snap.image) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'current-image',
                        status: 'done',
                        url: snap.image,
                    },
                ]);
            } else {
                setFileList([]);
            }

            setFile(null);
        }
    }, [snap]);

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

        setFileList([
            {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: URL.createObjectURL(file),
            },
        ]);

        return false;
    };
    const categoryMap: Record<string, string> = {
        NEED: 'NEED',
        WANT: 'WANT',
        SAVING: 'SAVING',
    };
    const convertBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file); // Đọc file dưới dạng Data URL (Base64)
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = (error) => reject(error);
        });
    };
    const handleUpdate = async () => {
        try {
            if (!snap?.id) {
                message.error('Không tìm thấy ID');
                return;
            }

            setLoading(true);

            let base64Image = snap.imageUrl;

            if (file) {
                base64Image = await convertBase64(file);
            }

            await snapService.update({
                id: snap.id,
                title,
                amount: Number(amount),
                category: categoryMap[category],
                description: title,
                imageUrl: base64Image,
            });

            message.success('Cập nhật thành công');

            window.dispatchEvent(new Event('snap-updated'));

            onClose?.();
        } catch (error) {
            console.error(error);
            message.error('Cập nhật thất bại');
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
        handleUpdate,
        fileList,
    };
}
