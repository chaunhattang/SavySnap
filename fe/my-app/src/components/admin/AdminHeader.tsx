'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Input, Space, Avatar, Dropdown, Button } from 'antd';
import { SearchOutlined, EditOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import styles from '@/app/[locale]/admin/admin.module.css';
import { userService } from '@/services/apis/user.service';
import { User } from '@/types/user';
import NotificationDropdown from '@/components/notification/NotificationDropdown';
import { useLogout } from '@/hooks/useLogout';

const { Header } = Layout;

export default function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const t = useTranslations('admin');
    const router = useRouter();
    const logout = useLogout(); // hook dùng chung với AdminSidebar

    // Thông tin admin đang đăng nhập
    const [adminUser, setAdminUser] = useState<User | null>(null);

    // Lấy thông tin người dùng hiện tại khi component mount
    useEffect(() => {
        userService.getMyInfo().then(setAdminUser).catch(console.error);
    }, []);

    // Lấy 2 chữ đầu của username để hiển thị trên avatar
    const avatarInitials = adminUser?.username
        ? adminUser.username.slice(0, 2).toUpperCase()
        : 'AD';

    // Menu dropdown khi click vào avatar
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
            onClick: logout,
        },
    ];

    return (
        <header className={`${styles.header} flex items-center`}>
            {/* Nút Hamburger cho Mobile */}
            <Button 
                type="text" 
                icon={<MenuOutlined className="text-xl text-pink-600" />} 
                onClick={onMenuClick} 
                className="md:hidden mr-2"
            />
            {/* Thanh tìm kiếm */}
            <div className={styles.searchContainer}>
                <Input
                    size="large"
                    placeholder={t('searchPlaceholder')}
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                    className={styles.searchInput}
                    variant="filled"
                />
            </div>

            {/* Vùng bên phải: chuông thông báo + avatar admin */}
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
        </header>
    );
}
