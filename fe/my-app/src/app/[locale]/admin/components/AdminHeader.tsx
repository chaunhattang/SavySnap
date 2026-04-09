'use client';

import React, { useState, useEffect } from 'react';
import {
    Layout,
    Input,
    Space,
    Badge,
    Avatar,
    Dropdown,
    Modal,
    Form,
    Button,
    Divider,
    Typography,
    message,
} from 'antd';
import {
    SearchOutlined,
    BellOutlined,
    UserOutlined,
    EditOutlined,
    LogoutOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from '../admin.module.css';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeader() {
    const t = useTranslations('admin');
    const router = useRouter();

    const [adminUser, setAdminUser] = useState<User | null>(null);
    const [openProfile, setOpenProfile] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        userService.getMyInfo().then(setAdminUser).catch(console.error);
    }, []);

    useEffect(() => {
        if (openProfile && adminUser) {
            form.setFieldsValue({
                username: adminUser.username,
                email: adminUser.email,
            });
        }
    }, [openProfile, adminUser, form]);

    const handleSave = async (values: { email: string }) => {
        if (!adminUser?.username) return;
        setSaving(true);
        try {
            await userService.updateByUserName(adminUser.username, { email: values.email });
            message.success('Cập nhật thông tin thành công!');
            const updated = await userService.getMyInfo();
            setAdminUser(updated);
            setOpenProfile(false);
        } catch (error) {
            message.error('Cập nhật thất bại. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('role', { path: '/' });
        router.push('/login');
    };

    const avatarInitials = adminUser?.username
        ? adminUser.username.slice(0, 2).toUpperCase()
        : 'AD';

    const menuItems = [
        {
            key: 'profile',
            icon: <EditOutlined />,
            label: 'Chỉnh sửa thông tin',
            onClick: () => setOpenProfile(true),
        },
        { type: 'divider' as const },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: t('logout'),
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <>
            <Header className={styles.header}>
                <div className={styles.searchContainer}>
                    <Input
                        size="large"
                        placeholder={t('searchPlaceholder')}
                        prefix={<SearchOutlined className={styles.searchIcon} />}
                        className={styles.searchInput}
                        variant="filled"
                    />
                </div>

                <Space size="large" align="center">
                    <Badge dot offset={[-4, 4]}>
                        <BellOutlined className={styles.bellIcon} />
                    </Badge>

                    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
                        <Space className={styles.profileContainer} align="center" style={{ cursor: 'pointer' }}>
                            <div className={styles.profileTextContainer}>
                                <div className={styles.profileName}>
                                    {adminUser?.username ?? '—'}
                                </div>
                                <div className={styles.profileRole}>Super Admin</div>
                            </div>
                            <Avatar size={40} className={styles.profileAvatar}>
                                {avatarInitials}
                            </Avatar>
                        </Space>
                    </Dropdown>
                </Space>
            </Header>

            {/* EDIT PROFILE MODAL */}
            <Modal
                title={
                    <div>
                        <Text strong style={{ fontSize: 18 }}>Thông tin Admin</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            Cập nhật thông tin tài khoản quản trị viên
                        </Text>
                    </div>
                }
                open={openProfile}
                onCancel={() => setOpenProfile(false)}
                footer={null}
                width={480}
            >
                {/* Current info card */}
                {adminUser && (
                    <div className={styles.profileInfoBox}>
                        <Avatar size={64} className={styles.profileAvatar}>
                            {avatarInitials}
                        </Avatar>
                        <div className={styles.profileInfoText}>
                            <Text strong className={styles.profileInfoUsername}>
                                {adminUser.username}
                            </Text>
                            <Text type="secondary" className={styles.profileInfoEmail}>
                                {adminUser.email}
                            </Text>
                            <Text className={styles.profileRole}>Super Admin</Text>
                        </div>
                    </div>
                )}

                <Divider />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    requiredMark={false}
                >
                    <Form.Item label={<Text strong>Tên đăng nhập</Text>} name="username">
                        <Input disabled prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label={<Text strong>Email</Text>}
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Nhập email mới" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={saving}
                            style={{ height: 44, borderRadius: 12 }}
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
