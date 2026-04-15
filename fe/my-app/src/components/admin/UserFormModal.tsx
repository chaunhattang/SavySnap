'use client';

import React from 'react';
import { Modal, Form, Input, Select, Tag, Button, Space, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userService } from '@/services/apis/user.service';
import { authService } from '@/services/apis/auth.service';
import { User } from '@/types/user';

const { Text } = Typography;

// ─── Kiểu dữ liệu form ───────────────────────────────────────────────
interface FormValues {
    username: string;
    email: string;
    password?: string;
    role: string;
}

interface UserFormModalProps {
    open: boolean;
    mode: 'add' | 'edit';
    user: User | null;       // null khi đang thêm mới
    onClose: () => void;
    onSuccess: () => void;   // gọi lại để reload danh sách user
}

export default function UserFormModal({ open, mode, user, onClose, onSuccess }: UserFormModalProps) {
    const [form] = Form.useForm<FormValues>();
    const [saving, setSaving] = React.useState(false);

    // Tiêu đề modal tuỳ theo mode
    const modalTitle = mode === 'edit'
        ? `Sửa thông tin: ${user?.username}`
        : 'Thêm người dùng mới';

    // Giá trị ban đầu của form
    const initialValues: Partial<FormValues> =
        mode === 'edit' && user
            ? { username: user.username, email: user.email, role: user.role ?? 'USER' }
            : { role: 'USER' };

    // ─── Xử lý submit form ───────────────────────────────────────────
    const handleSubmit = async (values: FormValues) => {
        setSaving(true);
        try {
            if (mode === 'edit' && user) {
                // Chỉ cập nhật mật khẩu (BE hiện tại chỉ hỗ trợ UserUpdateRequest với password)
                const formData = new FormData();
                if (values.password) formData.append('password', values.password);
                await userService.updateProfile(user.username, formData);
                message.success('Cập nhật người dùng thành công!');
            } else {
                // Tạo tài khoản mới qua API register
                if (!values.password) {
                    message.error('Vui lòng nhập mật khẩu!');
                    return;
                }
                await authService.register({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                message.success('Tạo tài khoản thành công!');
            }

            onClose();
            onSuccess(); // reload danh sách bên ngoài
        } catch (err) {
            console.error(err);
            message.error('Thao tác thất bại. Vui lòng thử lại!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            title={<Text strong style={{ fontSize: 17 }}>{modalTitle}</Text>}
            open={open}
            onCancel={onClose}
            footer={null}
            width={480}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                initialValues={initialValues}
                style={{ marginTop: 16 }}
            >
                {/* Tên đăng nhập — chỉ nhập khi thêm mới, không cho sửa */}
                <Form.Item
                    label={<Text strong>Tên đăng nhập</Text>}
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                        placeholder="username"
                        disabled={mode === 'edit'}
                        style={{ borderRadius: 10 }}
                    />
                </Form.Item>

                {/* Email — chỉ nhập khi thêm mới */}
                <Form.Item
                    label={<Text strong>Email</Text>}
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input
                        placeholder="email@example.com"
                        style={{ borderRadius: 10 }}
                        disabled={mode === 'edit'}
                    />
                </Form.Item>

                {/* Mật khẩu — bắt buộc khi thêm mới, tuỳ chọn khi sửa */}
                <Form.Item
                    label={<Text strong>Mật khẩu</Text>}
                    name="password"
                    rules={mode === 'add' ? [{ required: true, message: 'Vui lòng nhập mật khẩu!' }] : []}
                >
                    <Input.Password
                        placeholder={mode === 'edit' ? 'Bỏ trống nếu không muốn đổi' : 'Mật khẩu người dùng'}
                        style={{ borderRadius: 10 }}
                    />
                </Form.Item>

                {/* Role — chỉ hiển thị khi đang sửa (sửa được); khi thêm luôn là USER */}
                {mode === 'edit' ? (
                    <Form.Item
                        label={<Text strong>Role</Text>}
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
                    >
                        <Select style={{ borderRadius: 10 }}>
                            <Select.Option value="USER">
                                <Tag color="green" style={{ fontWeight: 700 }}>USER</Tag>
                            </Select.Option>
                            <Select.Option value="ADMIN">
                                <Tag color="volcano" style={{ fontWeight: 700 }}>ADMIN</Tag>
                            </Select.Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item label={<Text strong>Role</Text>}>
                        <Tag color="green" style={{ fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                            USER (mặc định)
                        </Tag>
                        <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                            Sau khi tạo, vào Sửa để đổi role
                        </Text>
                    </Form.Item>
                )}

                {/* Nút hành động */}
                <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={onClose}>Huỷ</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={saving}
                            style={{
                                backgroundColor: '#059669',
                                borderColor: '#059669',
                                borderRadius: 10,
                                fontWeight: 700,
                                height: 40,
                                minWidth: 120,
                            }}
                        >
                            {mode === 'edit' ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}
