'use client';

import { useState, useEffect } from 'react';
import { App, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { snapService } from '@/services/apis/snap.service';

export function useUpdateSnap(snap: any, onClose?: () => void) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [category, setCategory] = useState('Thiết yếu');
    const [file, setFile] = useState<RcFile | null>(null);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);

    const { message } = App.useApp();

    useEffect(() => {
        if (snap) {
            setTitle(snap.title ?? '');
            setAmount(snap.amount ?? null);
            setCategory(snap.category ?? 'Thiết yếu');

            // Note: Đảm bảo field nhận từ backend là imageUrl hay image tùy model của bạn
            const currentImageUrl = snap.imageUrl || snap.image;

            if (currentImageUrl) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'current-image',
                        status: 'done',
                        url: currentImageUrl,
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
                url: URL.createObjectURL(file), // Preview ảnh mới lập tức
            },
        ]);

        return false; // Chặn Ant Design tự upload
    };

    // Cập nhật lại Map để khớp cả tiếng Anh lẫn tiếng Việt
    const categoryMap: Record<string, string> = {
        'Thiết yếu': 'NEED',
        'Không thiết yếu': 'WANT',
        'Tiết kiệm': 'SAVING',
        NEED: 'NEED',
        WANT: 'WANT',
        SAVING: 'SAVING',
    };

    const handleUpdate = async () => {
        try {
            if (!snap?.id) {
                message.error('Không tìm thấy ID');
                return;
            }

            if (!title || !amount) {
                message.error('Vui lòng nhập tiêu đề và số tiền');
                return;
            }

            setLoading(true);

            // 1. Dùng FormData thay vì Object JSON
            const formData = new FormData();

            formData.append('title', title);
            formData.append('amount', amount.toString());

            const mappedCategory = categoryMap[category] || 'NEED';
            formData.append('category', mappedCategory);

            formData.append('description', title);

            // 2. Chỉ nhét file vào FormData nếu người dùng có up ảnh mới
            if (file) {
                formData.append('file', file);
            }

            // 3. Gọi API với id và FormData
            await snapService.update(snap.id, formData);

            message.success('Cập nhật thành công');
            window.dispatchEvent(new Event('snap-updated'));
            onClose?.();
        } catch (error) {
            console.error(error);
            message.error('Cập nhật thất bại. Vui lòng kiểm tra lại!');
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
