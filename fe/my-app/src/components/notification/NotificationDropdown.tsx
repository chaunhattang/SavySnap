'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Typography } from 'antd';
import {
    BellOutlined,
    CameraOutlined,
    UserOutlined,
    SettingOutlined,
    StarOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import styles from './NotificationDropdown.module.css';

dayjs.extend(relativeTime);
dayjs.locale('vi');

// ─── Types ───────────────────────────────────────────────────────────
export type NotifType = 'snap' | 'profile' | 'system' | 'welcome' | 'admin';

export interface Notification {
    id: string;
    type: NotifType;
    title: string;
    desc: string;
    time: string; // ISO string
    read: boolean;
}

// ─── Icon & class per type ───────────────────────────────────────────
const ICON_MAP: Record<NotifType, { icon: React.ReactNode; cls: string }> = {
    snap:    { icon: <CameraOutlined />, cls: styles.iconSnap },
    profile: { icon: <UserOutlined />,   cls: styles.iconProfile },
    system:  { icon: <SettingOutlined />, cls: styles.iconSystem },
    welcome: { icon: <StarOutlined />,   cls: styles.iconWelcome },
    admin:   { icon: <TeamOutlined />,   cls: styles.iconAdmin },
};

// ─── Default notifications per role ─────────────────────────────────
const DEFAULT_USER: Notification[] = [
    {
        id: 'w1',
        type: 'welcome',
        title: 'Chào mừng đến với SavySnap! 🎉',
        desc: 'Bắt đầu theo dõi chi tiêu bằng cách thêm Snap đầu tiên của bạn.',
        time: dayjs().subtract(1, 'hour').toISOString(),
        read: false,
    },
    {
        id: 's1',
        type: 'system',
        title: 'Mẹo tiết kiệm thông minh',
        desc: 'Hãy phân loại chi tiêu để xem tổng khoản Tiết Kiệm của bạn trên Dashboard.',
        time: dayjs().subtract(3, 'hour').toISOString(),
        read: false,
    },
    {
        id: 's2',
        type: 'system',
        title: 'Tính năng mới: Upload ảnh',
        desc: 'Bạn có thể upload ảnh hóa đơn khi tạo Snap mới để lưu trữ dễ dàng hơn.',
        time: dayjs().subtract(1, 'day').toISOString(),
        read: true,
    },
];

const DEFAULT_ADMIN: Notification[] = [
    {
        id: 'a1',
        type: 'admin',
        title: 'Hệ thống hoạt động bình thường',
        desc: 'Tất cả dịch vụ đang hoạt động ổn định. Không có sự cố nào được ghi nhận.',
        time: dayjs().subtract(30, 'minute').toISOString(),
        read: false,
    },
    {
        id: 'a2',
        type: 'snap',
        title: 'Snap mới được tạo',
        desc: 'Người dùng tang vừa tạo một Snap mới trong hệ thống.',
        time: dayjs().subtract(2, 'hour').toISOString(),
        read: false,
    },
    {
        id: 'a3',
        type: 'profile',
        title: 'Người dùng cập nhật thông tin',
        desc: 'Có 1 người dùng vừa cập nhật thông tin tài khoản.',
        time: dayjs().subtract(4, 'hour').toISOString(),
        read: true,
    },
    {
        id: 'a4',
        type: 'system',
        title: 'Nhắc nhở: Sao lưu dữ liệu',
        desc: 'Hãy đảm bảo database được sao lưu định kỳ để tránh mất dữ liệu.',
        time: dayjs().subtract(1, 'day').toISOString(),
        read: true,
    },
];

// ─── Storage helpers ─────────────────────────────────────────────────
const STORAGE_KEY = (role: string) => `savysnap_notifs_${role}`;

function loadNotifs(role: string, defaults: Notification[]): Notification[] {
    if (typeof window === 'undefined') return defaults;
    try {
        const raw = localStorage.getItem(STORAGE_KEY(role));
        return raw ? JSON.parse(raw) : defaults;
    } catch {
        return defaults;
    }
}

function saveNotifs(role: string, notifs: Notification[]) {
    localStorage.setItem(STORAGE_KEY(role), JSON.stringify(notifs));
}

// ─── Props ───────────────────────────────────────────────────────────
interface PanelProps {
    role?: 'user' | 'admin';
    onMarkRead?: () => void;
}

// ─── Shared hook ──────────────────────────────────────────────────────
function useNotifications(role: 'user' | 'admin', onMarkRead?: () => void) {
    const defaults = role === 'admin' ? DEFAULT_ADMIN : DEFAULT_USER;
    const [notifs, setNotifs] = useState<Notification[]>(defaults);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const saved = loadNotifs(role, defaults);
        setNotifs(saved);
        setIsHydrated(true);
    }, [role]);

    useEffect(() => {
        if (isHydrated) {
            saveNotifs(role, notifs);
        }
    }, [notifs, role, isHydrated]);

    const unreadCount = notifs.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
        onMarkRead?.();
    };

    const markRead = (id: string) =>
        setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

    return { notifs, unreadCount, markAllRead, markRead };
}

// ─── Panel only (for sidebar external Dropdown) ───────────────────────
export function NotificationPanel({ role = 'user', onMarkRead }: PanelProps) {
    const { notifs, unreadCount, markAllRead, markRead } = useNotifications(role, onMarkRead);

    return (
        <div className={styles.dropdownWrapper}>
            <div className={styles.header}>
                <Typography.Title level={5} className={styles.title}>
                    Thông báo {unreadCount > 0 && `(${unreadCount})`}
                </Typography.Title>
                {unreadCount > 0 && (
                    <Button type="text" className={styles.markAllBtn} onClick={markAllRead}>
                        Đánh dấu tất cả đã đọc
                    </Button>
                )}
            </div>

            <div className={styles.list}>
                {notifs.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>🔔</div>
                        <Typography.Text type="secondary">Không có thông báo nào</Typography.Text>
                    </div>
                ) : (
                    notifs.map((n) => {
                        const { icon, cls } = ICON_MAP[n.type];
                        return (
                            <div
                                key={n.id}
                                className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
                                onClick={() => markRead(n.id)}
                            >
                                <div className={`${styles.iconBox} ${cls}`}>{icon}</div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>{n.title}</div>
                                    <div className={styles.itemDesc}>{n.desc}</div>
                                    <span className={styles.itemTime}>{dayjs(n.time).fromNow()}</span>
                                </div>
                                {!n.read && <div className={styles.unreadDot} />}
                            </div>
                        );
                    })
                )}
            </div>

            <div className={styles.footer}>
                <Button type="text" className={styles.footerBtn}>
                    Xem tất cả thông báo
                </Button>
            </div>
        </div>
    );
}

// ─── Full self-contained (for AdminHeader) ────────────────────────────
export default function NotificationDropdown({ role = 'user', onMarkRead }: PanelProps) {
    const { notifs, unreadCount, markAllRead, markRead } = useNotifications(role, onMarkRead);
    const [open, setOpen] = useState(false);

    const panel = (
        <div className={styles.dropdownWrapper}>
            <div className={styles.header}>
                <Typography.Title level={5} className={styles.title}>
                    Thông báo {unreadCount > 0 && `(${unreadCount})`}
                </Typography.Title>
                {unreadCount > 0 && (
                    <Button type="text" className={styles.markAllBtn} onClick={markAllRead}>
                        Đánh dấu tất cả đã đọc
                    </Button>
                )}
            </div>

            <div className={styles.list}>
                {notifs.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>🔔</div>
                        <Typography.Text type="secondary">Không có thông báo nào</Typography.Text>
                    </div>
                ) : (
                    notifs.map((n) => {
                        const { icon, cls } = ICON_MAP[n.type];
                        return (
                            <div
                                key={n.id}
                                className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
                                onClick={() => markRead(n.id)}
                            >
                                <div className={`${styles.iconBox} ${cls}`}>{icon}</div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemTitle}>{n.title}</div>
                                    <div className={styles.itemDesc}>{n.desc}</div>
                                    <span className={styles.itemTime}>{dayjs(n.time).fromNow()}</span>
                                </div>
                                {!n.read && <div className={styles.unreadDot} />}
                            </div>
                        );
                    })
                )}
            </div>

            <div className={styles.footer}>
                <Button type="text" className={styles.footerBtn}>
                    Xem tất cả thông báo
                </Button>
            </div>
        </div>
    );

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            popupRender={() => panel}
            trigger={['click']}
            placement="bottomRight"
        >
            <Badge count={unreadCount} size="small" offset={[-2, 2]}>
                <BellOutlined style={{ fontSize: 20, cursor: 'pointer', color: '#595959' }} />
            </Badge>
        </Dropdown>
    );
}
