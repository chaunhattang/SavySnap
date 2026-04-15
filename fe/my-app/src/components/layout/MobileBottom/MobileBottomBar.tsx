'use client';

import { CameraOutlined, WalletOutlined, PieChartOutlined, BellOutlined } from '@ant-design/icons';

import { Badge, Dropdown } from 'antd';

import { useRouter, usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import { NotificationPanel } from '@/components/notification/NotificationDropdown';

import styles from './MobileBottomBar.module.css';
import CreateSnapModal from '@/components/snap/CreateSnapModal';

export default function MobileBottomBar({ unreadCount = 0 }: { unreadCount?: number }) {
    const router = useRouter();

    const pathname = usePathname();

    const locale = pathname.split('/')[1] || 'vi';

    const [notifOpen, setNotifOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const items = [
        {
            key: `/${locale}/user`,
            icon: <CameraOutlined />,
        },
        {
            key: `/${locale}/wallet`,
            icon: <WalletOutlined />,
        },
        {
            key: `/${locale}/analytics`,
            icon: <PieChartOutlined />,
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div className={`${styles.container} ${scrolled ? styles.containerScrolled : ''}`}>
            {/* LEFT ICONS */}

            {items.slice(0, 2).map((item) => {
                const active = pathname === item.key;

                return (
                    <div
                        key={item.key}
                        className={`${styles.item} ${active ? styles.active : ''}`}
                        onClick={() => router.push(item.key)}
                    >
                        {item.icon}
                    </div>
                );
            })}

            {/* FAB */}

            <div className={styles.fabWrapper}>
                <div
                    className={styles.fab}
                    onClick={() => setOpen(true) }
                >
                    +
                </div>
            </div>

            {/* RIGHT ICON */}

            {items.slice(2).map((item) => {
                const active = pathname === item.key;

                return (
                    <div
                        key={item.key}
                        className={`${styles.item} ${active ? styles.active : ''}`}
                        onClick={() => router.push(item.key)}
                    >
                        {item.icon}
                    </div>
                );
            })}

            {/* BELL */}

            <Dropdown
                open={notifOpen}
                onOpenChange={(v) => setNotifOpen(v)}
                popupRender={() => <NotificationPanel role="user" />}
                trigger={['click']}
                placement="topRight"
            >
                <div className={styles.bellItem}>
                    <Badge count={unreadCount} size="small" offset={[4, 2]}>
                        <BellOutlined className={styles.bellIcon}/>
                    </Badge>
                </div>
            </Dropdown>

            <CreateSnapModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
