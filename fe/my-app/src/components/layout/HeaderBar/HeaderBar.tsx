'use client';

import { useState } from 'react';
import styles from './styles.module.css';

import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Button, Input, Layout, Grid, Dropdown, Avatar } from 'antd';
import CreateSnapModal from '@/components/snap/CreateSnapModal';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useSnapCrud } from '@/hooks/useSnapCrud';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface Props {
    setCollapsed: (v: boolean) => void;
    loggedIn: boolean;
    user: any;
    onLogout: () => void;
}

export default function HeaderBar({ setCollapsed, loggedIn, user, onLogout }: Props) {
    const [open, setOpen] = useState(false);

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const setSearch = useSnapCrud((s) => s.setSearch);
    const t = useTranslations('headerBar');
     const a = useTranslations('sideBar');

    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'vi';

    /* AVATAR MENU */
    const avatarMenuItems = [
        {
            key: 'profile',
            label: a('editProfile'),
            icon: <EditOutlined />,
            onClick: () => router.push(`/${locale}/profile`),
        },
        {
            key: 'logout',
            label: a('logout'),
            icon: <LogoutOutlined />,
            onClick: onLogout,
            danger: true,
        },
    ];

    return (
        <Header className={styles.headerContainer}>
            {/* LEFT */}
            <div className={styles.leftSection}>
                <span className={styles.brand}>SavySnap</span>
            </div>

            {/* RIGHT */}
            <div className={styles.actions}>
                <LanguageSwitcher />

                {/* SEARCH DESKTOP */}
                {!isMobile && (
                    <Input
                        className={styles.search}
                        placeholder={t('placeholder')}
                        prefix={<SearchOutlined />}
                        allowClear
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}

                {/* ADD BUTTON DESKTOP */}
                {!isMobile && (
                    <Button
                        type="primary"
                        size="large"
                        className={styles.addButton}
                        onClick={() => setOpen(true)}
                    >
                        {t('addNew')}
                    </Button>
                )}

                {/* 👉 AVATAR MOBILE */}
                {isMobile && (
                    <div className={styles.userArea}>
                        {loggedIn ? (
                            <>
                                <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight">
                                    <Avatar
                                        size={56}
                                        src={user?.avatarUrl}
                                        alt="avatar"
                                        icon={!user?.avatarUrl && <UserOutlined />}
                                        className={styles.avatarIcon}
                                    />
                                </Dropdown>
                              
                            </>
                        ) : (
                            <Link href="/login">
                                <Button className={`${styles.logout} ${styles.signInBtn}`}>
                                    {a('SignIn')}
                                </Button>
                            </Link>
                        )}
                    </div>
                )}

                <CreateSnapModal open={open} onClose={() => setOpen(false)} />
            </div>
        </Header>
    );
}
