'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import {
    CameraOutlined,
    WalletOutlined,
    PieChartOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    EditOutlined,
} from '@ant-design/icons';

import {
    Avatar,
    Layout,
    Menu,
    Dropdown,
    Modal,
    Form,
    Input,
    Button,
    message,
    Typography,
    Divider,
} from 'antd';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';

const { Sider } = Layout;
const { Text } = Typography;

const items = [CameraOutlined, WalletOutlined, PieChartOutlined, BellOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
    })
);

interface Props {
    loggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    onRefreshUser: () => Promise<void>;
}

export default function SidebarView({ loggedIn, user, onLogout, onRefreshUser }: Props) {
    const [openProfile, setOpenProfile] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();
    const t = useTranslations('sideBar');

    // Pre-fill form when modal opens with latest user data
    useEffect(() => {
        if (openProfile && user) {
            form.setFieldsValue({
                username: user.username,
                email: user.email,
            });
        }
    }, [openProfile, user, form]);

    const handleSave = async (values: { email: string }) => {
        if (!user?.username) return;
        setSaving(true);
        try {
            await userService.updateByUserName(user.username, { email: values.email });
            message.success('Cập nhật thông tin thành công!');
            await onRefreshUser();
            setOpenProfile(false);
        } catch (error) {
            message.error('Cập nhật thất bại. Vui lòng thử lại!');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const menuItems = [
        {
            key: 'profile',
            label: t('editProfile'),
            icon: <EditOutlined />,
            onClick: () => setOpenProfile(true),
        },
        {
            key: 'logout',
            label: t('logout'),
            icon: <LogoutOutlined />,
            onClick: onLogout,
            danger: true,
        },
    ];

    return (
        <Sider width={100} breakpoint="lg" collapsedWidth={90} className={styles.sidebar}>
            {/* USER AREA */}
            <div className={styles.userArea}>
                {loggedIn ? (
                    <>
                        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                            <Avatar
                                size={56}
                                icon={<UserOutlined />}
                                className={styles.avatarIcon}
                            />
                        </Dropdown>
                        {user && (
                            <span className={styles.emailText}>{user.username}</span>
                        )}
                    </>
                ) : (
                    <Link href="/login">
                        <Button className={`${styles.logout} ${styles.signInBtn}`}>
                            {t('SignIn')}
                        </Button>
                    </Link>
                )}
            </div>

            <Menu
                className={styles.menuSidebar}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />

            {/* PROFILE MODAL */}
            <Modal
                title={
                    <div>
                        <Text strong style={{ fontSize: 18 }}>Chỉnh sửa thông tin</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            Cập nhật thông tin cá nhân của bạn
                        </Text>
                    </div>
                }
                open={openProfile}
                onCancel={() => setOpenProfile(false)}
                footer={null}
                width={480}
            >
                {/* Thông tin hiện tại */}
                {user && (
                    <div className={styles.profileInfoBox}>
                        <Avatar size={64} icon={<UserOutlined />} className={styles.avatarIcon} />
                        <div className={styles.profileInfoText}>
                            <Text strong className={styles.profileInfoUsername}>{user.username}</Text>
                            <Text type="secondary" className={styles.profileInfoEmail}>{user.email}</Text>
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
                    <Form.Item
                        label={<Text strong>Tên đăng nhập</Text>}
                        name="username"
                    >
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
                        <Input placeholder="Nhập email mới" />
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
        </Sider>
    );
}
