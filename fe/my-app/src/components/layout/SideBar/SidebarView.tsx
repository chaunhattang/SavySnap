'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Layout, Menu, Dropdown, Button, Typography } from 'antd';
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
}

export default function SidebarView({ loggedIn, user, onLogout }: Props) {
    const t = useTranslations('sideBar');
    const router = useRouter();

    // Notification unread count — synced from localStorage so badge matches
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => {
        const key = 'savysnap_notifs_user';
        const raw = localStorage.getItem(key);
        if (raw) {
            const notifs = JSON.parse(raw);
            setUnreadCount(notifs.filter((n: any) => !n.read).length);
        } else {
            // default 2 unread (matches DEFAULT_USER in NotificationDropdown)
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

    // Nav icons — bell handled separately via Dropdown below
    const navItems = [CameraOutlined, WalletOutlined, PieChartOutlined].map(
        (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
        })
    );

    return (
        <Sider width={100} breakpoint="lg" collapsedWidth={90} className={styles.sidebar}>
            {/* USER AREA */}
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

            {/* NAV MENU - Camera, Wallet, PieChart */}
            <Menu
                className={styles.menuSidebar}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={navItems}
            />

            {/* BELL — rendered as identical antd menu-item li */}
            <Dropdown
                open={notifOpen}
                onOpenChange={(v) => {
                    setNotifOpen(v);
                    if (v) setUnreadCount(0); // clear badge when opened
                }}
                popupRender={() => (
                    <NotificationPanel
                        role="user"
                        onMarkRead={() => setUnreadCount(0)}
                    />
                )}
                trigger={['click']}
                placement="bottomLeft"
            >
                {/* li styled to exactly match antd Menu item */}
                <li className={styles.bellItem}>
                    <Badge count={unreadCount} size="small" offset={[4, -4]}>
                        <BellOutlined className={styles.bellIcon} />
                    </Badge>
                </li>
            </Dropdown>
        </Sider>
    );
}
