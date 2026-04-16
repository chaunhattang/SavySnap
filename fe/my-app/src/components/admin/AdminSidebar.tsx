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
import { useTranslations } from 'next-intl';
import styles from '@/app/[locale]/admin/admin.module.css';
import { useLogout } from '@/hooks/useLogout';
import { TAB, TabKey } from '@/app/[locale]/admin/constants';

const { Sider } = Layout;
const { Text } = Typography;

interface AdminSidebarProps {
    activeTab: TabKey;
    setActiveTab: (key: TabKey) => void;
}

// ─── Danh sách menu điều hướng ────────────────────────────────────────
const MENU_ITEMS = [
    { key: TAB.DASHBOARD, icon: <DashboardOutlined />, labelKey: 'menu.overview' },
    { key: TAB.USERS,     icon: <TeamOutlined />,      labelKey: 'menu.users'    },
    { key: TAB.SNAPS,     icon: <PictureOutlined />,   labelKey: 'menu.snaps'    },
    { key: TAB.SETTINGS,  icon: <SettingOutlined />,   labelKey: 'menu.settings' },
] as const;

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const t = useTranslations('admin');
    const logout = useLogout();

    return (
        <aside className="w-full h-full flex flex-col p-6 gap-8">
            {/* Logo ứng dụng */}
            <div className={styles.logoContainer}>
                <div className={styles.logoIconWrapper}>
                    <CameraOutlined className={styles.logoIcon} />
                </div>
                <Text strong className={styles.logoText}>
                    {t('title')}
                </Text>
            </div>

            {/* Menu điều hướng chính */}
            <nav className={styles.menu}>
                {MENU_ITEMS.map((item) => {
                    const NavIcon = item.icon;
                    return (
                <button 
                    key={item.key}
                    onClick={() => setActiveTab(item.key as TabKey)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 whitespace-nowrap group relative overflow-hidden ${styles.navItem} ${styles.clickSqueeze} ${styles.glowRipple} ${
                        activeTab === item.key 
                        ? 'bg-white shadow-[0_5px_15px_rgba(255,182,193,0.3)] text-pink-600 font-black border border-white scale-105' 
                        : 'text-pink-900/60 hover:bg-white/60 hover:text-pink-700 font-bold'
                    }`}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                    <span className="relative z-10">{item.icon}</span>
                    <span className="relative z-10">{t(item.labelKey as any)}</span>
                </button>

                    );
                })}
            </nav>

            {/* Nút đăng xuất cố định dưới cùng */}
            <div className={styles.logoutContainer}>
                <Button
                    type="text"
                    danger
                    block
                    icon={<LogoutOutlined />}
                    onClick={logout}
                    className={styles.logoutButton}
                >
                    {t('logout')}
                </Button>
            </div>
        </aside>
    );
}
