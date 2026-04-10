'use client';
import { useState } from 'react';
import { App, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { snapService } from '@/services/apis/snap.service';

export function useCreateSnap(onClose?: () => void) {
    const { message } = App.useApp();
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
        return false; // Trả về false để ngăn Ant Design tự động upload
    };

    // Mở rộng map để xử lý được cả tiếng Việt (từ giao diện) và tiếng Anh
    const categoryMap: Record<string, string> = {
        'Thiết yếu': 'NEED',
        'Không thiết yếu': 'WANT',
        'Tiết kiệm': 'SAVING',
        NEED: 'NEED',
        WANT: 'WANT',
        SAVING: 'SAVING',
    };

    const handleSubmit = async () => {
        if (!title || !amount || !file) {
            message.error('Vui lòng nhập tiêu đề, số tiền và chọn ảnh');
            return;
        }

        try {
            setLoading(true);

            // 1. Khởi tạo hộp FormData thay vì JSON Object
            const formData = new FormData();

            // 2. Nạp dữ liệu vào FormData (chuyển số thành chuỗi)
            formData.append('title', title);
            formData.append('amount', amount.toString());

            // Lấy đúng giá trị Enum cho Backend, default về NEED nếu không map được
            const mappedCategory = categoryMap[category] || 'NEED';
            formData.append('category', mappedCategory);

            formData.append('description', title); // Bạn đang dùng title làm description

            // 3. Nạp file trực tiếp
            formData.append('file', file);

            // 4. Gửi FormData qua Service
            await snapService.create(formData);

            console.log(Object.fromEntries(formData));

            // Cập nhật lại UI sau khi thành công
            window.dispatchEvent(new Event('snap-updated'));

            setTitle('');
            setAmount(null);
            setFile(null);

            onClose?.();

            message.success('Lưu Snap thành công');
        } catch (err) {
            console.error(err);
            message.error('Tạo Snap thất bại. Vui lòng kiểm tra lại!');
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
