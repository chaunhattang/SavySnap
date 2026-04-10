'use client';

import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import {
    CameraOutlined,
    DashboardOutlined,
    TeamOutlined,
    PictureOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../admin.module.css';
import Cookies from 'js-cookie';

const { Sider } = Layout;
const { Text } = Typography;

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (key: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const router = useRouter();
    const t = useTranslations('admin');

    const handleLogout = () => {
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('role', { path: '/' });
        router.push('/login');
    };

    return (
        <Sider width={280} theme="dark" className={styles.sider}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIconWrapper}>
                    <CameraOutlined className={styles.logoIcon} />
                </div>
                <Text strong className={styles.logoText}>
                    {t('title')}
                </Text>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[activeTab]}
                onSelect={(e) => setActiveTab(e.key)}
                className={styles.menu}
                items={[
                    { key: '1', icon: <DashboardOutlined />, label: t('menu.overview') },
                    { key: '2', icon: <TeamOutlined />, label: t('menu.users') },
                    { key: '3', icon: <PictureOutlined />, label: t('menu.snaps') },
                    { key: '4', icon: <SettingOutlined />, label: t('menu.settings') },
                ]}
            />

            <div className={styles.logoutContainer}>
                <Button
                    type="text"
                    danger
                    block
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className={styles.logoutButton}
                >
                    {t('logout')}
                </Button>
            </div>
        </Sider>
    );
}
