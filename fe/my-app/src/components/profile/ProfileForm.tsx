'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input, Typography, message } from 'antd';
import {
    ArrowLeftOutlined,
    CameraOutlined,
    MailOutlined,
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user';
import styles from './ProfileForm.module.css';

const { Title, Text } = Typography;

export default function ProfileForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<User | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (!token) { router.push('/login'); return; }

        userService.getMyInfo().then((info) => {
            setUser(info);
            setAvatarPreview(info.avatarUrl || null);
            form.setFieldsValue({ username: info.username, email: info.email });
        }).catch(() => message.error('Không thể tải thông tin người dùng'));
    }, [form, router]);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { message.error('Chỉ chấp nhận file ảnh!'); return; }
        if (file.size / 1024 / 1024 > 3) { message.error('Ảnh phải nhỏ hơn 3MB!'); return; }
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const onFinish = async (values: { password: string }) => {
        if (!user?.username) return;
        setSaving(true);
        try {
            // Backend only accepts multipart/form-data.
            // It supports: password (required) + file (optional avatar).
            const formData = new FormData();
            formData.append('password', values.password);
            if (avatarFile) {
                // Backend @RequestParam("file")
                formData.append('file', avatarFile);
            }

            await userService.updateProfile(user.username, formData);
            message.success('Cập nhật thông tin thành công!');
            router.push('/user');
        } catch (err) {
            console.error(err);
            message.error('Cập nhật thất bại. Vui lòng thử lại!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>

                {/* ── Left green banner ── */}
                <div className={styles.leftPanel}>
                    <div>
                        <div className={styles.logoBox}>
                            <div className={styles.logoIcon}>
                                <CameraOutlined className={styles.largeCameraIcon} />
                            </div>
                            <span className={styles.brandName}>SavySnap</span>
                        </div>
                        <Title level={2} className={styles.leftTitle}>
                            Cá nhân hoá tài khoản của bạn.
                        </Title>
                        <Text className={styles.leftSubtitle}>
                            Cập nhật ảnh đại diện và mật khẩu để bảo mật tốt nhất.
                        </Text>
                    </div>
                    <div className={styles.shapeTopRight} />
                    <div className={styles.shapeBottomLeft} />
                </div>

                {/* ── Right form panel ── */}
                <div className={styles.rightPanel}>
                    {/* Back */}
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        className={styles.backBtn}
                        onClick={() => router.back()}
                    >
                        Quay lại
                    </Button>

                    <Title level={3} className={styles.heading}>Chỉnh sửa hồ sơ</Title>
                    <Text className={styles.subHeading}>
                        Nhấn vào ảnh để thay đổi ảnh đại diện
                    </Text>

                    {/* Avatar row */}
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
                            <Avatar
                                size={72}
                                src={avatarPreview}
                                icon={!avatarPreview && <UserOutlined />}
                                style={{ backgroundColor: '#059669' }}
                            />
                            <div className={styles.avatarOverlay}>
                                <CameraOutlined />
                            </div>
                        </div>
                        <div className={styles.avatarMeta}>
                            <Text className={styles.avatarName}>{user?.username ?? '—'}</Text>
                            <Text className={styles.avatarHint}>
                                {avatarFile ? `📎 ${avatarFile.name}` : 'Nhấn vào ảnh để đổi (tối đa 3 MB)'}
                            </Text>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Form */}
                    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>

                        {/* Username — read-only display only */}
                        <Form.Item
                            label={<Text className={styles.inputLabel}>Tên đăng nhập</Text>}
                            name="username"
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: '#94a3b8', marginRight: 6 }} />}
                                className={styles.customInput}
                                variant="filled"
                                disabled
                            />
                        </Form.Item>

                        {/* Email — read-only */}
                        <Form.Item
                            label={<Text className={styles.inputLabel}>Email</Text>}
                            name="email"
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: '#94a3b8', marginRight: 6 }} />}
                                className={styles.customInput}
                                variant="filled"
                                disabled
                            />
                        </Form.Item>

                        {/* Password — required because backend always re-encodes */}
                        <Form.Item
                            label={<Text className={styles.inputLabel}>Mật khẩu mới</Text>}
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại hoặc mật khẩu mới!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#94a3b8', marginRight: 6 }} />}
                                className={styles.customInput}
                                variant="filled"
                                placeholder="Nhập mật khẩu hiện tại hoặc mật khẩu mới"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={saving}
                                className={styles.submitBtn}
                            >
                                <Text style={{ color: 'white', fontWeight: 900 }}>Lưu thay đổi</Text>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
