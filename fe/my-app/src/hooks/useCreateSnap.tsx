'use client';
import { useState } from 'react';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { snapService } from '@/services/apis/snap.service';
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
    const categoryMap: Record<string, string> = {
        NEED: 'NEED',
        WANT: 'WANT',
        SAVING: 'SAVING',
    };
    // Hàm chuyển đổi File sang Base64
    const convertBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file); // Đọc file dưới dạng Data URL (Base64)
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        if (!title || !amount || !file) {
            message.error('Vui lòng nhập tiêu đề và số tiền');
            return;
        }
        // Xử lý chuyển đổi trước khi gọi API
        let base64Image = await convertBase64(file);

        try {
            setLoading(true);

            await snapService.create({
                title,
                amount,
                category: categoryMap[category],
                description: title,
                imageUrl: base64Image, // Gửi chuỗi dài ngoằng này lên (thay vì file.name)
            });

            window.dispatchEvent(new Event('snap-updated'));

            setTitle('');
            setAmount(null);
            setFile(null);

            onClose?.();

            message.success('Lưu Snap thành công');
        } catch (err) {
            console.error(err);
            message.error('Tạo Snap thất bại');
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
