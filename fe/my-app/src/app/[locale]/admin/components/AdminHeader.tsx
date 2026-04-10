'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Input, Space, Avatar, Dropdown } from 'antd';
import { SearchOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from '../admin.module.css';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user.td';
import NotificationDropdown from '@/components/notification/NotificationDropdown';

const { Header } = Layout;

export default function AdminHeader() {
    const t = useTranslations('admin');
    const router = useRouter();

    const [adminUser, setAdminUser] = useState<User | null>(null);

    useEffect(() => {
        userService.getMyInfo().then(setAdminUser).catch(console.error);
    }, []);

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
            onClick: () => router.push('/profile'),
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
                <NotificationDropdown role="admin" />

                <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
                    <Space
                        className={styles.profileContainer}
                        align="center"
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.profileTextContainer}>
                            <div className={styles.profileName}>{adminUser?.username ?? '—'}</div>
                            <div className={styles.profileRole}>Super Admin</div>
                        </div>
                        <Avatar
                            size={40}
                            src={adminUser?.avatarUrl}
                            className={styles.profileAvatar}
                        >
                            {!adminUser?.avatarUrl && avatarInitials}
                        </Avatar>
                    </Space>
                </Dropdown>
            </Space>
        </Header>
    );
}
