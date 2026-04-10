'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Layout, Menu, Dropdown, Button, Drawer, Typography } from 'antd';

import {
    CameraOutlined,
    WalletOutlined,
    PieChartOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
    EditOutlined,
} from '@ant-design/icons';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user.td';
import { NotificationPanel } from '@/components/notification/NotificationDropdown';

import styles from './styles.module.css';

const { Sider } = Layout;
const { Text } = Typography;

interface Props {
    loggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    onRefreshUser: () => Promise<void>;

    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
    isMobile: boolean;
}

export default function SidebarView({
    loggedIn,
    user,
    onLogout,
    collapsed,
    setCollapsed,
    isMobile,
}: Props) {
    const t = useTranslations('sideBar');
    const router = useRouter();

    const [unreadCount, setUnreadCount] = useState(0);
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => {
        const key = 'savysnap_notifs_user';
        const raw = localStorage.getItem(key);

        if (raw) {
            const notifs = JSON.parse(raw);
            setUnreadCount(notifs.filter((n: any) => !n.read).length);
        } else {
            setUnreadCount(2);
        }
    }, []);

    const avatarMenuItems = [
        {
            key: 'profile',
            label: t('editProfile'),
            icon: <EditOutlined />,
            onClick: () => router.push('/profile'),
        },
        {
            key: 'logout',
            label: t('logout'),
            icon: <LogoutOutlined />,
            onClick: onLogout,
            danger: true,
        },
    ];

    const navItems = [CameraOutlined, WalletOutlined, PieChartOutlined].map((icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
    }));

    const sidebarContent = (
        <>
            {/* USER */}
            <div className={styles.userArea}>
                {loggedIn ? (
                    <>
                        <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight">
                            <Avatar
                                size={56}
                                src={user?.avatarUrl}
                                icon={!user?.avatarUrl && <UserOutlined />}
                                className={styles.avatarIcon}
                            />
                        </Dropdown>

                        {user && <span className={styles.emailText}>{user.username}</span>}
                    </>
                ) : (
                    <Link href="/login">
                        <Button className={`${styles.logout} ${styles.signInBtn}`}>
                            {t('SignIn')}
                        </Button>
                    </Link>
                )}
            </div>

            {/* MENU */}
            <Menu
                className={styles.menuSidebar}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={navItems}
            />

            {/* BELL */}
            <Dropdown
                open={notifOpen}
                onOpenChange={(v) => {
                    setNotifOpen(v);
                    if (v) setUnreadCount(0);
                }}
                popupRender={() => (
                    <NotificationPanel role="user" onMarkRead={() => setUnreadCount(0)} />
                )}
                trigger={['click']}
                placement="bottomLeft"
            >
                <li className={styles.bellItem}>
                    <Badge count={unreadCount} size="small" offset={[4, -4]}>
                        <BellOutlined className={styles.bellIcon} />
                    </Badge>
                </li>
            </Dropdown>
        </>
    );

    if (isMobile) {
        return (
            <Drawer
                open={collapsed}
                onClose={() => setCollapsed(false)}
                placement="left"
                width={240}
                bodyStyle={{ padding: 0 }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

    return (
        <Sider
            width={100}
            collapsed={collapsed}
            onCollapse={(v) => setCollapsed(v)}
            className={styles.sidebar}
        >
            {sidebarContent}
        </Sider>
    );
}
